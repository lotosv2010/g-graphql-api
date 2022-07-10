const mongoose = require('mongoose');
const baseModel = require('./base');

const Schema = mongoose.Schema;
const TagSchema = new Schema({
  ...baseModel,
  tags: {
    type: Array,
    required: true
  }
});

module.exports = TagSchema;