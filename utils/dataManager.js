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

export function getNumberOfRecipes() {
    return nomberOfRecipes;
}

export function setNumberOfRecipes(number) {
    nomberOfRecipes = number;
}

export function displayNumberOfRecipes(number) {
    console.log("Number of recipes: ", number);
    const recipeNumber = document.getElementById("number-of-recipes");
    recipeNumber.textContent = number;
}
