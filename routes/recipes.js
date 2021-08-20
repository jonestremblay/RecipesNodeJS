let fs = require('fs')
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe').Recipe
const Upload = require("../middleware/upload").upload;
const RoutesFunctions = require("../public/javascripts/routesFunctions.js");

/* Get page to create a recipe */
router.get('/new', (req, res) => {
    res.render('newRecipe', {title: 'Nouvelle recette', mode: "create"})
})

/* Create a recipe */
router.post('/new', Upload.single('recipeImage'), async (req, res) => {
  var filePath;
  if (!req.file){
    filePath = "/images/recipe.jpg"
  } else {
    filePath = req.file.path
  }
  let ingredients = await req.body.valueOfIngredients.split(',');
  let instructions = await req.body.valueOfInstructions.split(',');

  let ingredientsArray = RoutesFunctions.GetIngredientsArray(ingredients)
  let instructionsArray = RoutesFunctions.GetInstructionsArray(instructions)
  let addedRecipe;

  filePath = filePath.replace('public', '')
  var newRecipe = new Recipe({
    name : req.body.recipeName,
    portions : req.body.valueOfPortions,
    tempsPreparation : req.body.tempsPrep,
    tempsCuisson : req.body.tempsCook,
    source : req.body.source,
    ingredients : ingredientsArray,
    instructions : instructionsArray,
    recipeImage : filePath
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
router.get('/delete/', async (req, res) => {
  var recipeId = req.query.id;
  var recipe = await Recipe.findById(recipeId)
  var imagePathToDelete = recipe.recipeImage
  console.log("default image : " + imagePathToDelete)
  /* Delete the recipeImage in the storage */
  if (imagePathToDelete != "/images/recipe.jpg"){
    if (fs.existsSync(imagePathToDelete)) {
      console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
      fs.unlink(imagePathToDelete, (err) => {
        console.log(err);
      });
    }
  }
  /* Delete in the DB */
  await Recipe.deleteOne({ _id: recipeId }, function (err) {
    if (err) return handleError(err);
  });
  res.redirect("/")
})

/* Get EditRecipe page */
router.get('/edit/', async (req, res) => {
  var recipeId = req.query.id;
  var recipe = await Recipe.findById(recipeId)
  var portionsArray = await getPortionsArray(recipe.portions)
  res.render('editRecipe', {title: 'Modification de ' + recipe.name, recipe : recipe, 
                            mode: "edit", portion : portionsArray})
})

/* Edit one recipe */
router.post('/edit/', Upload.single('recipeImage'), async (req, res) => {
  var filePath;
  var imageChanged = false;
  if (!req.file){
    filePath = req.body.originalRecipeImage
  } else if (req.body.newImageSwitch === "unchecked"){
    filePath = req.body.originalRecipeImage
  } else {
    imageChanged = true;
    filePath = req.file.path
  }
  let ingredients = await req.body.valueOfIngredients.split(',');
  let instructions = await req.body.valueOfInstructions.split(',');
  let ingredientsArray = RoutesFunctions.GetIngredientsArray(ingredients)
  let instructionsArray = RoutesFunctions.GetInstructionsArray(instructions)
  let updatedRecipe;
  
  try {
    updatedRecipe = await Recipe.updateOne(
      { _id : req.body.recipeId  },
      {
        $set: {
          name : req.body.recipeName,
          portions : req.body.valueOfPortions,
          tempsPreparation : req.body.tempsPrep,
          tempsCuisson : req.body.tempsCook,
          source : req.body.source,
          ingredients : ingredientsArray,
          instructions : instructionsArray,
          recipeImage : filePath
        }
      }
    )
    console.log("Image changed : " + imageChanged)
    if(imageChanged){
      var oldImagePathToDelete = req.body.originalRecipeImage
      console.log(oldImagePathToDelete)
      /* Delete the old recipeImage in the storage */
      if (fs.existsSync(oldImagePathToDelete)) {
        fs.unlink(oldImagePathToDelete, (err) => {
          console.log(err);
        });
      } else {
        console.log("DOESNT EXIST")
      }
    }
  } catch (err){
      res.status(400).json({message : err.message})
  }
  res.redirect("/")
})


module.exports = router