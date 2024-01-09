require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/router/user-routes')
const authRoutes = require('./src/router/auth-routes')
require('./config/db_config')
const cookieParser = require("cookie-parser")

const app = express();

// Middleware 
app.use(express.json());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1' , userRoutes);
app.use('/api/v1', authRoutes);

// app.get('/api' , (req , res) => {
//     res.status(200).send({message : 'Application is running....'});
// })

// Global ERROR Handler 
app.use((err, req, res, next) => {
    console.log(err.stack)
    console.log(err.name)
    console.log(err.code)

    res.status(500).json({
        message: "Something Went Wrong.."
    })
})

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
})