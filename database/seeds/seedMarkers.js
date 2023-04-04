const data = require('../../data/index')
const markerQueries =  require("../queries/markers.queries");

exports.seedMarkers = async () => {
    try {
        await markerQueries.clearMarkers()
        let markers = await data.getMarkers()
        await markerQueries.saveMarkers(markers)
        console.log('Markers saved')
    }catch (e) {
        console.log(e)
    }
}