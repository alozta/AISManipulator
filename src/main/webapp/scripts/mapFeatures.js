//mapFeatures.js

//Globals
var areaCounter = 0;
var routeList = [];
var mmsiList = [];

/**
 * Draws a circle on a map.
 */
function drawCircle() {
	//alert("Select the coordinates by clicking on the map.");          //this is annoying
	$('#mapid').one('click',function(e){
		var radius = prompt("Enter radius in meters (>=100)", "");
		if (radius != null && parseInt(radius) >= 100) {
			var circle = L.circle([lat, lng], radius, {
				color: getRandomColor(),
				fillColor: '#ffffff',
				fillOpacity: 0.5
			});
			circle.addTo(mymap);
			setHoverPopup(circle, "Area " + ++areaCounter);
			circle.on('click', function(){
				mymap.removeLayer(circle);
			});
			console.log(lat+','+lng+','+parseInt(radius));
			var start = document.getElementById("startDate").value;
			var end = document.getElementById("endDate").value;
			var intersectedRoutes;
			if(start=='' && end == '') intersectedRoutes = getRoutesInsideAnArea(getAreaLimit(lat,lng,parseInt(radius)),"2013","2017");
			else if(start=='') intersectedRoutes = getRoutesInsideAnArea(getAreaLimit(lat,lng,parseInt(radius)),"2013",end);
			else if(end=='') intersectedRoutes = getRoutesInsideAnArea(getAreaLimit(lat,lng,parseInt(radius)),start,"2017");
			else if(start!='' && end != '') intersectedRoutes = getRoutesInsideAnArea(getAreaLimit(lat,lng,parseInt(radius)),start,end);
			console.log("intersected routes:\n" + intersectedRoutes);
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

/**
 * Checks if the existed routes pass through from area given.
 * @return mmsi list that passes through from the area.
 */
function getRoutesInsideAnArea(area,start,end){
	var reactionThreshold = 100;            //bigger the value less sensitive the noise
	var routeLimit = 1000;                    //browser memory limitations
	for(var i=0; i<3588; ++i){
		getVesselInfo(1,distinct_vessel_mmsi[i],start,end);

		if(i>=routeLimit) break;
	}

	for(var i=0; routeList.length < routeLimit; ++i){                  //wait operation to complete
		console.log(routeList.length);
		if(i==3588) break;
	}

	//console.log(routeList);
	//return;

	for(var i=0; i<routeList.length; ++i){
		var sampleInArea = 0;
		for(var j=0; j<routeList[i].length; ++j){
			if(isInside(area,routeList[i][j][0],routeList[i][j][1])){
				++sampleInArea;
				//console.log("sample in area");
			}
			if(sampleInArea > reactionThreshold){           //if route is in the area
				mmsiList.push(distinct_vessel_mmsi[i]);
				//console.log("route inside area: " + distinct_vessel_mmsi[i]);

				var selectedRoutePolyline = new L.Polyline(routeList[i], {  //draw the route
					color: getRandomColor(),
					weight: 3,
					opacity: 0.5,
					smoothFactor: 1
				});
				selectedRoutePolyline.addTo(mymap);
				setHoverPopup(selectedRoutePolyline, distinct_vessel_mmsi[i]);
				selectedRoutePolyline.on('click', function(){
					mymap.removeLayer(selectedRoutePolyline);
				});

				break;
			}
		}
	}

	return mmsiList;
}

/*
 * Calculates estimated circled area limit values (northwest,northeast,southwest,southeast respectively) (EARTH IS NOT FLAT)
 * @param lat latitude
 * @param lon longitude
 * @param radius radius in meters
 * @return Square shape area coordinates in json array (more corner is better, i'll go with this one, also the map shows a circle that's why i narrow the estimation a bit more)
 */
function getAreaLimit(lat,lon,radius){
	var area = [];
	var r = (radius-70)/25000;                //output of these numbers are good enough around the Bosphorus
	//console.log("r: "+r);

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

	//console.log("area: " + area);
	//console.log("lat: " + lat + ", lon: " + lon);
	return false;
}
