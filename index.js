const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: "John Doe", job: "Manager" },
  { id: 2, name: "Alex Brand", job: "Business analyst" },
  { id: 3, name: "Mary Luther", job: "Security advisor" },
];

app.get('/', (req, res) => res.send('connection established!'))


app.get('/api/users', (req, res) => res.send(users))


app.get("/api/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    res.send(user)
});


app.listen(port, () => console.log(`listening on port ${port}...`))