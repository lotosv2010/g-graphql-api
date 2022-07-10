const mongoose = require('mongoose');
const baseModel = require('./base');

const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  following: {
    type: Boolean,
    default: false
  },
});

module.exports = ProfileSchema;