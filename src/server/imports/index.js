const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const app = express();

module.exports = {
    bodyParser,
    mongoose,
    uniqueValidator,
    app
}