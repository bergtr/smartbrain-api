const express = require('express');


const app = express();
app.use(express.json());

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
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.send('success')
    } else {
        res.status(400).json('error login')
    }
})

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})