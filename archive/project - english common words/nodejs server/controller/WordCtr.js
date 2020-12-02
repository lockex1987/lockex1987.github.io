var express            = require('express');
var connectMultiparty  = require('connect-multiparty');
var fs                 = require('fs');

var WordDAO = require('../dao/WordDAO');
var config  = require('../utils/config');

var router = express.Router();
var multipart = connectMultiparty();

// Use-case 1: Insert a word
router.post('/', multipart, function(req, res, next) {
	var obj;
	var wordId = req.body.wordId;
	if (wordId) {
		WordDAO.findById(wordId, function(doc) {
			obj = doc;
			setValueAndSave(wordId, obj, req, res);
		});
	} else {
		obj = {};
		setValueAndSave(wordId, obj, req, res);
	}
});

function setValueAndSave(wordId, obj, req, res) {
	// Save images
	var user = "lockex1987";
	var images = req.files.images;
	var imagesObj;
	if (obj.images) {
		imagesObj = obj.images;
	} else {
		imagesObj = [];
	}
	if (images) {
		var i;
		for (i = 0; i < images.length; i++) {
			var file = images[i];
			//console.dir(file);
			var originalFilename = file.name;
			var pathUpload       = config.STATIC_PATH + '/data/' + user + "/" + originalFilename;
			var data = fs.readFileSync(file.path);
			fs.writeFileSync(pathUpload, data);
			if (fs.existsSync(pathUpload)) {
				var j;
				var found = false;
				for (j = 0; j < imagesObj.length; j++) {
					if (imagesObj[j] == originalFilename) {
						found = true;
						break;
					}
				}
				if (!found) {
					imagesObj.push(originalFilename);	
				}
			}
		}
	}
	
	// Process meanings
	var meanings = req.body.meanings;
	var meaningArray = [];
	var a = meanings.split("\n");
	var i;
	var temp;
	for (i = 0; i < a.length; i++) {
		if (a[i].length > 0) {
			temp = a[i].trim().split(": ");
			meaningArray.push({ wordType: temp[0], meaning: temp[1] });
		}
	}
	
	// Process examples
	var examples = req.body.examples;
	var exampleArray = [];
	a = examples.split("\n");
	for (i = 0; i < a.length; i++) {
		if (a[i].length > 0) {
			exampleArray.push(a[i].trim());
		}
	}
	
	// Set value
	obj.word   = req.body.word.toLowerCase();
	obj.pronounce  = req.body.pronounce;
	obj.meanings = meaningArray;
	obj.examples = exampleArray;
	obj.images = imagesObj;
	
	// Save to DB
	if (wordId) {
		WordDAO.update(wordId, obj, function(updateResult) {
			if (updateResult) {
				res.json({ result: "success" });
			} else {
				res.json({ result: "error", message: "Cannot update database" });
			}
		});
	} else {
		WordDAO.insert(obj, function(doc) {
			if (doc) {
				res.json({ result: "success" });
			} else {
				res.json({ result: "error", message: "Cannot insert into database" });
			}
		});
	}
} 

// Use-case 2: Suggestions 
// Use-case 3: Search for one particular word
router.get('/', function(req, res, next) {
	var text = req.query.text.toLowerCase();
	var isEnter = req.query.isEnter;
	if (isEnter) {
		WordDAO.findByWord(text, function(doc) {
			res.json(doc);
		});
	} else {
		WordDAO.searchByWord(text, function(docs) {
			res.json(docs);
		});
	}
});

// Use-case 5: View a word (view)
// Use-case 4: Bind a word (update)
router.get('/:wordId', function(req, res) {
	var wordId = req.params.wordId || 0;
	//console.log("wordId in PUT: " + wordId);
	WordDAO.findById(wordId, function(doc) {
		res.json(doc);
	});
});

// Use-case 6: Delete
router.delete('/:wordId', function(req, res) {
	var wordId = req.params.wordId || 0;
	//console.log("wordId in DELETE: " + wordId);
	WordDAO.delete(wordId, function(removeResult) {
		res.json({ result: "success" });
	});
	// TODO: delete images, don't delete audio
});

module.exports = router;
