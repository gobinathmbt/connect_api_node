// controllers/districtController.js
const { validationResult } = require('express-validator');
const Country = require('../models/countryModel');
const State = require('../models/stateModel');
const District = require ('../models/districtModel');
const City = require('../models/cityModel');
// Get all districts
exports.getAllDistricts = async (req, res) => {
    try {
        const districts = await District.find({});
        res.json(districts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};   

// Create a new district      
exports.createDistrict = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the referenced country and state exist
        const country = await Country.findById(req.body.country_id);
        const state = await State.findById(req.body.state_id);
        if (!country || !state) {
            return res.status(404).json({ error: 'Country or State not found' });
        }

        const newDistrict = new District(req.body);
        const savedDistrict = await newDistrict.save();
        res.json(savedDistrict);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a district by ID
exports.updateDistrict = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the referenced country and state exist
        if (req.body.country_id) {
            const country = await Country.findById(req.body.country_id);
            if (!country) {
                return res.status(404).json({ error: 'Country not found' });
            }
        }
        if (req.body.state_id) {
            const state = await State.findById(req.body.state_id);
            if (!state) {
                return res.status(404).json({ error: 'State not found' });
            }
        }

        const updatedDistrict = await District.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedDistrict) {
            return res.status(404).json({ error: 'District not found' });
        }

        res.json(updatedDistrict);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a district by ID
exports.deleteDistrict = async (req, res) => {
    try {
        const CityWithDistrict  = await City.findOne({ district_id: req.params.id });
        if (CityWithDistrict) {
          return res.status(400).json({ error: "District is referenced by a city and cannot be deleted" });
        }
    
        const deletedDistrict = await District.findByIdAndRemove(req.params.id);
        if (!deletedDistrict) {
          return res.status(404).json({ error: 'State not found' });
        }
        res.json(deletedDistrict);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
