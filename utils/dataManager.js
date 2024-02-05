let recipeListAll = [];
let recipeList = [];

export async function initData() {
    try {
        const response = await fetch("../data/recipes.json");
        let recipesData = await response.json();
        recipeListAll = recipesData;
        setRecipeList(recipesData);
    } catch (error) {
        console.error(error);
    }
}

export function getRecipeList() {
    return recipeList;
}

export function setRecipeList(recipes) {
    recipeList = recipes;
}

export function getAllRecipes() {
    return recipeListAll;
}

// Fonction pour récupérer une recette par son ID
export function getRecipeById(id) {
    return setRecipeList(recipesData).find((recipe) => recipe.id === id);
}

