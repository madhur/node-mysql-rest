var restify = require('restify');
var SQL = require('./mysql.js');
var Consts = require('./consts');

function respond(req, res, next)
{
	res.send('hello ' + req.params.name);
	next();
}


var getAllUsers = function(req, res, next)
{
	SQL.getAllUsers(function(rows)
	{
		res.send(rows);
		console.log(rows);
	});

}

var getSingleUser=function(req, res, next)
{

	SQL.getSingleUser(
	{
		_id: req.params.id
	}, function(error, user)
	{
		if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

		if (user)
		{
			res.send(user)
		}
		else
		{
			res.send(404)
		}
	})

}

var getSinglePost=function(req, res, next)
{

	SQL.getSinglePost(
	{
		_id: req.params.id
	}, function(error, post)
	{
		if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

		if (post)
		{
			res.send(post)
		}
		else
		{
			res.send(404)
		}
	})

}

var getAllPosts = function(req, res, next)
{
	SQL.getAllPosts(function(rows)
	{
		res.send(rows);
		console.log(rows);
	});

}

var createPost=function(req, res, next)
{

	console.log(req.params.message);
	console.log(req.params.username);

	SQL.createPost(
	{
		message:req.params.message,
		username:req.params.username

	}, function(error)
	{
		if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
			else
		res.end("OK");

	});


}


var server = restify.createServer();
server.use(restify.bodyParser());

server.listen(8080, function()
{
	console.log('%s listening at %s', server.name, server.url);
});


//server.get('/hello/:name', respond);

server.get(Consts.Consts.USERS, getAllUsers);
server.get(Consts.Consts.POSTS, getAllPosts);
server.get('users/:id', getSingleUser);
server.get('/posts/:id', getSinglePost);
server.post('/posts', createPost);