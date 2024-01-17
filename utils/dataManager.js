import { RecipeListComponent } from "../components/RecipeList.js";
let recipesData = [];
let recipesList = [];

export function getRecipesList() {
    return recipesList;
}

export function setRecipesList(list) {
    recipesList = list;
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

// Fonction pour rechercher des recettes
export function searchRecipes(searchTerm) {
    // faire un split de searchTerm
    // puis chercher sur plusieurs mots
    const data = getRecipesList().length > 0 ? getRecipesList() : recipesData;
    return data.filter(
        (recipe) =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.ingredient
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            ) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export function updateRecipeList(recipes) {
    const recipeListHTML = RecipeListComponent(recipes).firstChild.nextSibling;
    const container = document.getElementById("recipe-list-container");
    if (container) {
        container.innerHTML = recipeListHTML.outerHTML;
    }
    setRecipesList(recipes);
}
