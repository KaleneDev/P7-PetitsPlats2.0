import recipes from "../data/recipes.js";

let recipesData = [];

export function initData() {
    recipesData = recipes;
}
// Fonction pour obtenir toutes les recettes
export async function getAllRecipes() {
    return recipesData;
}

// Fonction pour récupérer une recette par son ID
export function getRecipeById(id) {
    return recipesData.find((recipe) => recipe.id === id);
}
