/**
 * lat: dot notation
 * lon: dot notation
 * all variables are in string format
 */
function(lat, lon, r, vesselMmsi) {
    var PI_DIV_180 = Math.PI / 180;
    var EARTH_RADIUS = 6371000;

    var mmsiLog = getVesselInfo(vesselMmsi,"2013","2017").toArray();

    var fixedLat = parseFloat(lat);
    var fixedLon = parseFloat(lon);
    var fixedR = parseInt(r);

    for(var i=0; i<mmsiLog.length; ++i){
        var fixedMmsiLat = parseFloat(mmsiLog[i].lat.replace(/,/g, '.'));
        var fixedMmsiLon = parseFloat(mmsiLog[i].lon.replace(/,/g, '.'));

        if(fixedMmsiLat>-90.0 && fixedMmsiLat<90.0 && fixedMmsiLon>-180.0 && fixedMmsiLon<180.0){
            var dLat = (fixedLat - fixedMmsiLat) * PI_DIV_180;
            var dLon = (fixedLon - fixedMmsiLon) * PI_DIV_180;
            var a = 0.5 - Math.cos(dLat) / 2 + Math.cos(fixedMmsiLat * PI_DIV_180) * Math.cos(fixedLat * PI_DIV_180) * (1 - Math.cos(dLon)) / 2;
            var d = Math.round(EARTH_RADIUS * 2 * Math.asin(Math.sqrt(a)));

            if(d < fixedR){
                return true;
            }
        }
    }
    return false;
}