var http = require('http');
var fs = require('fs');


var express         = require("express"),
    server          = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/test', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database wiiii!');
});

// Middlewares
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(methodOverride());

// Import controllers
var models = require('./models/product')(server, mongoose); 
var ProductCtrl = require('./controllers/products');



// Routes static content
var router = express.Router();
router.route('/').get(function(req, res) { 
	var url = req.url;
	console.log('GET '+ url);
	getStaticFileContent(res, './index.html','text/html');
});

router.route('/check.html').post(function(req, res) { 
	var url = req.url;
	console.log('POST '+ url);		 
	ProductCtrl.updateProduct(req,res); 
	getStaticFileContent(res, '.'+url,'text/html');
	});

router.route('/*.html').get(function(req, res) { 
	var url = req.url;
	console.log('GET '+ url);
	getStaticFileContent(res, '.'+url,'text/html');
});


router.route('/img/*').get(function(req, res) { 
	var url = req.url;
	console.log('GET '+ url);
	getStaticFileContent(res, '.'+url,'text/png');
});

router.route('/css/*').get(function(req, res) { 
	var url = req.url;
	console.log('GET '+ url);
	getStaticFileContent(res, '.'+url,'text/css');
});


router.route('/js/*').get(function(req, res) { 
	var url = req.url;
	console.log('GET '+ url);
	getStaticFileContent(res, '.'+url,'text/javascript');
});

server.use(router);

// API routes
var products = express.Router();

products.route('/products')
  .get(ProductCtrl.findAllProducts);

products.route('/products/:id')
  .get(ProductCtrl.findById);


server.use('/api', products);


// Start server
server.listen(8000, function() { 
  console.log("Node server running on http://localhost:8000");
});



function getStaticFileContent(response, filepath, contentType) {
    fs.readFile(filepath, function(error, data){
        if(error) {
            response.writeHead(500,{'Content-Type':'text/plain'});
            response.end('500 - Internal Server Error');
    }
    if(data) {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
            else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
    });
}

