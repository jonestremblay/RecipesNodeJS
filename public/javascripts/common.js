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