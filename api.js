var express = require("express");
var mongoose = require("mongoose");
var config = require('./config/config');
var User = require('./model/user.js')
var email_service = require('../email_service')

var app = express();

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
    		return res.status(400).json({sucess: false, error: err})
        }
    )
});