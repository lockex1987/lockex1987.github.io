var express    = require('express');
var bodyParser = require('body-parser');

var mongoUtil = require('./utils/mongoUtil');
var config    = require('./utils/config');
var words     = require('./controller/WordCtr');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(config.STATIC_PATH));

app.use('/words', words);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
if (app.get('env') === 'development') {
	// Development error handler will print stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('<h1>' + err.message + '</h1><h2>' + err.status + '</h2><pre>' + err.stack + '</pre>');
  });
} else {
	// Production error handler no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.send('<h1>' + err.message + '</h1>');
	});
}

// Start server
mongoUtil.connect(config.DB_URL, function(err) {
  var server = app.listen(process.env.PORT || config.DEFAULT_PORT, () => {
		console.log('Listening on port ' + server.address().port);
	})
});
