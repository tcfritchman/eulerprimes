var express = require('express');
var Compute = require('./compute');

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
  var x = parseInt(req.query.x);
  var y = parseInt(req.query.y);
  if (isNaN(x) || isNaN(y)) {
    res.render('partials/error-msg', {error: 'Not a number'});
    return;
  }
  var computed;
  try {
    computed = Compute.compute(x,y);
  } catch (e) {
    res.render('partials/error-msg', {error: e.toString().split('\n')[0]});
    return;
  }
  if (computed.value === "") {
    res.render('partials/error-msg', {error: 'Value too large'});
  }
  res.render('partials/result-single', computed);
});

app.get('/multi', function(req, res) {
  var csv = req.query.csv;
  var computed;
  try {
    computed = Compute.multiCompute(csv);
  } catch (e) {
    res.render('partials/error-msg', {error: e.toString().split('\n')[0]});
    return;
  }
  res.render('partials/result-multi', {computed: computed});
});

/* Listen */
var port = (process.argv[2] || 8080);
app.listen(port);
console.log('Server listening on port ' + port);
