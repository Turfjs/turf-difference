var gh = require('gh-clipping-algorithm');

/**
 * Finds the difference between two {@link Polygon|polygons} by clipping the second
 * polygon from the first.
 *
 * @module turf/difference
 * @category transformation
 * @param {Feature<Polygon>} poly1 input Polygon feaure
 * @param {Feature<Polygon>} poly2 Polygon feature to difference from `poly1`
 * @return {Feature<Polygon>} a Polygon feature showing the area of `poly1` excluding the area of `poly2`
 * @example
 * var poly1 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#0f0"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-46.738586, -23.596711],
 *       [-46.738586, -23.458207],
 *       [-46.560058, -23.458207],
 *       [-46.560058, -23.596711],
 *       [-46.738586, -23.596711]
 *     ]]
 *   }
 * };
 * var poly2 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#00f"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-46.650009, -23.631314],
 *       [-46.650009, -23.5237],
 *       [-46.509246, -23.5237],
 *       [-46.509246, -23.631314],
 *       [-46.650009, -23.631314]
 *     ]]
 *   }
 * };
 *
 * var differenced = turf.difference(poly1, poly2);
 * differenced.properties.fill = '#f00';
 *
 * var polygons = {
 *   "type": "FeatureCollection",
 *   "features": [poly1, poly2]
 * };
 *
 * //=polygons
 *
 * //=differenced
 */

module.exports = function(poly1, poly2) {
  // console.log(poly1);
  var a = poly1.coordinates ? poly1.coordinates : poly1.geometry.coordinates;
  var b = poly2.coordinates ? poly2.coordinates : poly2.geometry.coordinates;
  var u = gh.subtract(a, b);

  var feature = {
    "type": "Feature",
    "properties": {},
    "geometry": {}
  };

  if (!u || u.length == 0) {
    return undefined;
  }

  if (gh.utils.isMultiPolygon(u)) {
    if (u.length > 1) {
      feature.geometry.type = "MultiPolygon";
      feature.geometry.coordinates = u;
    } else {
      feature.geometry.type = "Polygon";
      feature.geometry.coordinates = u[0];
    }
  } else if (gh.utils.isPolygon(u)) {
    feature.geometry.type = "Polygon";
    feature.geometry.coordinates = u;
  }

  if (poly1.properties) {
    feature.properties = poly1.properties;
  }

  return feature;
};

