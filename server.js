const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

let port = 8080;

let router = express.Router();
//Routing

router.get('/post', (req, res, next) => {
	res.json({
		data: [
			{ type: 'image', uploading: false, gallery: false , value: 'http://i.imgur.com/j0t27aU.jpg', removable: false },
			{ type: 'title', style: 'h1', value: '', removable: false },
			{ type: 'excerpt', value: '', removable: false },
			{ type: 'content', value: '', removable: false },
		]
	})
})

app.use('/api', router);

app.listen(port);
