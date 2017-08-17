const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	fs = require('fs'),
	path = require('path'),
	multer = require('multer'),
	Vibrant = require('node-vibrant'),
	_ = require('lodash');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// connect db
mongoose.connect('mongodb://localhost/dummy');

// setup storage
const DB_NAME = 'db.json',
	COLLECTION_NAME = 'images',
	UPLOAD_PATH = path.resolve(__dirname, 'public/uploads'),
	storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, `${UPLOAD_PATH}/`)
		},
		filename: function(req, file, cb) {
			cb(null, `${Date.now()}-${file.originalname}`)
		}
	}),
	upload = multer({ storage: storage });


let port = 8080;

let router = express.Router();
//Routing

//model
const Article = require('./server/models/article.js');
const Image = require('./server/models/image.js');

router.get('/article', (req, res, next) => {
	res.json({
		data: [
			{ type: 'image', uploading: false, gallery: false , value: 'http://i.imgur.com/3JwfYVC.jpg', removable: false },
			{ type: 'title', style: 'h1', value: '', removable: false },
			{ type: 'excerpt', value: '', removable: false },
			{ type: 'content', value: '', removable: false },
		]
	})
})

router.get('/article/:article_id', (req, res, next) => {
	Article.findById(req.params.article_id, function(err, article) {
		if (err)
			res.send(err)

		res.json(article)
	})
})

router.post('/article', (req, res, next) => {
	// db.collection('articles')
	// 	.save(req.body, (err, result) => {
	// 		if (err) res.json({error: true})

	// 		res.json(req.body)
	// 	})
})

router.put('/article/:article_id', (req, res, next) => {
	Article.findById(req.params.article_id, function(err, article) {
		if (err)
			res.json(err)

		article.data = req.body.data

		article.save(function(err) {
			if (err)
				res.json(err)

			res.json(article)
		})
	})
})

// upload single file
router.post('/image', upload.single('image'), (req, res) => {
	Vibrant.from(req.file.path).getPalette(function(err, palette) {
		let image = new Image();
		image = Object.assign(image, {
			originalname: req.file.originalname,
			encoding: req.file.encoding,
			mimetype: req.file.mimetype,
		  filename: req.file.filename,
		  size: req.file.size,
		  palette: palette
		})

		image.save(function(err) {
			if (err)
				res.send(err);

			res.json(image);
		})
	})
})

router.get('/images', function(req, res, next) {
	Image.find(function(err, images) {
		if (err)
			res.send(err);

		res.json(images);
	})
})

app.use('/api', router);

app.listen(port);
