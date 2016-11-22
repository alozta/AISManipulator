//old.js
//here lies dead functions which may be useful in the future


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


function fillMMMSISelectBox(){
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