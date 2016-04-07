var amqp = require('amqplib/callback_api')
var EventEmitter = require('events').EventEmitter
var config = require('../config/config');
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

EmailService.prototype.close = function() {
  this.removeAllListeners();
  if (conn) {
    conn.close();
  }
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
  			};

        self.ch = ch;
        ch.on("error", function(err) { console.error(err)});
        send_to_queue(self.ch, email_queue, customer.email)
      })
    }
}

EmailService.prototype.process = function(queuename, onMessage) {
  var self = this;
  self.conn.createChannel(function(err, ch) {
    if (err) {
      return console.error(err);
  }

  ch.on("error", function(err) { console.error(" channel error", err)} );
  ch.on('close', function() { console.log(" channel closed")});

  var work= function(msg) {
    pay_load = JSON.parse(msg.content.toString());
    onMessage(pay_load);
    ch.ack(msg) ;
  }

  ch.prefetch(10);
  ch.assertQueue(queuename, { durable: true }, function (err, _ok) {
      if (err) {
        return console.log(err);
      }
      ch.consume(queuename, work, { noAck: false })
  })
})}

function send_to_queue(ch, q_name, content) {
    ch.publish('', q_name, new Buffer(content), { persistent: true },
    	function (err, ok) {
    		if (err) {
    			console.error("[AMQP] publish ", err);
        		pubChannel.connection.close();
    		}
    })
}


module.exports = EmailService;




