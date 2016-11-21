//loader.js

//Globals
var mymap;

/*
 * Initializer.
 */
function init(){
    //initialize the map
    L.mapbox.accessToken = '';
    L.mapbox.accessToken = '';
    mymap = L.mapbox.map('mapid', '', {
            center: [41.015137, 28.979530],
            zoom: 10
        });
    mymap.doubleClickZoom.disable();

    var marker = L.marker([41.015137, 28.979530]).addTo(mymap);
    setHoverPopup(marker, "I am a marker.");
    marker.on('click', function(){
        mymap.removeLayer(marker);
    });


    //L.circle([41.015137, 29.0], 400).addTo(mymap);      //radius in meters
    var circle = L.circle([41.015137, 29.0], 500, {
        color: getRandomColor(),
        fillColor: '#ffffff',
        fillOpacity: 0.5
    }).addTo(mymap);
    setHoverPopup(circle, "I am a circle.");
    circle.on('click', function(){
        mymap.removeLayer(circle);
    });

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
    firstpolyline.on('click', function(){
        mymap.removeLayer(firstpolyline);
    });

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
}