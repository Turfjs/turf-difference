// look here for help http://svn.osgeo.org/grass/grass/branches/releasebranch_6_4/vector/v.overlay/main.c
//must be array of polygons

// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html

var jsts = require('jsts'),
    _ = require('lodash')

module.exports = function(poly1, poly2, done){
  poly1 = correctRings(poly1)
  poly2 = correctRings(poly2)

  var reader = new jsts.io.GeoJSONReader()
  var a = reader.read(JSON.stringify(poly1.geometry))
  var b = reader.read(JSON.stringify(poly2.geometry))
  var erased = a.difference(b);
  var parser = new jsts.io.GeoJSONParser()
  erased = parser.write(erased)

  var newPoly = _.cloneDeep(poly1);
  newPoly.geometry = erased

  done = done || function () {};

  done(null, newPoly)
  return newPoly;
}

function correctRings(poly){
  _.each(poly.geometry.coordinates, function(ring){
    var isWrapped =_.isEqual(ring[0], ring.slice(-1)[0])
    if(!isWrapped){
      ring.push(ring[0])
    }
  })
  return poly
}

