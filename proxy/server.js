const express = require('express')
var proxy = require('express-http-proxy');
const port = process.env.PORT || 8080;
const app = express()

app.use('/', proxy('http://localhost:3000', {
	forwardPath: function(req, res) {
		res.setHeader('Access-Control-Allow-Origin', '*')
		console.log(req.url)
		return req.url
	}
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))