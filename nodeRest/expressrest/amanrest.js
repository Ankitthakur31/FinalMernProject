const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { Sequelize } = require('sequelize');
const instance = express();
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());
///                         "DatabaseName", "Username" , "Password"
const sequelize = new Sequelize("company", "root", "root", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        idle: 10000
    },
    define: {
        timestamps: false  
    }
});

const aman = sequelize.import('./../models/aman.js');


//Authentication for registration of username
instance.post('/api/username/:username', (request, response) => {
    sequelize.sync({ force: false })
        .then(() => aman.create(request.params.username)) 
        .then((result) => {
            response.json({ statusCode: 200, rowCount: result.length, data: "Success" });
            response.end();
        }).catch((error) => {
            response.send({ statusCode: 500, data: error });
        })
});



// listenting on the port
instance.listen(6070, () => {
    console.log('Server is listening on port 6070');
})















