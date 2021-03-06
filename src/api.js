var express = require("express");
var mongoose = require("mongoose");
var config = require('../config/config');
var User = require('../model/user.js');
var bodyParser = require('body-parser');
var EmailService = require('./email_service');
var email_service = new EmailService().start();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/register', function(req, res) {
    var user = new User(req.body);
    user
    .save()
    .then(
    	function(u) {
    		email_service.send_welcome_email(u);
    		return res.json({success: true})
    	},
        function(err) {
    		return res.status(400).json({sucess: false, data: req.body, error: err})
        }
    )
});

app.get('/heartbeat', function(req, res) {
	res.send(new Date());
})


module.exports = {
	start: function () {
		app.listen(config.port, function(err) {
			if (err) {
				return console.error(err);
			}

			console.log("[API] API service start listening on port " + config.port);
		})
	}
}