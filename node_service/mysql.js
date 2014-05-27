var mysql = require('mysql');
var Consts = require('./consts');

console.log(typeof Consts.DbConstants);



module.exports = {



	getAllUsers: function()
	{

		connection.connect();

		connection.query('SELECT * from  users', function(err, rows, fields)
		{
			if (err) throw err;

			console.log('The solution is: ', rows[0].username);

			return rows;
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

	return connction;

}