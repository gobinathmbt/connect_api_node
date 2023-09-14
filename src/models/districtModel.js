// models/district.js
const mongoose = require('mongoose');


const districtSchema = mongoose.Schema({
    district_id: { type: String, required: true },
    district_name: { type: String, required: true },
    district_code: { type: String },
    country_id: { type:  mongoose.Schema.Types.ObjectId, ref: 'Country' },
    state_id: { type:  mongoose.Schema.Types.ObjectId, ref: 'State' },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});
districtSchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});



module.exports = mongoose.model('District', districtSchema);
   