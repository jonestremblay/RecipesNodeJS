const express = require('express')
const router = express.Router()

var GetPortionsArray = async function getPortionsArray (recipePortions){
    var portions = {
      portion_1 : false,  portion_2 : false, portion_3 : false,
      portion_4 : false,  portion_5 : false, portion_6 : false,
      portion_7 : false,  portion_8 : false, portion_9 : false,
      portion_10 : false,  portion_11 : false, portion_12 : false,
    }
    switch(recipePortions){
      case 1:
        portions.portion_1 = true;
        break;
      case 2:
        portions.portion_2 = true;
        break;
      case 3:
        portions.portion_3 = true;
        break;
      case 4:
        portions.portion_4 = true;
        break;
      case 5:
        portions.portion_5 = true;
        break;
      case 6:
        portions.portion_6 = true;
        break;
      case 7:
        portions.portion_7 = true;
        break;
      case 8:
        portions.portion_8 = true;
        break;
      case 9:
        portions.portion_9 = true;
        break;
      case 10:
        portions.portion_10 = true;
        break;
      case 11:
        portions.portion_11 = true;
        break;
      case 12:
        portions.portion_12 = true;
        break;
    }
    return portions;
  }
  
  var GetIngredientsArray = function createAndGetIngredientsArray(ingredientsFromRequest){
    let ingredientsArray = []
    if (ingredientsFromRequest[0] != ""){
      for (let i in ingredientsFromRequest){
        let name = ingredientsFromRequest[i].split('of')[1].trim()
        let quantity = ingredientsFromRequest[i].split('of')[0].trim()
        let ingredientObj = new Ingredient({
            name : name,
            quantity : quantity
        })
        ingredientsArray.push(ingredientObj)
      }
    }
    return ingredientsArray;
  }
  
  var GetInstructionsArray = function createAndGetInstructionsArray(instructionsFromRequest){
    let instructionsArray = []
    if (instructionsFromRequest[0] != ""){
      for (let i in instructionsFromRequest){
        let name = instructionsFromRequest[i]
        let instructionsObj = new Instruction({
            instruction : name
        })
        instructionsArray.push(instructionsObj)
      }
    }
    return instructionsArray;
  }
  
  module.exports = router


module.exports = {
    GetPortionsArray,
    GetIngredientsArray,
    GetInstructionsArray
}