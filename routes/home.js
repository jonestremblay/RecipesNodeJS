/* Home Router */
const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe').Recipe

/* Get all recipes */
router.get('/', async (req, res) => {
    let recipes;
    try {
      recipes = await Recipe.find();
      // res.json(recipes);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
    res.render('home', {title: 'Mes recettes', recipes : recipes, count: recipes.length},)
  })


module.exports = router