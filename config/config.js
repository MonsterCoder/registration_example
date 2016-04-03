module.exports = {
	port:  process.env.PORT || 3000,
	database: process.env.MONGO_ADDR,
	rabbit_url: process.env.RABBIT_HOST
}