var config = require('./config/config')
var fs= require "fs"
var util = require('util')

var EmailProcessor = require('./src/email_service')

var onConnect = () -> this.process('email', onMessage)

function onMessage(data) {

}

function handleError()  {
    this.close();
    setTimeout( function() {
        processor = start();
    }
    , 10000)
}

function start() {
    var emailProcessor =new EmailProcessor();
    emailProcessor.once('error', handleError.bind(emailProcessor))
    emailProcessor.once('connect', onConnect.bind(emailProcessor))

    emailProcessor.start();
    return emailProcessor;
}


var processor = start();

    

