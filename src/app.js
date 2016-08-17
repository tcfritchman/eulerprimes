var express = require('express');
var compute = require('./compute');

/* Config app */
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/pages');
app.use(express.static(__dirname + '/styles'));

/* Routes */
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/single/', function(req, res) {
  x = req.body.x;
  y = req.body.y;
  resValue = compute(x,y);
  res.render('result-single', {result: resValue});
});

/* Listen */
var port = (process.argv[2] || 8080);
app.listen(port);
console.log('Server listening on port ' + port);
