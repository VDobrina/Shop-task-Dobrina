var mongoose = require('mongoose');
var Product  = mongoose.model('Product'); 



//GET - Return all products in the DB
exports.findAllProducts = function(req, res) {
	Product.find(function(err, products) {
    if(err) res.send(500, err.message);

    console.log('GET /api/products') 
		res.status(200).jsonp(products);
	});
};

//GET - Return a product with specified ID
exports.findById = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
    if(err) return res.send(500, err.message);

    console.log('GET /api/product/' + req.params.id); 
		res.status(200).jsonp(product);
	});
};

//POST - Insert a new qty in the DB
exports.addProduct = function(req, res) {
	console.log('POST');
	console.log(req.body);							

	var qty = new Qty({
		qty:  req.body.qty
	});


	qty.save(function(err, product) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(product);
	});
};


//PUT - Update a qty already exists   
exports.updateProduct = function(req, res) {
	Product.findById(req.params.id, function(err, product) {
		product.qty = req.body.qty;

		
		qty.save(function(err) {								
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(product);
		});
	});
};
																
		




 

