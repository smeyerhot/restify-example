/**
 * Module Dependencies
 */
const config  = require('./config')
const restify = require('restify')
const mysql = require('mysql')
const redis = require('redis')


/**
 * Initialize Server
 */
const server = restify.createServer({
    name    : config.name,
    version : config.version,
    url : config.hostname
});

var connection = config.db.get;
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

/*server.get('/echo/:name', function (req, res, next) {
  res.send(req.params);
  return next();
});*/

//rest api to get all results
server.get('/employees', function (req, res) {
   connection.query('select * from employee', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single employee data
server.get('/employees/:id', function (req, res) {
   connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new record into mysql database
server.post('/employees', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO employee SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to update record into mysql database
server.put('/employees', function (req, res) {
   connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


server.get('/', function(req, res){
    console.log('Welcome Nodejs restify');
});

server.listen(3001, function () {
  console.log('%s listening at %s', server.name, server.url);
});