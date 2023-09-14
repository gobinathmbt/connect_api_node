// controllers/stateController.js
const { validationResult } = require('express-validator');
const State = require('../models/stateModel');
const Country = require('../models/countryModel');
const District = require ('../models/districtModel');
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find({});
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createState = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if the referenced country exists
    const country = await Country.findById(req.body.country_id);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }

    const newState = new State(req.body);
    const savedState = await newState.save();
    res.json(savedState);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateState = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if the referenced country exists
    if (req.body.country_id) {
      const country = await Country.findById(req.body.country_id);
      if (!country) {
        return res.status(404).json({ error: 'Country not found' });
      }
    }

    const updatedState = await State.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedState) {
      return res.status(404).json({ error: 'State not found' });
    }

    res.json(updatedState);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const DistrictWithState = await District.findOne({ state_id: req.params.id });
    if (DistrictWithState) {
      return res.status(400).json({ error: "State is referenced by a district and cannot be deleted" });
    }

    const deletedState = await State.findByIdAndRemove(req.params.id);
    if (!deletedState) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json(deletedState);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
