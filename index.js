// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = require('jsts');

module.exports = function(poly1, poly2, done){
  if(poly1.type !== 'Feature') {
    poly1 = {
      type: 'Feature',
      properties: {},
      geometry: poly1
    }
  }
  if(poly2.type !== 'Feature') {
    poly2 = {
      type: 'Feature',
      properties: {},
      geometry: poly2
    }
  }
  var reader = new jsts.io.GeoJSONReader();
  var a = reader.read(JSON.stringify(poly1.geometry));
  var b = reader.read(JSON.stringify(poly2.geometry));
  var erased = a.difference(b);
  var parser = new jsts.io.GeoJSONParser();
  erased = parser.write(erased);

  poly1.geometry = erased;
  if(poly1.geometry.type === 'GeometryCollection' && poly1.geometry.geometries.length === 0) {
    return;
  } else {
    return {
      type: 'Feature',
      properties: poly1.properties,
      geometry: erased
    };
  }
}