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

/**establishing connection to the root app */
app.get("/", (req, res) => res.status(200).send("connection established!"));

/**get all users */
app.get("/api/users", (req, res) => res.status(200).send(users));


/**get a specific user by id */
app.get("/api/users/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if(!user) res.status(404).send(`
    <div style="text-align: center; border: 0.5px solid lightGray; border-radius: 6px;">
        <h1 style="font-size: 2rem">404</h1>
        <h1 style="color: red;">Not Found!</h1>
    </div>
    `);
    res.status(200).send(user);
});


/**add a new user */
app.post('/api/users', (req, res) => {

    //validating the request body 
    const { error } = validateUser(req.body); //Object destructuring

    if (error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        job: req.body.job
    }

    //adding the new user
    users.push(newUser);
    res.status(200).send(newUser);
});



/**Updating a User info */
app.put('/api/users/:id', (req, res) => {
    //checking if the user exists
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) res.status(404).send('Not Found!');
    //validating the request body 
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
    //Updating the user 
    user.name = req.body.name;
    user.job = req.body.job;
    res.status(200).send(user);
});

function validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      job: Joi.string().min(3).max(30).required(),
    });

    return schema.validate(user);
}

/**Removing a user by id*/
app.delete('/api/users/:id', (req, res) => {
  //checking if the user exists
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send('Not Found!');
  //removing user
  const index = users.indexOf(user);
  const result = users.splice(index, 1);
  res.status(200).send(result);
});

app.listen(port, () => console.log(`listening on port ${port}...`))