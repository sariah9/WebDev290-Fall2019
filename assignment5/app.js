/*Sources Cited: Instructor. Boilerplate Code. Week 7 Lectures. 
http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/hello-node/hello-node.html*/

var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4312);

app.get('/',function(req,res){
  var eParams = [];
  for (var key in req.query){
    eParams.push({'name':key,'value':req.query[key]})
  }
  var context = {};
  context.getData = eParams;
  context.type = 'GET';
  res.render('getForm', context);
});

app.post('/', function(req,res){
  var urlParams = [];
  for (var p in req.body){
    urlParams.push({'name':p,'value':req.body[p]})
  }
  console.log(urlParams);
  console.log(req.body);
  var context = {};
  context.postData = urlParams;
  context.type = 'POST';
  res.render('postForm', context);
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});