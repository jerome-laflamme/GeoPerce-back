const router = require('express').Router()
const authController = require('../controllers/auth.controller.js')


router.post('/', authController.sessionCreate);
router.delete('/', authController.sessionDelete);


module.exports = router