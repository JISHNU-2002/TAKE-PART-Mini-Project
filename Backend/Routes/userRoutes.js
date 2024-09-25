const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/register', userController.userReg);
router.post('/register', userController.userRegistration);
router.get('/login', userController.userLog);
router.post('/login', userController.userLogin);
router.get('/view-users', userController.viewUsers);

module.exports = router;
