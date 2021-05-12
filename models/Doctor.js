const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  lastName: { type: String, required: true },
  appointments: [{ type: Types.ObjectId, ref: 'Appointment' }],
});

module.exports = model('Doctor', schema);
