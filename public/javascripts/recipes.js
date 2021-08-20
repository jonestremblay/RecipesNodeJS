/* This variable is changing during runtime */
var groupNumber = 0;

function getIngredientTableRow(){
    var groupNum = groupNumber + 1; 
    groupNumber = groupNum;
    var row = '<tr class="input-group"><td><span class="input-group-text">Ingrédient</span>'
            + '<input type="text" class="form-control ingredientName" placeholder="Nom" required>'
            + '<button type="button" id="deleteRow" style="margin-top: 10px;" class="btn btn-danger btn-sm DeleteButton"'
            + '>Supprimer</button></td><td>'
            + '<span class="input-group-text">Quantité</span>'
            + '<input type="text" class="form-control ingredientQuantity" name="numOrDecimalonly"  required>'
            + '<div id="unitOfMeasurePicker" class="btn-group unitOfMeasureGroupButton" role="group" aria-label="Basic radio toggle button group">'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="gram_' + groupNum + '" value="gr" autocomplete="off">'
            + '<label class="btn btn-secondary" for="gram_' + groupNum + '" checked>gr</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="kilogram_' + groupNum + '" value="kg" autocomplete="off">'
            + '<label class="btn btn-secondary" for="kilogram_' + groupNum + '">kg</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="millilitre_' + groupNum + '" value="mL" autocomplete="off">'
            + '<label class="btn btn-secondary" for="millilitre_' + groupNum + '">mL</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="litre_' + groupNum + '" value="L" autocomplete="off">'
            + '<label class="btn btn-secondary" for="litre_' + groupNum + '">L</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="ounce_' + groupNum + '" value="oz" autocomplete="off">'
            + '<label class="btn btn-secondary" for="ounce_' + groupNum + '">oz</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="teaspoon_' + groupNum + '"  value="tsp" autocomplete="off">'
            + '<label class="btn btn-secondary" for="teaspoon_' + groupNum + '">tsp</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="tablespoon_' + groupNum + '" value="tbsp" autocomplete="off">'
            + '<label class="btn btn-secondary" for="tablespoon_' + groupNum + '">tbsp</label></div></td></tr>';

            
    return row;
}

function getInstructionTableRow(){
    var row = '<li style="width: 80%;"><tr class="input-group" name="instructionRow">'
            + '<td><textarea cols="32" class="form-control instruction"  placeholder="Maximum 250 caractères"></textarea></td>'
            + '<td><button type="button" id="deleteRow" style="margin-top: 10px;" '
            + 'class="btn btn-danger btn-sm DeleteInstrButton" >Supprimer</button>'
            + '</td></tr></li>'
    return row;
}

function appendNewIngredient(){
    var row  = getIngredientTableRow();
    $('#ingredientsTable').append(row);
    $("input[name='numOrDecimalonly']").on('input', function(e) {
        $(this).val($(this).val().replace(/[^0-9-.]/g, ''));
    });
}

