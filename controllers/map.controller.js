const markerQueries = require('../database/queries/markers.queries')

exports.getMarkers = async (req,res,next) => {
    try{
        let query = {
            type:req.query.filters
        }
        let markers = await markerQueries.getMarkers(query)
        res.send(markers)
    }catch(e){
        console.log(e)
    }
}