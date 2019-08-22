const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            joined: new Date(),
            entries: 0
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'cakes',
            joined: new Date(),
            entries: 0
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('succes');
        } else {
            res.status(400).json('error logging in');
        }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    database.users.push({            
    id: '125',
    name: name,
    email: email,
    password: password,
    joined: new Date(),
    entries: 0
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found === true
          return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json("no such user");
    }
})

app.listen(3000, () => {
    console.log("App running on port 3000");
})
