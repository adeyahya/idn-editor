const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const ArticleSchema = Schema({
	data: Array
});

module.exports = mongoose.model('Article', ArticleSchema);
