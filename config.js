'use strict'

var mysql = require('mysql');

module.exports = {
    name: 'rest-api',
    hostname : 'http://ebtest-env.eba-pjdin53p.us-west-2.elasticbeanstalk.com',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        get : mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'test1'
		})
    }
}