function appendNewInstruction(){
    var row  = getInstructionTableRow();
    $('#instructionsList').append(row);
}
$(function(){
    /* Replace any non-numbers (or non-dot) character by empty one. (Limits text to only numbers and decimal) */
    $("input[name='numOrDecimalonly']").on('input', function(e) {
        $(this).val($(this).val().replace(/[^0-9-.]/g, ''));
    });
    /* Replace any non-numbers character by empty one. (LimWits text to only numbers) */
    $("input.numonly").on('input', function(e) {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
})

$(function() {
    /* We want to do it on load ....... */
    let radioClicked = $('#newRecipeForm input[name=portionsRadios]:checked').val();
    $('#valueOfPortions').val(radioClicked)
    /* ...... but also on click event. */
    $("#portionsPicker").on("click", ".btn-check", function() {
        let radioClicked = $('#newRecipeForm input[name=portionsRadios]:checked').val();
        $('#valueOfPortions').val(radioClicked)
    });

    $("#ingredientsTable").on("click", ".DeleteButton", function() {
        groupNumber--;
        $(this).closest("tr").remove();
     });

    $("#instructionsList").on("click", ".DeleteInstrButton", function() {
        $(this).closest("li").remove();
    });

});


function createRecipe(){
    if (checkUnitsOfMeasureButtons()){
        cuteAlert({
                type: "error",
                title: "Valeurs manquantes",
                message: "Avez-vous vérifié que chaque ingrédient ait une unité de mesure séléctionée ?"
                        + "<br><br>Si vous ne voulez pas ajouter d'ingrédient(s) pour l'instant, vous n'avez "
                        + "qu'à supprimer tous les ingrédients avant de créer la recette.",
                buttonText: "C'est compris",
            });
    } else {
        $('#valueOfInstructions').val(getAllInstructions());
        $('#valueOfIngredients').val(getAllIngredients());
        $('#submitButton').trigger("click");
    }
}

function checkUnitsOfMeasureButtons(){
    let missingUnitOfMeasure = false;
    $.each($('.unitOfMeasureGroupButton '), function (){
        var self = $(this);
        var name = self.find(".unitOfMeasureRadio").attr('name');
        let radioClicked = $('#ingredientsTable input[name=' + name +']:checked').val();
        if (radioClicked == null){
            missingUnitOfMeasure = true;
            return missingUnitOfMeasure;
        }
    });
    return missingUnitOfMeasure;
}

function getAllIngredients(){
    var ingredients = [];
    $.each($("#ingredientsTable tr"),function(){
        var self=$(this);
        var ingredientName = self.find('input.ingredientName').val()
        var quantity = self.find('input.ingredientQuantity').val()
        var unitOfMeasure = self.find('input.unitOfMeasureRadio:checked').val()
        var ingredient = quantity + " " + unitOfMeasure + " of " + ingredientName;
        if (ingredientName != null && quantity != null && unitOfMeasure != null){
            ingredients.push(ingredient)
        }
     }); 
    return ingredients;
}

function getAllInstructions(){
    var instructions = [];
    $.each($("#instructionsList li"),function(){
        var self=$(this);
        var instruction = self.find("textarea").val();
        if (instruction != ""){
            instructions.push(instruction)
        }
     }); 
     return instructions;
}

/* editing a recipe */
$(function(){
    $("#recipeImageInput").hide()
})
$('#flexSwitchCheckDefault:checkbox').on('change', function(){
    if($(this).is(':checked')){
        $("#newImageSwitch").val("checked")
        $("#recipeImageInput").show()
    } else {
        $("#newImageSwitch").val("unchecked")
        $("#recipeImageInput").hide()
    }
});

function setValueOfPortions(){
    $("#portionsPicker").on("click", ".btn-check", function() {
        let radioClicked = $('#newRecipeForm input[name=portionsRadios]:checked').val();
        $('#valueOfPortions').val(radioClicked)
    });
}

function appendIngredient(){
    var row  = getIngredientTableRow();
    $('#ingredientsTable').append(row);
    $("input[name='numOrDecimalonly']").on('input', function(e) {
        $(this).val($(this).val().replace(/[^0-9-.]/g, ''));
    });
}

function appendInstruction(instruction){
    var row  = createInstruction(instruction);
    $('#instructionsList').append(row);
}


function editRecipe(){
    if (checkUnitsOfMeasureButtons()){
        cuteAlert({
                type: "error",
                title: "Missing values",
                message: "Have you checked which unit of measure you want for every ingredient ?"
                        + "<br><br>If you don't want to add ingredient(s) for now, just delete them before submitting.",
                buttonText: "Understood",
            });
    } else {
        $('#valueOfInstructions').val(getAllInstructions());
        $('#valueOfIngredients').val(getAllIngredients());
        $('#submitButton').trigger("click");
    }
}

function deleteRecipe(recipeName, recipeId){
    $.ajax({
        url: "/recipes/delete/",
        type: "GET",
        data: {
            id: recipeId
        },
        success: function (response) {
            showDeletedSuccessDialog(recipeName);
        },
        error: function (xhr) {
            showDeletedErrorDialog(recipeName, xhr);
        }
    });
}

function showDeletedSuccessDialog(recipeName){
    cuteAlert({
        type: "success",
        title: recipeName,
        message: "La recette '" + recipeName + "' a bel et bien été supprimée.",
        buttonText: "OK"
    }).then((e)=>{
        window.location.replace("/")
    })
}

function showDeletedErrorDialog(recipeName, errorMsg){
    cuteAlert({
        type: "error",
        title: "La recette '" + recipeName + "' n'a pas été supprimée.",
        message: errorMsg,
        buttonText: "OK :-("
    })
}

