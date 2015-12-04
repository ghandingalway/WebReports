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
        // ... error checks

        console.log("CONNECTING...");
        if (connerr){
            console.log(connerr)
        }
        // Query

        var request = new sql.Request(); // or: var request = connection.request();
        request.query(query, function(err, recordset) {
            console.log("QUERYING...");
            // ... error checks
            if (err){
                console.log(err)
            }

            console.log(recordset);
            onsuccess(recordset)
        });
    });

    console.log("RUN...");
};

exports.runQuery = runQuery;
