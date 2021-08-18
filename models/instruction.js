const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructionSchema = new Schema({
    instruction : {
        type : String,
        required: false,
    }
});

var Instruction = mongoose.model('Instruction', instructionSchema)

module.exports = { Instruction }
