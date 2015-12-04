/**
 * Created by stephen.hand on 03/12/2015.
 */

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var sqlRunner = require('./sql-runner.js')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//This defines the URL '/api/query' as the one to handle query requests
router.post('/query', function(req, res) {
    console.log("POSTED QUERY:"+JSON.stringify(req.body));

    //This calls 'runQuery' on the sql-runner module to query the DB and get the results back in an array.
    //It expects the SQL tro be posted in the request body as an object with a 'sql' member, which is the T-SQL as a string
    sqlRunner.runQuery(req.body.sql,function(result){
        //This gets the result of the query and puts it into the response we send back to the web server as JSON
        res.json(result);
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// set up our services as running under /api
app.use('/api', router);
// set up all our static html, css, and js etc. for loading into the browser under /ui
app.use('/ui', express.static('../client'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);