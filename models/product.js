exports = module.exports = function(server, mongoose) {

	var productSchema = new mongoose.Schema({
		_id: 		{ type: Number },
		name: 		{ type: String },
		cost: 		{ type: Number },
		qty:  		{ type: Number },
		status:  	{ type: String }
	});

	mongoose.model('Product', productSchema);

};
