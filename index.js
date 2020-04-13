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
    if(!user) res.status(404).send(`
    <div style="text-align: center; border: 0.5px solid lightGray; border-radius: 6px;">
        <h1 style="font-size: 2rem">404</h1>
        <h1 style="color: red;">Not Found!</h1>
    </div>
    `);
    res.send(user)
});


app.listen(port, () => console.log(`listening on port ${port}...`))