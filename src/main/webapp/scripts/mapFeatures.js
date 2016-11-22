//mapFeatures.js

//Globals
var areaCounter = 0;

/**
 * Draws a circle on a map.
 */
function drawCircle() {
    alert("Select the coordinates by clicking on the map.");
    mymap.on('click',function(e){
        var radius = prompt("Enter radius in meters (>100)", "");
        if (radius != null && parseInt(radius) > 100) {
            var circle = L.circle([e.latlng.lat, e.latlng.lng], radius, {
                color: getRandomColor(),
                fillColor: '#ffffff',
                fillOpacity: 0.5
            });
            circle.addTo(mymap);
            setHoverPopup(circle, "Area " + ++areaCounter);
            circle.on('click', function(){
                mymap.removeLayer(circle);
            });
        }else{
            alert("Invalid radius. Try again.");
        }
        $('#mapid').off(e);
    });
}

function setHoverPopup(layer, message) {
    layer.bindPopup(message);
    layer.on('mouseover', function (e) {
        this.openPopup();
    });
    layer.on('mouseout', function (e) {
        this.closePopup();
    });
}
