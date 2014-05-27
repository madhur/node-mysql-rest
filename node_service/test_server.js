var restify = require('restify');
var mysql=require('./mysql.js');
var Consts = require('./consts');

function respond(req, res, next)
{
	res.send('hello ' + req.params.name);
	next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);

server.get(Consts.Consts.USERS, getAllUsers);
server.head('/hello/:name', respond);

server.listen(8080, function()
{
	console.log('%s listening at %s', server.name, server.url);
});


