// models/State.js
const mongoose = require('mongoose');

const StateSchema = mongoose.Schema({
    state_id: { type: String, required: true },
    state_name: { type: String, required: true },
    state_code: { type: String },
    country_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date, required: true, default: Date.now }
});
StateSchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});





const State = mongoose.model('State', StateSchema);

module.exports = State;
