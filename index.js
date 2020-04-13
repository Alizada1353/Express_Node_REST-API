const Joi = require("@hapi/joi");
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000;

const users = [
  { id: 1, name: "John Doe", job: "Manager" },
  { id: 2, name: "Alex Brand", job: "Business analyst" },
  { id: 3, name: "Mary Luther", job: "Security advisor" },
];

app.get('/', (req, res) => res.send('connection established!'))

/**get all users */
app.get('/api/users', (req, res) => res.send(users))

/**add a new user */
app.post('/api/users', (req, res) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      job: Joi.string().min(3).max(30).required(),
    });
    const result = schema.validate(req.body);
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        job: req.body.job
    }
    users.push(newUser);
    res.send(newUser);
});

/**get a specific user by id */
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