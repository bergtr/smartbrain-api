const express = require('express');
const { json } = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const database = {
    users: [{
            id: '123',
            name: 'anton',
            email: 'anton@cok.com',
            password: 'jancok123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'andi',
            email: 'andi@cok.com',
            password: 'kontol123',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [{
        id: '987',
        hash: '',
        email: 'anton@cok.com'
    }]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {

    // Compare stored password
    // bcrypt.compare("bacon", hash, function (err, res) {
    //     // res == true
    // });
    // bcrypt.compare("veggies", hash, function (err, res) {
    //     // res = false
    // });

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('success')
    } else {
        res.status(400).json('error login')
    }
})

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('no user found')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(404).json('no user found')
    }
})




app.listen(4000, () => {
    console.log('app is listening on port 4000')
})