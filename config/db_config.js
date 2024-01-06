const mysql = require('mysql');

// // importing only the specific method which is in use 
// const {createPool} = require('mysql');

// const pool = createPool({
//     port : process.env.DB_PORT,
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.MYSQL_DB,
//     connectionLimit : 10,
// }) 

// // Pool can be used multiple time for teh connection-- 

// module.exports = pool;

// Creating MySQL Connection 
const dbConnection = mysql.createConnection({
    port : process.env.DB_PORT,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.MYSQL_DB,
    connectionLimit : 10,
})

dbConnection.connect(function(err){
    if(err){
        throw err;
    }

    console.log('Database Connected..')
})

module.exports = dbConnection;