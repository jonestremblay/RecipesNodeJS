const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
var $ = require('jquery')( window );
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
    var row = '<li><tr class="input-group" name="instructionRow">'
            + '<td><textarea cols="32" class="form-control instruction"  placeholder="Max 250 characters"></textarea></td>'
            + '<td><button type="button" id="deleteRow" style="margin-top: 10px;" '
            + 'class="btn btn-danger btn-sm DeleteInstrButton" >Delete</button>'
            + '</td></tr></li>'
    return row;
}

var NewIngredient = function appendNewIngredient(){
    var row  = getIngredientTableRow();
    $('#ingredientsTable').append(row);
    $("input[name='numOrDecimalonly']").on('input', function(e) {
        $(this).val($(this).val().replace(/[^0-9-.]/g, ''));
    });
}

var NewInstruction = function appendNewInstruction(){
    // var row  = getInstructionTableRow();
    var row = '<li><tr class="input-group" name="instructionRow">'
            + '<td><textarea cols="32" class="form-control instruction"  placeholder="Max 250 characters"></textarea></td>'
            + '<td><button type="button" id="deleteRow" style="margin-top: 10px;" '
            + 'class="btn btn-danger btn-sm DeleteInstrButton" >Delete</button>'
            + '</td></tr></li>'
    $('#instructionsList').append(row);
}

var Hello = function hello(){
    alert('hello')
}

module.exports = {
    NewIngredient,
    NewInstruction,
    Hello
}