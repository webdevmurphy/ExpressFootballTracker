const express = require('express');

let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// Set up body parser for JSON submissions
app.use(require('body-parser').urlencoded({extended: true}));


let userTracker ={};




//Start Routes:::::::::::
app.get('/', function(req, res) {

	res.render('login');
});

app.post('/login', function(req, res) {

	console.log("Username:: " + req.body.username);
	console.log("password:: " + req.body.password);

	userTracker.username = req.body.username;


	res.redirect('/player');
});

app.get('/player', function(req, res) {

	res.render('player',{userName: userTracker.username});
});

app.post('/player', function(req, res){

res.redirect('/add');
});

app.get('/add', function(req,res){

	res.render('add');
})






// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
