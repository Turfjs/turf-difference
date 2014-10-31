turf-erase
===
[![build status](https://secure.travis-ci.org/Turfjs/turf-erase.png)](http://travis-ci.org/Turfjs/turf-erase)

Find the difference between two polygons by clipping the second polygon from the first.

##Install

```sh
npm install turf-intersect
```

##Parameters
name|description
---|---
feature1|Geometry or Feature
feature2|Geometry or Feature

##Usage

```js
erase(poly1, poly2)
```

###Example

```js
var erase = require('turf-erase');
var park = require('park.json');
var lake = require('lake.json');

var erased = erase(park, lake);
console.log(erased);
```
