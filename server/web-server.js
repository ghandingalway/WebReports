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

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/query', function(req, res) {
    console.log("POSTED QUERY:"+JSON.stringify(req.body));
    sqlRunner.runQuery(req.body.sql,function(result){
        res.json(result);
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/ui', express.static('../client'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);