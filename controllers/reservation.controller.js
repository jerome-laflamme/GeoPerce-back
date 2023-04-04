const campQueries = require('../database/queries/camp.queries')


exports.saveReservation = async (req, res) => {
    try {
        const booking = {
            bookingDates: req.body.params.booking.wantedDates,
            name: req.body.params.booking.name,
            email: req.body.params.booking.email,
            phone: req.body.params.booking.phone,
            equipment: req.body.params.booking.equipment,
            card: req.body.params.booking.card,
        }
        let reservation = await campQueries.saveReservation(req.body.params.booking.campId, booking)
        res.send(reservation)
    } catch (e) {
        console.log(e)
    }
}
