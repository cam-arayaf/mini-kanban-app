const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const required = [true, '{PATH} is required'];

const validTypes = {
    values: ['ideas', 'to-do', 'in-progress', 'done'],
    message: '{VALUE} is not a valid type'
};

const noteSchema = new mongoose.Schema({
    type: { type: String, required, enum: validTypes },
    text: { type: String, unique: true, required }
});

noteSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('Note', noteSchema);