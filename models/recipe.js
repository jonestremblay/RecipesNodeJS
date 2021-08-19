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
const instructionSchema = new Schema({
    instruction : {
        type : String,
        required: false,
    }
});

const recipeSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    portions : {
        type: Number,
        required : true
    }, 
    tempsPreparation : {
        type: Number,
        required : true
    }, 
    tempsCuisson : {
        type: Number,
        required : true
    },
    source : {
        type : String,
        required : false
    },
    ingredients: [ingredientSchema],
    instructions : [instructionSchema],
    recipeImage : {
        type : String,
        required : false
    }
});

var Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = { Recipe }