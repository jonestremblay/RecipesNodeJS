const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe').Recipe
const Ingredient = require('../models/ingredient').Ingredient
const Instruction = require('../models/instruction').Instruction


/* Get page to create a recipe */
router.get('/new', (req, res) => {
    res.render('newRecipe', {title: 'New recipe'})
})

/* Create a recipe */
router.post('/new', async (req, res) => {
  let ingredients = await req.body.valueOfIngredients.split(',');
  let instructions = await req.body.valueOfInstructions.split(',');

  let ingredientsArray = createAndGetIngredientsArray(ingredients)
  let instructionsArray = createAndGetInstructionsArray(instructions)
  let addedRecipe;

  var newRecipe = new Recipe({
    name : req.body.recipeName,
    portions : req.body.valueOfPortions,
    tempsPreparation : req.body.tempsPrep,
    tempsCuisson : req.body.tempsCook,
    source : req.body.source,
    ingredients : ingredientsArray,
    instructions : instructionsArray

  });
  try {
    addedRecipe = await newRecipe.save()
  } catch (err){
      res.status(400).json({message : err.message})
  }
  res.redirect("/")
})

/* Get one recipe */
router.get('/find/', async (req, res) => {
  var recipeId = req.query.id;
  var recipe = await Recipe.findById(recipeId)
  res.render("recipe", {title: recipe.name, recipe :recipe},)
})

/* Delete one recipe */
router.delete('/delete/:recipeId', (req, res) => {
    
})

/* Edit one recipe */
router.put('/edit/:recipeId', (req, res) => {
    
})

function createAndGetIngredientsArray(ingredientsFromRequest){
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

function createAndGetInstructionsArray(instructionsFromRequest){
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