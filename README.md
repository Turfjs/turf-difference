turf-erase
=============
[![Build Status](https://travis-ci.org/Turfjs/turf-erase.svg?branch=master)](https://travis-ci.org/Turfjs/turf-erase)

Returns polygon 1 minus polygon 2.

```javascript
var erase = require('turf-erase')

var poly1 = JSON.parse(fs.readFileSync('/path/to/poly1.geojson'))
var poly2 = JSON.parse(fs.readFileSync('/path/to/poly2.geojson'))

var erased = erase(polys1, polys2)

console.log(erased)
```