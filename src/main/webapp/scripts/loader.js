//loader.js

//Globals
var mymap;

/*
 * Initializer.
 */
function init(){
    //initialize the map
    L.mapbox.accessToken = '';
    mymap = L.mapbox.map('mapid', '', {
        center: [41.015137, 28.979530],
        zoom: 10
    });

    var marker = L.marker([41.015137, 28.979530]).addTo(mymap);
    marker.bindPopup("I am a marker.");

    //L.circle([41.015137, 29.0], 400).addTo(mymap);      //radius in meters
    var circle = L.circle([41.015137, 29.0], 500, {
        color: getRandomColor(),
        fillColor: '#ffffff',
        fillOpacity: 0.5
    }).addTo(mymap);
    circle.bindPopup("I am a circle.");

    var pointList = [];
    pointList.push(new L.LatLng(28.9686470031738, 77.9686470031738));
    pointList.push(new L.LatLng(0, 0));
    pointList.push(new L.LatLng(45, 45));

    var firstpolyline = new L.Polyline(pointList, {
        color: getRandomColor(),
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    });
    firstpolyline.addTo(mymap);

    /*var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(mymap);*/


    /*map = new ol.Map({
        layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
            })
        ],
        projection: "EPSG:3857",
        target: 'map',
        view: new ol.View({
            center: ol.proj.fromLonLat([28.979530, 41.015137]),
            zoom: 9
        })
    });*/

    $(document).ready(function() {
       $('.selectpicker').selectpicker();
    });
}

function drawLine(route){

    var coordinates = [[0, 0], [45, 45]];

    var layerLines = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [new ol.Feature({
                geometry: (new ol.geom.LineString(route)).transform('EPSG:4326', 'EPSG:3857'),
                //geometry: new ol.geom.LineString(coordinates),
                name: 'Line'
            })]
        }),
    });

    map.addLayer(layerLines);

    /*var lineString = new ol.geom.LineString([[lon1,lat1],[lon2,lat2]]);
    // transform to EPSG:3857
    lineString.transform('EPSG:4326', 'EPSG:3857');

    // create the feature
    var feature = new ol.Feature({
        geometry: lineString,
        name: 'Line'
    });

    var lineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 10
        })
    });

    var source = new ol.source.Vector({
    	features: [feature]
    });
    var vector = new ol.layer.Vector({
    	source: source,
    	style: [lineStyle]
    });

    map.addLayer(vector);*/




    /*var lineLayer = new OpenLayers.Layer.Vector("Line Layer");
    map.addLayer(lineLayer);
    map.addControl(new OpenLayers.Control.DrawFeature(lineLayer, OpenLayers.Handler.Path));

    var points = new Array(
       new OpenLayers.Geometry.Point(lon1, lat1),
       new OpenLayers.Geometry.Point(lon2, lat2)
    );

    var line = new OpenLayers.Geometry.LineString(points);

    var style = {
      strokeColor: getRandomColor(),
      strokeOpacity: 0.5,
      strokeWidth: 5
    };

    var lineFeature = new OpenLayers.Feature.Vector(line, null, style);
    lineLayer.addFeatures([lineFeature]);*/
}

function reset(){

}