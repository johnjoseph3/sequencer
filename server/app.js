var express = require('express');
var app = express();


app.use(express.static('dist'));

app.listen(4000, function () {
	console.log('Example app listening on port 4000!');
});
