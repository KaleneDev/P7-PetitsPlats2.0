import recipes from "../data/recipes.js";

let recipesData = [];

export function initData() {
    recipesData = recipes;
}
// Fonction pour obtenir toutes les recettes
export async function getAllRecipes() {
    return fetch('./assets/recipes.json').then(data=>data.json());
}

// Fonction pour récupérer une recette par son ID
export function getRecipeById(id) {
    return recipes.find((recipe) => recipe.id === id);
}
