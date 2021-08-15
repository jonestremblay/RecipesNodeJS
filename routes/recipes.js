const express = require('express')
const router = express.Router()

/* Get all recipes */
router.get('/', (req, res) => {
    res.send("All recipes")
})

/* Create a recipe */
router.post('/new', (req, res) => {
    
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