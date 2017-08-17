const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const ImageSchema = Schema({
  originalname: String,
  encoding: String,
  mimetype: String,
  filename: String,
  size: Number,
  palette: Object
});

module.exports = mongoose.model('Image', ImageSchema);
