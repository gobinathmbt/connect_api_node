// controllers/countryController.js
const { validationResult } = require('express-validator');
const Country = require('../models/countryModel');
const State = require('../models/stateModel');

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find({});
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createCountry = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCountry = new Country(req.body);
    const savedCountry = await newCountry.save();
    res.json(savedCountry);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCountry = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCountry) {
      return res.status(404).json({ error: 'Country not found' });
    }

    res.json(updatedCountry);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    // Check if the country is referenced by any state
    const stateWithCountry = await State.findOne({ country_id: req.params.id });
    if (stateWithCountry) {
      return res.status(400).json({ error: "Country is referenced by a state and cannot be deleted" });
    }

    const deletedCountry = await Country.findByIdAndRemove(req.params.id);
    if (!deletedCountry) {
      return res.status(404).json({ error: 'Country not found' });
    }
    res.json(deletedCountry);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
