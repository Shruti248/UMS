// const mysql = require('mysql');
const mysql = require('mysql2');

const config = require('./credentials');

// // importing only the specific method which is in use 
// const {createPool} = require('mysql');

const pool = mysql.createPool(config) 

// pool.getConnection((err) => {
//     if(err){
//         console.log('Error Connecting to DB..', err);
//         return;
//     }else{
//         console.log('DB Connected...');
//     }
// })

// console.log(process.env.DB_USER);
// // Pool can be used multiple time for teh connection-- 

// module.exports = pool;

// Creating MySQL Connection 
// const dbConnection = mysql.createConnection({
//     port : process.env.DB_PORT,
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.MYSQL_DB,
//     connectionLimit : 10,
// })

// dbConnection.connect(function(err){
//     if(err){
//         throw err;
//     }

//     console.log('Database Connected..')
// })


// let sql = 'SELECT * FROM user;';

// pool.execute(sql /**sql queries */, function(err , result){
//     if(err){
//         throw err;
//     }

//     console.log(result);
// })


// module.exports = dbConnection;

// Mysql2 provides advanced features like promise & we can tehrefore wrap the code directly in async await----
module.exports = pool.promise();
// module.exports = pool;

// const mysql = require('mysql2/promise');
// const config = require('./credentials');

// let pool;

// const createPool = (() => {

//     return async function () {
//         try {
//             if (!pool) {
//                 pool = mysql.createPool(config);
//                 // console.log('Created');
//                 }
        
//                 return pool.getConnection();
//         } catch (error) {
//             console.log('Error In Creating Pool : ' + error);
//             throw error;
//         }
//     };

// })();

// async function executeQuery(sql, params){
//     const connection = await createPool();
//     try{
//         const [result] = await connection.execute(sql, params);
//         return result;
//     } catch (error){
//         console.log('Error In Executing Query : ' + error);
//         throw error;
//     } finally{
//         connection.release();
//     }
// }

// module.exports = executeQuery;
