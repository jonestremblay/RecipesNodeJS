/* This variable is changing during runtime */
var groupNumber = 0;

function getIngredientTableRow(){
    var groupNum = groupNumber + 1; 
    groupNumber = groupNum;
    var row = '<tr class="input-group"><td><span class="input-group-text">Ingrédient</span>'
            + '<input type="text" class="form-control ingredientName" placeholder="Nom" required>'
            + '<button type="button" id="deleteRow" style="margin-top: 10px;" class="btn btn-danger btn-sm DeleteButton"'
            + '>Delete</button></td><td>'
            + '<span class="input-group-text">Quantity</span>'
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
            + '<td><textarea cols="32" class="form-control instruction"  placeholder="Max 250 characters"></textarea></td>'
            + '<td><button type="button" id="deleteRow" style="margin-top: 10px;" '
            + 'class="btn btn-danger btn-sm DeleteInstrButton" >Delete</button>'
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
    $("#portionsPicker").on("click", ".btn-check", function() {
        let radioClicked = $('#newRecipeForm input[name=portionsRadios]:checked').val();
        console.log('clicked -> ' + radioClicked);
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

function removeRow(row){
    $(row).remove();
}

function createRecipe(){
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
        $("#recipeImageInput").show()
    } else {
        $("#recipeImageInput").hide()
        
    }
});

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

/* This variable is changing during runtime */
var groupNumberForEdit = 0;

function createIngredient(){
    var groupNum = groupNumberForEdit + 1; 
    groupNumberForEdit = groupNum;
    var row = '<tr class="input-group"><td><span class="input-group-text">Ingrédient</span>'
            + '<input type="text" class="form-control ingredientName" placeholder="Nom" required>'
            + '<button type="button" id="deleteRow" style="margin-top: 10px;" class="btn btn-danger btn-sm DeleteButton"'
            + '>Delete</button></td><td>'
            + '<span class="input-group-text">Quantity</span>'
            + '<input type="text" class="form-control ingredientQuantity" name="numOrDecimalonly"  required>'
            + '<div id="unitOfMeasurePicker" class="btn-group unitOfMeasureGroupButton" role="group" aria-label="Basic radio toggle button group">'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNumberForEdit 
                                        + '" id="gram_' + groupNumberForEdit + '" value="gr" autocomplete="off">'
            + '<label class="btn btn-secondary" for="gram_' + groupNumberForEdit + '" checked>gr</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNumberForEdit 
                                        + '" id="kilogram_' + groupNumberForEdit + '" value="kg" autocomplete="off">'
            + '<label class="btn btn-secondary" for="kilogram_' + groupNumberForEdit + '">kg</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNumberForEdit 
                                        + '" id="millilitre_' + groupNumberForEdit + '" value="mL" autocomplete="off">'
            + '<label class="btn btn-secondary" for="millilitre_' + groupNumberForEdit + '">mL</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNumberForEdit 
                                        + '" id="litre_' + groupNumberForEdit + '" value="L" autocomplete="off">'
            + '<label class="btn btn-secondary" for="litre_' + groupNumberForEdit + '">L</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNumberForEdit 
                                        + '" id="ounce_' + groupNumberForEdit + '" value="oz" autocomplete="off">'
            + '<label class="btn btn-secondary" for="ounce_' + groupNumberForEdit + '">oz</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNumberForEdit 
                                        + '" id="teaspoon_' + groupNumberForEdit + '"  value="tsp" autocomplete="off">'
            + '<label class="btn btn-secondary" for="teaspoon_' + groupNumberForEdit + '">tsp</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNumberForEdit 
                                        + '" id="tablespoon_' + groupNumberForEdit + '" value="tbsp" autocomplete="off">'
            + '<label class="btn btn-secondary" for="tablespoon_' + groupNumberForEdit + '">tbsp</label></div></td></tr>';

            
    return row;
}

function createInstruction(instruction){
    var row = '<li><tr class="input-group" name="instructionRow">'
            + '<td><textarea cols="32" class="form-control instruction" value="' + instruction + '" ' 
            + 'placeholder="Max 250 characters"></textarea></td>'
            + '<td><button type="button" id="deleteRow" style="margin-top: 10px;" '
            + 'class="btn btn-danger btn-sm DeleteInstrButton" >Delete</button>'
            + '</td></tr></li>'
    return row;
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



