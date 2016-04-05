var morgan = require('morgan')
var mongoose = require('mongoose')
var config = require('./config/config')
var api_service = require('./src/api')

mongoose.connect(config.database, function (err) {
	if (err) {
		return console.error(err);
	} 
	console.log("Database connected ", config.database);
	api_service.start();
})

mongoose.connection.on("error", function (errorObject) {
	logger.error("[error] Database connection error ", errorObject);
})
        