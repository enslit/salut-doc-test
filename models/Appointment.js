const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  patient: { type: String, required: true },
  date: { type: Date, required: true, min: new Date() },
  doctor: { type: Types.ObjectId, ref: 'Doctor', required: true },
  complaints: { type: String, default: null },
});

module.exports = model('Appointment', schema);
