// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/RegisterController');

router.post('/register', registerController.registerUser);
router.post('/verify-otp',registerController.verifyOtp);
router.post('/save-password',registerController.savePassword);
router.post('/resend-otp', registerController.resendOTP);
router.get('/check-mobile', registerController.checkMobile);

module.exports = router;
