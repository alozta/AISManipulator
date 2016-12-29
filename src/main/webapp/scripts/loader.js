//loader.js

//Globals
var mymap;
var lat, lng;

/*
 * Initializer.
 */
function init(){
    //initialize the map
    L.mapbox.accessToken = mapboxAccessToken;
    mymap = L.mapbox.map('mapid', mapboxMapid, {
            center: [41.015137, 28.979530],
            zoom: 10
        });
    mymap.doubleClickZoom.disable();

    /* leaflet samples
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
    */

    $(document).ready(function() {
       $('.selectpicker').selectpicker();
    });

    mymap.addEventListener('mousemove', function(ev) {
       lat = ev.latlng.lat;
       lng = ev.latlng.lng;
    });

    //getResultAsJSON(_sample5_20161010,"2016-10-10","2016-10-11");
    //getResultAsJSON(_sample5_20161011,"2016-10-11","2016-10-12");
    //getResultAsJSON(_sample5_20161012,"2016-10-12","2016-10-13");
    //getResultAsJSON(_sample5_20161013,"2016-10-13","2016-10-14");
    //getResultAsJSON(_sample5_20161014,"2016-10-14","2016-10-15");
    //getResultAsJSON(_sample5_20161015,"2016-10-15","2016-10-16");
    //getResultAsJSON(_sample5_20161016,"2016-10-16","2016-10-17");
    //getResultAsJSON(_sample5_20161017,"2016-10-17","2016-10-18");
    //getResultAsJSON(_sample5_20161018,"2016-10-18","2016-10-19");
    //getResultAsJSON(_sample5_20161026,"2016-10-26","2016-10-27");
    //getResultAsJSON(_sample5_20161027,"2016-10-27","2016-10-28");
    //getResultAsJSON(_sample5_20161028,"2016-10-28","2016-10-29");
    //getResultAsJSON(_sample5_20161101,"2016-11-01","2016-11-02");
    //getResultAsJSON(_sample5_20161102,"2016-11-02","2016-11-03");
    //getResultAsJSON(_sample5_20161103,"2016-11-03","2016-11-04");
    //getResultAsJSON(_sample5_20161104,"2016-11-04","2016-11-05");
    //getResultAsJSON(_sample5_20161105,"2016-11-05","2016-11-06");
    //getResultAsJSON(_sample5_20161106,"2016-11-06","2016-11-07");
    //getResultAsJSON(_sample5_20161107,"2016-11-07","2016-11-08");
    //getResultAsJSON(_sample5_20161108,"2016-11-08","2016-11-09");
    //getResultAsJSON(_sample5_20161109,"2016-11-09","2016-11-10");
    //getResultAsJSON(_sample5_20161110,"2016-11-10","2016-11-11");
    //getResultAsJSON(_sample5_20161111,"2016-11-11","2016-11-12");
    //getResultAsJSON(_sample5_20161112,"2016-11-12","2016-11-13");
    //getResultAsJSON(_sample5_20161113,"2016-11-13","2016-11-14");
    //getResultAsJSON(_sample5_20161114,"2016-11-14","2016-11-15");
    //getResultAsJSON(_sample5_20161115,"2016-11-15","2016-11-16");
    //getResultAsJSON(_sample5_20161116,"2016-11-16","2016-11-17");
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