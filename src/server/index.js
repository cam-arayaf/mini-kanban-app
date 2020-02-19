require('./config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('DB status: Online');
});

app.listen(process.env.PORT, () => console.log('Port:', process.env.PORT));