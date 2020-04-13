const Joi = require("@hapi/joi");
const express = require('express');
const app = express();
app.use(express.json());
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
    const user = users.find(user => user.id === parseInt(req.params.id));
    if(!user) return res.status(404).send(`Bad Request`);
    res.status(200).send(user);
});


/**add a new user */
app.post('/api/users', (req, res) => {
    //Calling the Validator function and getting the error using object destructuring
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(result.error.details[0].message);

    const newUser = { id: users.length + 1,name: req.body.name,job: req.body.job}
    users.push(newUser);
    res.status(200).send(newUser);
});



/**Updating a User info */
app.put('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Not Found!');

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
  
    user.name = req.body.name;
    user.job = req.body.job;
    res.status(200).send(user);
});


/**Removing a user by id*/
app.delete('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Not Found!');

  const index = users.indexOf(user);
  const result = users.splice(index, 1);
  res.status(200).send(result);
});


function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    job: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(user);
}

app.listen(port, () => console.log(`listening on port ${port}...`));