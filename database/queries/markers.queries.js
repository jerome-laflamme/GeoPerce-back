const Marker = require("../models/marker.model");

exports.clearMarkers = () => {
    return Marker.deleteMany({});
}

exports.saveMarkers = (markers) => {
    return Marker.insertMany(markers);
}

exports.getMarkers = (filters) => {
    return Marker.find(filters);
}
