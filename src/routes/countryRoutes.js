// routes/countryRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const countryController = require('../controllers/countryControllers');

const countryIdRegex = /^[0-9]+$/;
const countryNameRegex = /^[A-Za-z ]+$/;
const countryCodeRegex = /^[0-9a-zA-Z]+$/;


router.get('/get', countryController.getAllCountries);


router.post(
  '/post',
  [
    body('country_id')
      .matches(countryIdRegex)
      .withMessage('Country ID must contain only numbers'),
    body('country_name')
      .matches(countryNameRegex)
      .withMessage('Country Name must contain only letters'),
    body('country_code')
      .matches(countryCodeRegex)
      .withMessage('Code must contain only letters and numbers'),
  ],
  countryController.createCountry
);

router.put(
  '/update/:id',
  [
    body('country_id')
      .optional()
      .matches(countryIdRegex)
      .withMessage('Country ID must contain only numbers'),
    body('country_name')
      .optional()
      .matches(countryNameRegex)
      .withMessage('Country Name must contain only letters'),
    body('country_code')
      .optional()
      .matches(countryCodeRegex)
      .withMessage('Code must contain only letters and numbers'),
  ],
  countryController.updateCountry
);

router.delete('/delete/:id', countryController.deleteCountry);

module.exports = router;
