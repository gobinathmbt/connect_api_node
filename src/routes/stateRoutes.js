// routes/stateRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const stateController = require('../controllers/stateControllers');

const stateUidRegex = /^[0-9]+$/;
const stateNameRegex = /^[A-Za-z ]+$/;
const stateCodeRegex = /^[0-9a-zA-Z]+$/;



router.get('/get', stateController.getAllStates);

router.post(
  '/post',
  [
    body('state_id')
      .matches(stateUidRegex)
      .withMessage('State UID must contain only numbers'),
    body('state_name')
      .matches(stateNameRegex)
      .withMessage('State Name must contain only letters'),
    body('state_code')
      .optional()
      .matches(stateCodeRegex)
      .withMessage('Code must contain only letters and numbers'),
    body('country_id')
      .isMongoId()
      .withMessage('Invalid Country ID'),
  ],
  stateController.createState
);

router.put(
  '/update/:id',
  [
    body('state_id')
      .optional()
      .matches(stateUidRegex)
      .withMessage('State UID must contain only numbers'),
    body('state_name')
      .optional()
      .matches(stateNameRegex)
      .withMessage('State Name must contain only letters'),
    body('state_code')
      .optional()
      .matches(stateCodeRegex)
      .withMessage('Code must contain only letters and numbers'),
    body('country_id')
      .optional()
      .isMongoId()
      .withMessage('Invalid Country ID'),
  ],
  stateController.updateState
);

router.delete('/delete/:id', stateController.deleteState);

module.exports = router;
