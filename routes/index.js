const router = require('express').Router()
const usersRouter = require('./users.routes.js')
const authRouter = require('./auth.routes.js')
const mapRouter = require('./map.routes.js')
const campRouter = require('./camp.routes.js')
const contactRouter = require('./contact.routes.js')
const reservationRouter = require('./reservation.routes.js')

router.use("/api/users", usersRouter)
router.use("/api/auth", authRouter)
router.use("/api/map", mapRouter)
router.use("/api/camp", campRouter)
router.use("/api/contact", contactRouter)
router.use("/api/reservation", reservationRouter)

module.exports = router