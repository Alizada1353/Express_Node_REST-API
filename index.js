const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './public')));

app.use('/', require('./routes/router'));

app.listen(port, () => console.log(`listening on port ${port}...`));