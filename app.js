require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/router/user-routes')
const authRoutes = require('./src/router/auth-routes')
require('./config/db_connection')
const cookieParser = require("cookie-parser")
require('./config/db.js')
const cors = require('cors');

const app = express();

// Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:8200", "http://127.0.0.1:8200"],
    credentials: true,
}));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

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