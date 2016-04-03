module.exports = {
	port:  process.env.PORT || 3000,
	database: process.env.DATABASE || "mongodb://db/app",
	rabbit_url: process.env.RABBIT || "amqp://mq"
}