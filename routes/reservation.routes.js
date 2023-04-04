const router = require('express').Router()
const reservationControl = require('../controllers/reservation.controller.js')

router.post('/', reservationControl.saveReservation)
module.exports = router