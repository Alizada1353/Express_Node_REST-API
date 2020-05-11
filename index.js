const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;



app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "html");
// app.set('view-engine', 'ejs');

app.get("/login", (req, res) => {
  res.sendFile("views/index.html", { root: __dirname });
});

app.get("/home", (req, res) => {
  res.sendFile("views/home.html", { root: __dirname });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

app.use('/', require('./routes/router'));

app.listen(port, () => console.log(`listening on port ${port}...`));
