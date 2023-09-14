// models/city.js
const mongoose = require('mongoose');


const CitySchema = mongoose.Schema({
    city_id: { type: String, required: true },
    city_name: { type: String, required: true },
    city_code: { type: String },
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'State' },
    district_id: { type:mongoose.Schema.Types.ObjectId, ref: 'District' },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});
CitySchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) { 
        this.created_at = now;
    }
    next();
});


module.exports = mongoose.model('City', CitySchema);
