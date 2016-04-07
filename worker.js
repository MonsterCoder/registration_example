var config = require('./config/config')
var util = require('util')
var nodemailer = require('nodemailer');

var EmailService = require('./src/email_service')

function onMessage(data) {
    var email_address = data;
    console.log(email_address);
    
    var transporter = nodemailer.createTransport( {
        service: config.email.service ,
        auth: {
            user: config.email.user, // Your email id
            pass: config.email.pass  // Your password
        }
    });

    var mailOptions = {
        from: config.email.from, 
        to: email_address, 
        subject: 'Welcome from your app', 
        html: '<b>Hello world ✔</b>' 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });
}

function handleError()  {
    this.close();
    setTimeout( function() {
        processor = start_worker();
    }
    , 10000)
}

function start_worker() {
    var emailProcessor = new EmailService();
    emailProcessor.once('error', handleError.bind(emailProcessor))
    emailProcessor.once('connect', (function() {
            this.process('email', onMessage)
        })
        .bind(emailProcessor) 
    )

    return emailProcessor.start();
}


var processor = start_worker();

    

