// routes/districtRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const districtController = require('../controllers/districtController');

// Get all districts
router.get('/get', districtController.getAllDistricts);

// Create a new district
router.post(
    '/post',
    [
        body('district_id')
            .matches(/^[0-9]+$/)
            .withMessage('District ID must contain only numbers'),
        body('district_name')
            .matches(/^[A-Za-z ]+$/)
            .withMessage('District Name must contain only letters'),
        body('district_code')
            .optional()
            .matches(/^[0-9a-zA-Z]+$/)
            .withMessage('District Code must contain only letters and numbers'),
        body('country_id')
            .isMongoId()
            .withMessage('Invalid Country ID'),
        body('state_id')
            .isMongoId()
            .withMessage('Invalid State ID'),
    ],
    districtController.createDistrict
);

// Update a district by ID
router.put(
    '/update/:id',
    [
        body('district_id')
            .optional()
            .matches(/^[0-9]+$/)
            .withMessage('District ID must contain only numbers'),
        body('district_name')
            .optional()
            .matches(/^[A-Za-z ]+$/)
            .withMessage('District Name must contain only letters'),
        body('district_code')
            .optional()
            .matches(/^[0-9a-zA-Z]+$/)
            .withMessage('District Code must contain only letters and numbers'),
        body('country_id')
            .optional()
            .isMongoId()
            .withMessage('Invalid Country ID'),
        body('state_id')
            .optional()
            .isMongoId()
            .withMessage('Invalid State ID'),
    ],
    districtController.updateDistrict
);

// Delete a district by ID
router.delete('/delete/:id', districtController.deleteDistrict);

module.exports = router;
