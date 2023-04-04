const MARKERS_FILE = "./data/json/markers.json"
const CAMPS_FILE = "./data/json/camps.json"

const Loader = require("./Loader.js");

const MarkersLoader = new Loader(MARKERS_FILE);
const CampsLoader = new Loader(CAMPS_FILE);


exports.getMarkers = () => { return MarkersLoader.get(); }
exports.getCamps = () => { return CampsLoader.get(); }
