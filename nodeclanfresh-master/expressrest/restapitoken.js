const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const jwtoken = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const instance = express();
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors());
const jwtObject = {
    'jwtSecret': 'xyzprq00700qrpzyx'
}

// define a varible that will contains the Token on server
// globally
let globalTokan;

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

const students = sequelize.import('./../models/students.js');
const users = sequelize.import('./../models/users.js');


//Authentication for registration of username
instance.get('/api/users/:username', (request, response) => {
    console.log(request.params.username);
    sequelize.sync({ force: false })
        .then(() => users.findByPk(request.params.username)) 
        .then((result) => {
            response.json({ statusCode: 200, rowCount: result.length, data: true });
            response.end();
        }).catch((error) => {
            response.send({ statusCode: 500, data: error });
        })
});

// post method to create user
instance.post('/api/users/register', (request, response) => {
    sequelize.sync({ force: false })
        .then(() => users.create({
            userName: request.body.UserName,
            password: request.body.Password
        })).then((result) => {
            response.json({
                statucCode: 200,
                data: `User Created Successfully ${JSON.stringify(result.toJSON())}`
            });
            response.end();
        }).catch((error) => {
            response.send({
                statucCode: 500,
                data: `Error Occured ${error}`
            });
            response.end();
        });
});


instance.set('jwtSecret', jwtObject.jwtSecret);


//  Authorize the user and generate token and Login
instance.post('/api/users/authuser', (request, response) => {
    const authValue = {
        UserName: request.body.UserName,
        Password: request.body.Password
    };
    console.log(authValue);
    
    sequelize.sync({ force: false })
        .then(() => users.findByPk(authValue.UserName))
        .then((result) => {
            console.log(JSON.stringify(result));
            if (result === null) {
                response.json({ statusCode: 401, data: `User Not Found` });
                response.end();
            } else {
                if (result.password !== authValue.Password) {
                    response.json({ statusCode: 401, data: `Un-Authenticated response Password Does not match` });
                    response.end();
                } else {
                    let accessToken = jwtoken.sign(result.toJSON(), instance.get('jwtSecret'), {
                        //expiresIn: 3600 
                    });
                    globalTokan = accessToken;
                    console.log(`Access Token ${accessToken}`);
                    response.send({
                        statusCode: 200,
                        authenticated: true,
                        data: accessToken
                    });
                    response.end();
                }
            }

        }).catch((error) => {
            response.json({ statusCode: 401, data: `User Not Found ${error}` });
            response.end();
        });
});



instance.get('/api/students', (request, response) => {
    let header = request.headers.authorization;
    // 3b read the token value
    let token = header.split(' ')[1];
    console.log(token);
    {
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
            // 3d. request failed because token verification failed
            if (err) {
                response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
                response.end();
            } else {
                request.decoded = decoded;
                sequelize.sync({ force: false })
                    .then(() => students.findAll())
                    .then((result) => {
                        response.json({ statusCode: 200, rowCount: result.length, data: result });
                        response.end();
                    }).catch((error) => {
                        response.send({ statusCode: 500, data: error });
                    });
            }
        });
    }
});

instance.get('/api/students/:id', (request, response) => {
    // read the parameter
    let id = request.params.id;
    console.log(id);
    
    // do not overwrite the models
    let header = request.headers.authorization;
    let token = header.split(' ')[1];
    {
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
            if (err) {
                response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
                response.end();
            } else {
                request.decoded = decoded;
                sequelize.sync({ force: false })
                .then(() => students.findAll({where : Sequelize.or(
                    { studentId: id },
                    { studentName: id },
                    { course: id },
                    { years: id },
                    { university: id },
                  )})) 
                .then((result) => {
                    if (result !== null) {
                        response.json({ statusCode: 200, data: result });
                        response.end();
                    } else {
                        response.json({ statusCode: 200, data: `Record not found` });
                        response.end();
                    }
                }).catch((error) => {
                    response.send({ statusCode: 500, data: error });
                })
            }
        });
    }
    
});

instance.post('/api/students', (request, response) => {
    const student = {
        studentId: parseInt(request.body.StudentId),
        studentName: request.body.StudentName,
        university: request.body.University,
        course: request.body.Course,
        years: request.body.Year,
        fees: parseInt(request.body.Fees)
    };
    console.log(`post ${JSON.stringify(student)}`);
    
    let header = request.headers.authorization;
    let token = header.split(' ')[1];
    {
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
            if (err) {
                response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
                response.end();
            } else {
                request.decoded = decoded;
                sequelize.sync({ force: false })
                .then(() => students.create(student))
                .then((result) => {
                    if (result !== null) {
                        response.json({ statusCode: 200, data: JSON.stringify(result.toJSON()) });
                        
                        response.end();
                    } else {
                        response.json({ statusCode: 200, data: `Record is not Created` });
                        response.end();
                    }
                }).catch((error) => {
                    response.send({ statusCode: 500, data: error });
                })
                
            }
        });
    }
    
});


instance.put('/api/students/', (request, response) => {
    let id = request.body.StudentId;
    const student = {
        studentId: parseInt(request.body.StudentId),
        studentName: request.body.StudentName,
        university: request.body.University,
        course: request.body.Course,
        year: request.body.Year,
        fees: parseInt(request.body.Fees)
    };
    let header = request.headers.authorization;
    let token = header.split(' ')[1];
    {
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
            if (err) {
                response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
                response.end();
            } else {
                request.decoded = decoded;
                sequelize.sync({ force: false })
                .then(() => students.update(student, { where: { studentId: id } }))
                .then((result) => {
                    if (result !== 0) {
                        response.json({ statusCode: 200, data: result.length });
                        response.end();
                    } else {
                        response.json({ statusCode: 200, data: `Record is not Updated` });
                        response.end();
                    }
                }).catch((error) => {
                    response.send({ statusCode: 500, data: error });
                })
        
            }
        });
    }
   
});

instance.delete('/api/students/:id', (request, response) => {
    // read the parameter
    let id = parseInt(request.params.id);

    let header = request.headers.authorization;
    let token = header.split(' ')[1];
    {
        jwtoken.verify(token, instance.get('jwtSecret'), (err, decoded) => {
            if (err) {
                response.send({ statusCode: 401, data: `Token Verification failed ${err}` });
                response.end();
            } else {
                request.decoded = decoded;
                sequelize.sync({ force: false })
                .then(() => students.destroy({ where: { studentId: id } }))
                .then((result) => {
                    if (result === 0) {
                        response.json({ statusCode: 200, data: 'No Record deleted' });
                        response.end();
                    } else {
                        response.json({ statusCode: 200, data: result });
                        response.end();
                    }
                }).catch((error) => {
                    response.send({ statusCode: 500, data: error });
                })
            }
        });
    }
    // do not overwrite the models
        
});


// listenting on the port
instance.listen(6070, () => {
    console.log('Server is listening on port 6070');
})















