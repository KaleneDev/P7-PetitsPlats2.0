import { RecipeListComponent } from "../components/RecipeList.js";
let recipesData = [];
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

// Fonction pour rechercher des recettes
export function searchRecipes(searchTerm) {

    const data = getRecipeList().length > 0 ? getRecipeList() : recipesData;

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

// Fonction pour mettre à jour la liste des recettes
export function updateRecipeList(recipes) {
    const recipeListHTML = RecipeListComponent(recipes).firstChild.nextSibling;
    const container = document.getElementById("recipe-list-container");
    if (container) {
        container.innerHTML = recipeListHTML.outerHTML;
    }
    setRecipeList(recipes);
}
