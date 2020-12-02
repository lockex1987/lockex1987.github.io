var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var _db;

module.exports = {
	// Connect to MongoDB
	connect: function(url, callback) {
		MongoClient.connect(url, function(err, db) {
			_db = db;
			return callback(err);
		});
	},

	//getDb: function() { return _db; },

	// Get a collection
	colc: function(colcName) {
		return _db.collection(colcName);
	},

	// Convert plain String id to ObjectId id 
	id: function(id) {
		return new mongodb.ObjectID(id);
	}
};