function() {
    return db.ais.aggregate
    (
        [{
            $group:
            {
                _id: '$mmsi'
             }
        }],
        {allowDiskUse:true}
    );
}