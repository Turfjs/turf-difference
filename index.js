// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = require('jsts');

/**
 * Finds the difference between two polygons by clipping the second
 * polygon from the first.
 *
 * @module turf/erase
 * @param {Polygon} poly1 input Polygon feaure
 * @param {Polygon} poly2 Polygon feature to erase from `poly1`
 * @return {Polygon} a Polygon feature showing the area of `poly1` excluding the area of `poly2`
 * @example
 * var a = turf.polygon([[[10,0],[20,10],[20,0],[10,0]]]);
 * a.properties.fill = '#0f0';
 * var b = turf.polygon([[[10+5,0+5],[20+5,10+5],[20+5,0+5],[10+5,0+5]]]);
 * b.properties.fill = '#00f';
 * var erased = turf.erase(JSON.parse(JSON.stringify(a)), b);
 * //=a
 * //=b
 * //=erased
 */

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
