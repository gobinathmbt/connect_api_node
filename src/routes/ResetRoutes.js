// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const resetController = require('../controllers/ResetController');

router.post('/reset', resetController.loginUser);
router.post('/resetPassword',resetController.resetPassword)
router.post('/verifyOtp',resetController.verifyOtp);



module.exports = router;
