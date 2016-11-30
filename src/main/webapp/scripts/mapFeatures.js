//mapFeatures.js

//Globals
var areaCounter = 0;

/**
 * Draws a circle on a map.
 */
function drawCircle() {
    //alert("Select the coordinates by clicking on the map.");          //this is annoying
    $('#mapid').one('click',function(e){
        var radius = prompt("Enter radius in meters (>100)", "");
        if (radius != null && parseInt(radius) > 100) {
            var circle = L.circle([lat, lng], radius, {
                color: getRandomColor(),
                fillColor: '#ffffff',
                fillOpacity: 0.5
            });
            //console.log(lat+','+lng+','+parseInt(radius));
            //console.log(getEstimatedCoordinates(lat,lng,parseInt(radius)));
            circle.addTo(mymap);
            setHoverPopup(circle, "Area " + ++areaCounter);
            circle.on('click', function(){
                mymap.removeLayer(circle);
            });
        }else{
            alert("Invalid radius. Try again.");
        }
    });
}

/*
 * Set a hover popup for map objects to identify themselves.
 */
function setHoverPopup(layer, message) {
    layer.bindPopup(message);
    layer.on('mouseover', function (e) {
        this.openPopup();
    });
    layer.on('mouseout', function (e) {
        this.closePopup();
    });
}

function getRoutesInsideAnArea(area,start,end){
    for(var i=0; i<3588; ++i){
        //server call for mmsi
        //foreach mmsi x,y call isInside
        //if satisfied amount of x,y is inside add mmsi route to the print list
    }
}

/*
 * Calculates estimated values (EARTH IS NOT FLAT)
 * @param center (lat,lon) json array
 * @param radius radius in meters
 * @return Square shape area coordinates in json array (more corner is better, i'll go with this one, also the map shows a circle that's why i narrow the estimation a bit more)
 */
function getEstimatedCoordinates(lat,lon,radius){
    var area = [];
    var r = (radius-70)/1000;                //trimming by N meters

    area.push({'lat':lat+r, 'lon':lon+r});
    area.push({'lat':lat+r, 'lon':lon-r});
    area.push({'lat':lat-r, 'lon':lon+r});
    area.push({'lat':lat-r, 'lon':lon-r});

    return area;
}

/*
 * @return if the coordinate is inside of the estimated area.
 */
function isInside(area,lat,lon){
    if( area[0].lat > lat && area[0].lon > lon &&
        area[1].lat > lat && area[1].lon < lon &&
        area[2].lat < lat && area[2].lon > lon &&
        area[3].lat < lat && area[3].lon < lon){

            return true;
        }

    return false;
}
