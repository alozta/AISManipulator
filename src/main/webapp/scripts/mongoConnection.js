//mongoConnection.js

/**
 * Get vessel info and draw it to the map.
 */
function getVesselInfo(){
    var mmsi = document.getElementById("mmsiSelectBox").value;
    var start = document.getElementById("startDate").value;
    var end = document.getElementById("endDate").value;

    console.log(mmsi);
    console.log(start);
    console.log(end);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {             //SERVER RESPONSE READY
        if (this.readyState == 4 && this.status == 200) {
        console.log("response text:\n"+this.responseText);
            if(this.responseText==''){              //in case of server request fails
                alert('Date interval for this vessel exceeds the system limitations. Choose a smaller one.');
                return;
            }
            var response = JSON.parse(this.responseText);

            var route = [];
            for(var i=0; i<Object.keys(response).length; ++i){
                //response[i]['lat']
                //response[i]['lon']
                var lon = response[i]['lon'].replace(/,/g, '.');
                var lat = response[i]['lat'].replace(/,/g, '.');
                //console.log(lon,lat);
                route.push([parseFloat(lat),parseFloat(lon)]);
            }
            //console.log(route);

            /*var marker = L.marker([41.0, 29]);
            marker.addTo(mymap);*/                  //test: dynamic layer addition, OK

            var firstpolyline = new L.Polyline(route, {
                color: getRandomColor(),
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
            });
            firstpolyline.addTo(mymap);             //add polyline layer to the map
            //console.log(response);
            console.log("server is responded");
        }
    }

    var url="http://127.0.0.1:8080/getvesselinfo?mmsi="+mmsi+"&start="+start+"&end="+end;
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
    document.getElementById("mmsiSelectBox").value = '';
    document.getElementById("startDate").value = '';
    document.getElementById("endDate").value = '';
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







//*****************************************************************************
//OLD VERSIONS


/*
var mongoclient;

//initializes mongo connection
function setupMongoConnection(){
    // Set up the connection to the local db
    mongoclient = new Mongo("localhost", 27017);
}

function getAllDistinctMMSIs(){
    // Open the connection to the server
    mongoclient.open(function(err, mongoclient) {
        var db = mongoclient.db("bitirme");
        var result = db.eval("getAllDistinctMMSIs()");
        console.log(result);
        mongoclient.close();
    });
}
*/

/*function fillMMMSISelectBox(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {             //SERVER RESPONSE READY
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                var sel = document.getElementById('mmsiSelectBox');

                for(var i=0; i<Object.keys(response).length; ++i){
                    selectboxText += '<option>' + response[i]['_id'] + '</option>';
                    var opt = document.createElement('option');
                        opt.innerHTML = response[i]['_id'];
                        opt.value = response[i]['_id'];
                        sel.appendChild(opt);
                }
                console.log("server is responded");
            }
        }

        var url="http://127.0.0.1:8080/getvesselids";
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
}*/