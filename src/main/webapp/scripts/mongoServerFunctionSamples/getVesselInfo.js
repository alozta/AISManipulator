function(MMSI,startDate,endDate) {
    return db.ais.aggregate
        (
            {
                $match : {
                    mmsi: MMSI,
                    date: {$gte: startDate, $lt: endDate}     //date format: "2013-01-01T00:00:00.0Z"
                }
            } ,
            {
                $project :
                {
                    //"_id" : 0,
                    "mmsi" : 1,
                    //"date" : 0,
                    "lat": 1,
                    "lon":1
                }
            } ,
            {
                $sort :
                {
                    "date" : -1
                }
            }
        );
}