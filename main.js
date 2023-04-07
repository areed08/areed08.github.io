import {Feature, Map, View} from 'ol/index.js';
import {OSM, Vector, Cluster} from 'ol/source.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {useGeographic} from 'ol/proj.js';
import Style from 'ol/style/Style';
import {Circle as CircleStyle, Fill} from 'ol/style.js'

useGeographic();

const calPoly = [-120.6625, 35.3050]
const point1 =[-120.675415,35.294541]
const point2 =[-122.241727,47.960716]
const point3 = [-120.655653,35.281786]
const point4 = [-122.420300, 37.779399]
const point5 = [-122.473001, 37.768544]

var features = [
  new Feature(new Point(calPoly)),
  new Feature(new Point(point1)),
  new Feature(new Point(point2)),
  new Feature(new Point(point3)),
  new Feature(new Point(point4)),
  new Feature(new Point(point5)),
]

var clusterSource = new Cluster({
  distance: 10,
  source: new Vector({ features: features }),
});

const styleCache = {};
const clusters = new VectorLayer({
  source: clusterSource,
  style: function (feature) {
    const size = feature.get('features').length;
    let style = styleCache[size];
    if (size == 1) {
      style = new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: 'yellow',
          }),
        }),
      });
      styleCache[size] = style;
    }
    if (size == 2) {
      style = new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: 'blue',
          }),
        }),
      });
      styleCache[size] = style;
    }
    if (size >= 3) {
      style = new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: 'purple',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
});

const map = new Map({
  target: 'map',
  view: new View({
    center: calPoly,
    zoom: 4.5,
  }),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    clusters
  ],
});
