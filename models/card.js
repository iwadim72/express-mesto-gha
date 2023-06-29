const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  link: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    default: [],
    type: Array,
    ref: 'user',
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
