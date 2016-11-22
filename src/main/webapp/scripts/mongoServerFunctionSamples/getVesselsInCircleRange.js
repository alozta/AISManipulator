function(lat, lon, r, distinct_vessel_mmsi) {

    var inside = [];

    for(var i=0; i<distinct_vessel_mmsi.length; ++i){
        if(isInsideOfCircle(lat,lon,r,distinct_vessel_mmsi[i])){
            inside.push(distinct_vessel_mmsi[i]);
        }
    }

    return inside;
}