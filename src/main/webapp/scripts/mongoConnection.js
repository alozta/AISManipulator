//mongoConnection.js

/**
 * Get vessel info and draw it to the map.
 * Mode 1 represents automatic calls between functions.
 * Mode !1 expects user input to work with.
 */
function getVesselInfo(mode,_mmsi,_start,_end){
    var mmsi = document.getElementById("mmsiSelectBox").value;
    var start = document.getElementById("startDate").value;
    var end = document.getElementById("endDate").value;

    if(mode == 1){
        mmsi = _mmsi;
        start = _start;
        end = _end;
    }
    else{
        console.log(mmsi);
        console.log(start);
        console.log(end);
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {             //SERVER RESPONSE READY
        if (this.readyState == 4 && this.status == 200) {
            //console.log("response text:\n"+this.responseText);

            if(this.responseText==''){              //in case of server request fails
                if(mode != 1)
                    alert('Data is broken for this one :( @failed_mongo_function');
                else
                    routeList.push([]);
                return;
            }else if(this.responseText=='[]'){
                if(mode != 1)
                    alert('Data is broken for this one :( @empty_offline_data');
                else
                    routeList.push([]);
                return;
            }
            var response = JSON.parse(this.responseText);

            var route = getSpecificVesselInfo(response,start,end);                //get data between start and end date
            //console.log(route);

            if(mode == 1){
                routeList.push(route);
                //console.log("route: " + route);
                return;
            }

            if(mode != 1){
                var selectedRoutePolyline = new L.Polyline(route, {
                    color: getRandomColor(),
                    weight: 3,
                    opacity: 0.5,
                    smoothFactor: 1
                });
                selectedRoutePolyline.addTo(mymap);                             //add polyline layer to the map
                setHoverPopup(selectedRoutePolyline, mmsi);                     //pop-up mmsi
                selectedRoutePolyline.on('click', function(){
                    mymap.removeLayer(selectedRoutePolyline);
                });
            }

            console.log("server is responded");
            routeList.push([]);
        }
    }

    var url="http://127.0.0.1:8080/getvesselinfo?i="+getVesselIndex(mmsi);
    //console.log('url is sent: '+url);
    if ("withCredentials" in xhttp) {
        xhttp.open("GET", url, false);      //true asynchronous
    }
    else if (typeof XDomainRequest != "undefined") {
        xhttp = new XDomainRequest();
        xhttp.open("GET", url, false);
    }
    else {
        xhttp = null;
    }
    xhttp.send(null);

    xhttp.onerror = function() {
        console.log('There was an error!');
    };
}

function fillMMMSISelectBox(){

    var mmsi_list = distinct_vessel_mmsi;
    var sel = document.getElementById('mmsiSelectBox');

    for(var i=0; i<Object.keys(mmsi_list).length; ++i){
        var opt = document.createElement('option');
        opt.innerHTML = mmsi_list[i];
        opt.value = mmsi_list[i];
        sel.appendChild(opt);
    }
}

/**
 * Reset.
 */
function reset(){
    location.reload();
}

/**
 * Random color generator.
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*
 * @return mmsi index on the selectbox.
 */
function getVesselIndex(mmsi){
    for(var i=0; i<distinct_vessel_mmsi.length; ++i){
        if(distinct_vessel_mmsi[i] == mmsi){
            return i;
        }
    }
    return -1;
}

/*
 * Equivalent of previously written mongodb function.
 * @param data json array
 * @startDate iso date
 * @endDate iso date
 * @return route with certain date interval.
 */
function getSpecificVesselInfo(data,startDate,endDate){
    var route = [];
    for(var i=0; i<data.length; ++i){
        if(data[i].date > startDate && data[i].date < endDate)
            route.push([parseFloat(data[i].lat.replace(/,/g, '.')), parseFloat(data[i].lon.replace(/,/g, '.'))]);
    }
    return route;
}

