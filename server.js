const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Niyrtxqo19',
        database: 'facerecog'
    }
});

postgres.select('*').from('users').then(data => {
    console.log(data)
})

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400).json('error logging in');
        }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    const hash = bcrypt.hashSync(password);
        postgres.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail,
                    name: name,
                    entries: 0,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
        })
        .catch(err => {
            res.status(400).json("unable to register")
        })
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    postgres.select('*').from('users').where({id: id})
    .then(user => {
    if(user.length){
        res.json(user[0])
    } else {
        res.status(404).json("no such user");
    }
  })
  .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    postgres('users').where("id", '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entires'))
})

app.listen(3000, () => {
    console.log("App running on port 3000");
})
