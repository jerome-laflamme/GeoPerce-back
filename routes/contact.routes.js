const router = require('express').Router()
const contactControl = require('../controllers/contact.controller.js')

router.post('/', contactControl.sendForm)
module.exports = router