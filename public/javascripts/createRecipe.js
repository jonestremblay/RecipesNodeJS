/* Theses variables is changing during runtime */
var groupNumber = 0;
var stepNumber = 1;

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
            + '<label class="btn btn-outline-primary" for="gram_' + groupNum + '" checked>gr</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="kilogram_' + groupNum + '" value="kg" autocomplete="off">'
            + '<label class="btn btn-outline-primary" for="kilogram_' + groupNum + '">kg</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="millilitre_' + groupNum + '" value="mL" autocomplete="off">'
            + '<label class="btn btn-outline-primary" for="millilitre_' + groupNum + '">mL</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="litre_' + groupNum + '" value="L" autocomplete="off">'
            + '<label class="btn btn-outline-primary" for="litre_' + groupNum + '">L</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="ounce_' + groupNum + '" value="oz" autocomplete="off">'
            + '<label class="btn btn-outline-primary" for="ounce_' + groupNum + '">oz</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="teaspoon_' + groupNum + '"  value="tsp" autocomplete="off">'
            + '<label class="btn btn-outline-primary" for="teaspoon_' + groupNum + '">tsp</label>'
            + '<input type="radio" class="btn-check unitOfMeasureRadio" name="unitOfMeasureRadio_' + groupNum 
                                        + '" id="tablespoon_' + groupNum + '" value="tbsp" autocomplete="off">'
            + '<label class="btn btn-outline-primary" for="tablespoon_' + groupNum + '">tbsp</label></div></td></tr>';

            
    return row;
}

function getInstructionTableRow(){
    var stepNum = stepNumber + 1;
    stepNumber = stepNum;
    var row = '<li><tr class="input-group" name="instructionRow">'
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
    $("input[name='numonly']").on('input', function(e) {
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

