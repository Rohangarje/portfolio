const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'global_counter',
    unique: true
  },
  count: {
    type: Number,
    default: 105
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visitor', VisitorSchema);
