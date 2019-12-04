/*Sources Cited: Instructor. Boilerplate Code. Week 7 - 10 Lectures. 
http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/hello-node/hello-node.html*/
/*https://github.com/TylerC10/CS290-Web-Development/tree/master/Database%20Interactions%20and%20UI*/
/*https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_date-format*/

var express = require("express");               
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require("express-handlebars").create({defaultLayout: "main"});
var mysql = require('mysql');

var pool = mysql.createPool({
   host: 'classmysql.engr.oregonstate.edu',
   user: 'cs290_bunnells',
   password: '3436',
   database: 'cs290_bunnells'
});

app.engine("handlebars", handlebars.engine);     
app.set("view engine", "handlebars");
app.set("port", 4311);                             
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workoutLog", function(err){  //my connection pool
    var createString = "CREATE TABLE workoutLog(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "reps INT," +
    "weight INT," +
    "pounds BOOLEAN," +
    "date DATE)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.get('/',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM workoutLog', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    var entry = [];
    for (var k in rows) {
      var newEntry = { 'name': rows[k].name,
                      'reps': rows[k].reps,
                      'weight': rows[k].weight,
                      'date': rows[k].date, 
                      'id': rows[k].id };
        if(rows[k].pounds){
          newEntry.pounds = 'lbs';
        } else {
          newEntry.pounds = 'kg';
        }
        entry.push(newEntry);
    }
    context.results = entry;
    res.render('home', context);
  });
});

app.get('/insert',function(req,res,next){
  var context = {};
  pool.query("INSERT INTO `workoutLog` (`name`, `reps`, `weight`, `date`, `pounds`) VALUES (?, ?, ?, ?, ?)", 
    [req.query.name,
     req.query.reps,
     req.query.weight,
     req.query.date,
     req.query.unit], 
     function(err, result){
       if(err){
         next(err);
         return;
         }
         context.inserted = "Inserted id " + result.insertId;
         res.send(JSON.stringify(context));
         //res.render('home',context);
  });
});

app.get('/delete',function(req,res,next){
  var context = {};
  pool.query("DELETE FROM `workoutLog` WHERE id=? ",
    [req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
  });
});

app.get('/editWorkout',function(req, res, next){
  var context = {};
  pool.query('SELECT * FROM `workoutLog` WHERE id=?', 
    [req.query.id], function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      var entry = [];
      for(var k in rows){                          
        var newEntry = {'name': rows[k].name, 
                        'reps': rows[k].reps, 
                        'weight': rows[k].weight, 
                        'date':rows[k].date, 
                        'lbs':rows[k].pounds,
                        'id':rows[k].id};
            entry.push(newEntry);
        }
        context.results = entry[0];  
        res.render('editWorkout', context);
    });
});

app.get('/editReturn',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM workoutLog WHERE id=?", 
  [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query("UPDATE workoutLog SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?',
        [req.query.name || curVals.name, 
         req.query.reps || curVals.reps, 
         req.query.weight || curVals.weight,
         req.query.date || curVals.date, 
         req.query.unit,
         req.query.id],
        function(err, result){
          if(err){
            next(err);
            return;
          }
        pool.query('SELECT * FROM `workouts`', function(err, rows, fields){     
          if(err){
            next(err);
            return;
          }
        var entry = [];
        for (var k in rows) {
          var newEntry = { 'name': rows[k].name,
                      'reps': rows[k].reps,
                      'weight': rows[k].weight,
                      'date': rows[k].date, 
                      'id': rows[k].id };
          if(rows[k].pounds){
            newEntry.pounds = 'lbs';
          } else {
            newEntry.pounds = 'kg';
          }
          entry.push(newEntry);
        }
        context.results = entry;
        res.render('home',context);
      });
    }
  });
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
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
