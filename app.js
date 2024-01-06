const express = require('express');
const userRoutes = require('./src/router/user-routes')

require('dotenv').config();

const app = express();

app.use('/api/v1' , userRoutes)

app.get('/api' , (req , res) => {
    res.status(200).send({message : 'Application is running....'});
})

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT , () => {
    console.log(`App is listening on http://localhost:${PORT}`);
})