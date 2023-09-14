// controllers/businessController.js
const BusinessSector = require('../models/business');

const {ValidationResult, validationResult} = require('express-validator')

exports.getAllBusinessSectors = async (req, res) => {
  try {
    const business = await BusinessSector.find({});
    res.json(business);
  } catch (error) {
    console.error('Error fetching business data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addBusinessSector = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  try {
    const newBusiness = req.body;
    console.log(newBusiness)
    const createdbusiness = await BusinessSector.create(newBusiness);
    res.status(201).json(createdbusiness);
  } catch (error) {
    console.error('Error adding business:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.updateBusinessSector = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  try {
    const updatedData = req.body;
    const businessSectorId = req.params.id;
    // console.log(businessSectorId);

  
    const updatedBusinessSector = await BusinessSector.findByIdAndUpdate(
      businessSectorId,
      updatedData,
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedBusinessSector) {
      return res.status(404).json({ error: 'Business Sector not found' });
    }

    res.status(200).json(updatedBusinessSector);
  } catch (error) {
    console.error('Error updating business sector:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteBusinessSector= async (req, res) => {
  try {

    const businessId = req.params.id;
    await BusinessSector.findByIdAndRemove(businessId);
    res.status(204).end();
  } catch (error) {
    console.error('Error bus business:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};