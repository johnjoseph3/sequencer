var express = require('express');
var app = express();


app.use(express.static('public'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.sendfile(html_dir + 'contact.html')
});

app.listen(4000, function () {
	console.log('Example app listening on port 4000!');
});
