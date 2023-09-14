// models/Country.js
const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    country_id: { type: String, required: true },
    country_name: { type: String, required: true },
    country_code: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});
CountrySchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});



const Country = mongoose.model('Country', CountrySchema);

module.exports = Country;