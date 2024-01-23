export let recipesData = [];
let recipeList = [];

export function getRecipeList() {
    return recipeList;
}

export function setRecipeList(recipes) {
    recipeList = recipes;
}

export async function initData() {
    try {
        const response = await fetch("../data/recipes.json");
        recipesData = await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Fonction pour obtenir toutes les recettes
export function getAllRecipes() {
    return recipesData;
}

// Fonction pour récupérer une recette par son ID
export function getRecipeById(id) {
    return recipesData.find((recipe) => recipe.id === id);
}

