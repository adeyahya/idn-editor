const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const ImageSchema = Schema({
  originalname: String,
  encoding: String,
  mimetype: String,
  filename: String,
  size: Number,
  palette: Object,
  source: String
});

module.exports = mongoose.model('Image', ImageSchema);
