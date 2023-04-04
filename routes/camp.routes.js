const router = require('express').Router()
const campControl = require('../controllers/camp.controller.js')

router.get('/', campControl.getCamps)
router.post('/save', campControl.saveOneNewCamp)
router.post('/update', campControl.updateCamp)
router.post('/:id', campControl.clearCamp)
module.exports = router