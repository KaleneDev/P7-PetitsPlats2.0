let recipeListAll = [];
let recipeList = [];
let recipeListSearch = [];
let nomberOfRecipes = 0;

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
    setNumberOfRecipes(recipeList.length);
    const nomberOfRecipes = document.querySelector("#number-of-recipes");
    if (nomberOfRecipes) {
        nomberOfRecipes.textContent = getNumberOfRecipes();
    }
    return recipeList;
}

export function getRecipListSearch() {
    return recipeListSearch;
}

export function setRecipListSearch(recipes) {
    recipeListSearch = recipes;
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

export function getNumberOfRecipes() {
    return nomberOfRecipes;
}

export function setNumberOfRecipes(number) {
    nomberOfRecipes = number;
}
