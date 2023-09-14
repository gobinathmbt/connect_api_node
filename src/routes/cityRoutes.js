// routes/cityRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const cityController = require('../controllers/cityControllers');

// Get all cities
router.get('/get', cityController.getAllCities);

// Create a new city
router.post(
    '/post',
    [
        body('city_id')
            .matches(/^[0-9]+$/)
            .withMessage('City ID must contain only numbers'),
        body('city_name')
            .matches(/^[A-Za-z ]+$/)
            .withMessage('City Name must contain only letters'),
        body('city_code')
            .optional()
            .matches(/^[0-9a-zA-Z]+$/)
            .withMessage('City Code must contain only letters and numbers'),
        body('country_id')
            .isMongoId()
            .withMessage('Invalid Country ID'),
        body('state_id')
            .isMongoId()
            .withMessage('Invalid State ID'),
        body('district_id')
            .isMongoId()
            .withMessage('Invalid District ID'),
    ],
    cityController.createCity
);

// Update a city by ID
router.put(
    '/update/:id',
    [
        body('city_id')
            .optional()
            .matches(/^[0-9]+$/)
            .withMessage('City ID must contain only numbers'),
        body('city_name')
            .optional()
            .matches(/^[A-Za-z ]+$/)
            .withMessage('City Name must contain only letters'),
        body('city_code')
            .optional()
            .matches(/^[0-9a-zA-Z]+$/)
            .withMessage('City Code must contain only letters and numbers'),
        body('country_id')
            .optional()
            .isMongoId()
            .withMessage('Invalid Country ID'),
        body('state_id')
            .optional()
            .isMongoId()
            .withMessage('Invalid State ID'),
        body('district_id')
            .optional()
            .isMongoId()
            .withMessage('Invalid District ID'),
    ],
    cityController.updateCity
);

// Delete a city by ID
router.delete('/delete/:id', cityController.deleteCity);

module.exports = router;
