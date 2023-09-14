
const mongoose = require('mongoose');

const businessSectorSchema = mongoose.Schema({
  business_uid: { type: String, required: true },
  business_name: { type: String, required: true },
  code: { type: String, required: true },
is_active: { type: Boolean, default: true },
is_deleted: { type: Boolean, default: false },
created_at: { type: Date, required: true, default: Date.now },
updated_at: { type: Date, required: true, default: Date.now }
});

const BusinessSector = mongoose.model('BusinessSector', businessSectorSchema);

module.exports = BusinessSector;


