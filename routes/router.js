const Joi = require("@hapi/joi");
const express = require('express');
const router = express.Router();
const users = require('../Users');
router.use(express.json());

/**get all users */
router.get("/api/users", (req, res) => res.status(200).send(users));


/**get a specific user by id */
router.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send(`Bad Request`);
  res.status(200).send(user);
});


/**add a new user */
router.post("/api/users/", (req, res) => {
  //Calling the Validator function and getting the error using object destructuring
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    job: req.body.job,
  };
  users.push(newUser);
  res.status(200).send(newUser);
});



/**Updating a User info */
router.put("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("Not Found!");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(result.error.details[0].message);

  user.name = req.body.name;
  user.job = req.body.job;
  res.status(200).send(user);
});


/**Removing a user by id*/
router.delete("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("Not Found!");

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

module.exports = router;