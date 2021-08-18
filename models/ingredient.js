const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name : {
        type : String,
        required: false,
    },
    quantity : {
        type : String,
        required: false,
    }
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = { Ingredient }
