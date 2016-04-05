var amqp = require('amqplib/callback_api')
var EventEmitter = require('events').EventEmitter
var config = require('./config/config');
var email_queue = "EMAIL"
var util = require('util'); 
var offlinePubQueue = []

function EmailService() {
	EventEmitter.call(this);
}

util.inherits(EmailService, EventEmitter);

EmailService.prototype.start = function() {
	var self = this;

	amqp.connect(config.rabbit_url+"?heartbeat=60", function(err, conn) {
      conn.on('error', function (err) {
      	console.error(err);
      })

      conn.on('close', function ()  {
      	console.log("[AMQP] closed")
      })

      console.log("[AMQP] connected at "+ config.rabbit_url);
      self.conn = conn;
      self.emit("[AMQP] connected", conn);
  	});

  	return self;
}

EmailService.prototype.send_welcome_email = function(customer) {
    var self = this;

    if (self.ch) {
     	process.nextTick(function() {
     			send_to_queue(self.ch, email_queue, customer.email);
     	})
    } else {
    	self.conn.createConfirmChannel( function(err, ch) {
			if (err) {
				return console.error(err);
			}
			self.ch = ch;
			ch.on("error", function(err) { console.error(err)})
            send_to_queue(self.ch, email_queue, customer.email)
      })
    }
}

function send_to_queue(ch, q_name, content) {
    ch.publish('', q_name, new Buffer(content), { persistent: true },
    	function (err, ok) {
    		if (err) {
    			console.error("[AMQP] publish ", err);
        		pubChannel.connection.close();
    		}
    })
}

var service = new EmailService().start();

module.exports = service;



