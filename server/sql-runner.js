//load the mssql module which has the code to connect to SQL server and run queries
var sql = require('mssql');


var config = {
    user: 'sa',
    password: 'test_1234',

    // SQL Server installation
    server: 'DIDDYKONG\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
    // Database to query
    database: 'AdventureWorks2014',
    options:{
        instanceName:'SQLEXPRESS'
    }

};
sql.on('error', function(err) {
    // general error handler, this logs any errors not caught elsewhere
    console.log(err)
});
runQuery= function(query, onsuccess){
    console.log("RUNNING "+query);
    sql.connect(config, function(connerr) {
        //callback that is run when a connection has been successfully made to the DB

        console.log("CONNECTING...");
        if (connerr){
            //if there is an error in the connection, log the error to the console and quit
            console.log(connerr)
        }
        // Query

        var request = new sql.Request(); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            //callback that is run when results come back from a query
            console.log("QUERYING...");
            // ... error checks
            if (err){
                //if there is an error in the request. log the error to the console and quit
                console.log(err)
                return;
            }

            console.log(recordset);
            onsuccess(recordset)
        });
    });
};

//the exports object is a special object that is returned by a 'require' call for this module.
//Therefore any functions that we want to call from outside need to go on the exports object.
//Here we add 'runQuery' to exports, so the web server module can call it to run SQL queries when requested to.
exports.runQuery = runQuery;
