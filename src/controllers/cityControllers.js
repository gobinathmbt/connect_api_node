// controllers/cityController.js

const { validationResult } = require('express-validator');
const State = require('../models/stateModel');
const Country = require('../models/countryModel');
const District = require ('../models/districtModel');
const City = require('../models/cityModel');

// Get all cities
exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find({});
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new city
exports.createCity = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the referenced country, state, and district exist
        const country = await Country.findById(req.body.country_id);
        const state = await State.findById(req.body.state_id);
        const district = await District.findById(req.body.district_id);
        if (!country || !state || !district) {
            return res.status(404).json({ error: 'Country, State, or District not found' });
        }

        const newCity = new City(req.body);
        const savedCity = await newCity.save();
        res.json(savedCity);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a city by ID
exports.updateCity = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if the referenced country, state, and district exist
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
        if (req.body.district_id) {
            const district = await District.findById(req.body.district_id);
            if (!district) {
                return res.status(404).json({ error: 'District not found' });
            }
        }

        const updatedCity = await City.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedCity) {
            return res.status(404).json({ error: 'City not found' });
        }

        res.json(updatedCity);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }

        // Check if the city is assigned to any country, state, or district
        const country = await Country.findOne({ cities: city._id });
        const state = await State.findOne({ cities: city._id });
        const district = await District.findOne({ cities: city._id });
        if (country || state || district) {
            return res
                .status(400)
                .json({ error: 'City is assigned to a Country, State, or District and cannot be deleted' });
        }

        const deletedCity = await City.findByIdAndRemove(req.params.id);
        res.json(deletedCity);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
