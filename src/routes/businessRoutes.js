const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const businessController = require('../controllers/businesscontrollers');


//regex validation
const businessUidRegex = /^[0-9]+$/;
const businessNameRegex = /^[A-Za-z ]+$/;
const businessCodeRegex = /^[0-9a-zA-Z]+$/;


//get- fecth and get the data
router.get('/businesssectors', businessController.getAllBusinessSectors);

//post- to add the data
//with backend validation
router.post('/businesssectors',

[
  body('business_uid')
 .matches(businessUidRegex).withMessage('Business UID must contain only numbers'),

 body('business_name')
 .matches(businessNameRegex).withMessage('Business Name must contain only letters'),
 
 body('code')
 .optional()
 .matches(businessCodeRegex)
 .withMessage('Code must contain only letters and numbers'),

],

businessController.addBusinessSector);

 //put- to update the data
 //with backend validation
 router.put('/businesssectors/:id',

[
    body('business_uid')
   .matches(businessUidRegex).withMessage('Business UID must contain only numbers'),
  
   body('business_name')
   .matches(businessNameRegex).withMessage('Business Name must contain only letters'),
   
   body('code')
   .optional()
   .matches(businessCodeRegex)
   .withMessage('Code must contain only letters and numbers'),
  
  ],
  

businessController.updateBusinessSector);


//delete- to remove the data
router.delete('/businesssectors/:id', businessController.deleteBusinessSector);


module.exports = router;
