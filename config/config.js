module.exports = {
	port:  process.env.PORT || 3000,
	database: process.env.DATABASE || "mongodb://db/app",
	rabbit_url: process.env.RABBIT || "amqp://mq",
	email: {
		service: process.env.EMAIL_SERVICE || 'Gmail',
		user: process.env.EMAIL_USER || 'example@gmail.com',
		pass: process.env.EMAIL_PASS || 'example_password'
	}
}