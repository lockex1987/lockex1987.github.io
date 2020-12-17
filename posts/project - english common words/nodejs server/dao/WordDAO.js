const COLC_NAME = "words";

var mg = require('../utils/mongoUtil');

module.exports = {
	// Insert new word
	insert: function(obj, callback) {  
		mg.colc(COLC_NAME).insert(obj, function(err, doc) {
			callback(doc);
		});
	},

	// Update old word
	update: function(id, obj, callback) {
		mg.colc(COLC_NAME).update({ _id: mg.id(id) }, obj, function(err, result) {
			callback(result);
		});
	},
	
	// Delete a word (by it's ID)
	delete: function(id, callback) {
		mg.colc(COLC_NAME).remove({ _id: mg.id(id) }, function(err, result) {
			callback(result);
		});
	},

	// Search by word (return multiple documents)
	searchByWord: function(text, callback) {
		mg.colc(COLC_NAME).find({ word: { $regex: "^" + text } }, { word: true }).toArray(function(err, docs) {
			callback(docs);
		});
	},
	
	// Find by word (return only one single document)
	findByWord: function(text, callback) {
		mg.colc(COLC_NAME).findOne({ word: { $regex: "^" + text } }, function(err, doc) {
			callback(doc);
		});
	},
	
	// Find by ID
	findById: function(id, callback) {
		mg.colc(COLC_NAME).findOne({ _id: mg.id(id) }, function(err, doc) {
			callback(doc);
		});
	}
};
