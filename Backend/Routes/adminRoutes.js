const express = require('express')
const router = express.Router()
const adminController = require('../Controllers/adminController')

router.get('/register', adminController.adminReg)
router.post('/register', adminController.adminRegistration)
router.get('/login', adminController.adminLog)
router.post('/login', adminController.adminLogin)
router.get('/view-users', adminController.viewUsers)

module.exports = router