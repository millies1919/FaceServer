const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Niyrtxqo19',
        database: 'facerecog'
    }
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send(database.users);
  })
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, postgres, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt ) });
app.get('/profile/:id', (res, req) => { profile.handleProfileGet(req, res, postgres) });
app.put('/image', (req, res) => { image.handleImage(req, res, postgres) });

app.listen(3000, () => {
    console.log("App running on port 3000");
})
