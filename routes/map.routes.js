const router = require('express').Router()
const mapControl = require('../controllers/map.controller.js')

router.get('/', mapControl.getMarkers)

module.exports = router