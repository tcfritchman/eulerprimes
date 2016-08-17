var express = require('express');
var compute = require('./compute');

/* Config app */
var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/');
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/scripts', express.static(__dirname + '/scripts'));

/* Routes */
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/single', function(req, res) {
  console.log('request recieved ' + req.query.x);
  var x = parseInt(req.query.x);
  var y = parseInt(req.query.y);
  if (isNaN(x) || isNaN(y)) {
    res.status(500).send({ error: 'Not a number' });
    return;
  }
  resValue = compute(x,y);
  res.render('partials/result-single', {result: resValue.toString()});
  console.log('response sent');
});

/* Listen */
var port = (process.argv[2] || 8080);
app.listen(port);
console.log('Server listening on port ' + port);
