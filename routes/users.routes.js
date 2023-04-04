const router = require('express').Router()
const usersControl = require('../controllers/users.controller.js')
const { check } = require('express-validator');

router.post('/', [
    check('local.email').isEmail(),
    check('local.password').isLength({ min: 3 })], usersControl.signup);
router.post('/update', usersControl.updateUser);
router.get('/', usersControl.fetchCurrentUser);

module.exports = router