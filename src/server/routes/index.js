const express = require('express');
const app = express();

app.use(require('./../routes/boards'));
app.use(require('./../routes/notes'));

module.exports = app;