var mysql = require('mysql');
var db_info = {
	host: 'localhost',
	port: '3306',
	user: 'root', // Your user
	password: '1234', // Your password
	database: 'aulim'
}

module.exports = {
	init: function (){
		return mysql.createConnection(db_info);
	},
	connect: function(conn) {
		conn.connect(function(err){
			if(err) console.error('mysql connecetion error : ' + err);
			else console.log('mysql is connected successfully');
		});
	}
}
