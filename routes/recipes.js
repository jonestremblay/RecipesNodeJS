const express = require('express')
const router = express.Router()

/* Get all recipes */
router.get('/', (req, res) => {
  res.render('recipes', {title: 'Recipes'})
})

/* Get page to create a recipe */
router.get('/new', (req, res) => {
    res.render('newRecipe', {title: 'New recipe'})
})

/* Create a recipe */
router.post('/new', (req, res) => {
  let ingredients = req.body.valueOfIngredients.split(',');
  let instructions = req.body.valueOfInstructions.split(',');
  /* let ingredients = req.body.ingredients;
  let instructions = req.body.instructions; */
  var recipe = {
    "recipeName" : req.body.recipeName,
    "portions" : req.body.valueOfPortions,
    "tempsPrep" : req.body.tempsPrep,
    "tempsCook": req.body.tempsCook,
    "source": req.body.source,
    "ingredients": [],
    "instructions": []
  };
  console.log("Ingredients : " + ingredients)
  console.log("Instructions :" + instructions)

  for (let i in ingredients){
    recipe.ingredients.push(ingredients[i])
  }
  for (let i in instructions){
    recipe.instructions.push(instructions[i])
  }
   res.send(recipe)
})

/* Get one recipe */
router.get('/:recipeId', (req, res) => {
    
})

/* Delete one recipe */
router.delete('/:recipeId', (req, res) => {
    
})

/* Edit one recipe */
router.put('/:recipeId', (req, res) => {
    
})



module.exports = router