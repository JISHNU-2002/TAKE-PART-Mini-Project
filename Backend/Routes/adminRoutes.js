const express = require('express')
const router = express.Router()
const adminController = require('../Controllers/adminController')

router.post('/register', adminController.adminRegistration)
router.get('/view-users', adminController.viewUsers)

module.exports = router