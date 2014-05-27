var mysql = require('mysql');
var Consts = require('./consts');



module.exports = {

	getAllUsers: function(callback)
	{

		var connection = connect();

		connection.query('SELECT * from  users', function(err, rows, fields)
		{
			if (err) throw err;
			callback(rows);
		});

		connection.end();
	},

	getSingleUser: function(data, callback)
	{

		var connection = connect();

		connection.query('SELECT * from  users where username = "' + data._id + '"', function(err, rows, fields)
		{
			if (err)
			{
				callback(err, null);
				return;
			}

			callback(null, rows);
		});

		connection.end();

	},

	getSinglePost: function(data, callback)
	{

		var connection = connect();

		connection.query('SELECT * from  Post where id = "' + data._id + '"', function(err, rows, fields)
		{
			if (err)
			{
				callback(err, null);
				return;
			}

			callback(null, rows);
		});

		connection.end();

	},

	getAllPosts: function(callback)
	{

		var connection = connect();

		connection.query('SELECT * from  Post', function(err, rows, fields)
		{
			if (err) throw err;



			callback(rows);
		});

		connection.end();
	},

	createPost: function(data, callback)
	{


		var connection = connect();

		var query='insert into Post values(0, curdate(),"' + data.message + '","' + data.username + '")';
		console.log(query);
		connection.query(query, function(err, rows, fields)
		{
			if (err)console.log(err);

			callback();
		});

		connection.end();



	}



};

var connect = function()
{

	var connection = mysql.createConnection(
	{
		host: Consts.DbConstants.HOSTNAME,
		user: Consts.DbConstants.USERNAME,
		password: Consts.DbConstants.PASSWORD,
		database: Consts.DbConstants.DATABASE
	});

	return connection;

}