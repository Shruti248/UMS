//  By appending /promise to the import statement (require('mysql2/promise')), you're specifically opting to use the version of the library that returns promises.
const  mysql = require('mysql2/promise');

const createPool = require('./db_connection');

const config = require('./credentials');

async function query(){
    config.database = '';

    let connection = await mysql.createConnection(config);

    try{

        let query = `CREATE DATABASE IF NOT EXISTS mydb`;
        
        await connection.execute(query);

        connection.end();

        config.database = 'mydb';

        connection = await mysql.createConnection(config);

        console.log('Database Created..'); 

        query = `
            CREATE TABLE IF NOT EXISTS user(
                id INT PRIMARY KEY AUTO_INCREMENT,
                role VARCHAR(30),
                firstName VARCHAR(255),
                lastName VARCHAR(255),
                email VARCHAR(255),
                password VARCHAR(255),
                profilePic VARCHAR(255),
                contactNumber VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `

        await connection.execute(query);

        console.log('Table Created..')

    }catch(err){
        console.error('Error executing query:', err);
    }finally{
        connection.end();
    }

}

// query();