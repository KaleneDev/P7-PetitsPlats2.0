let recipesData = [];

export async function initData() {
    recipesData = fetch("../data/recipes.json")
        .then((response) => response.json())
        .catch((error) => console.error(error));
}
// Fonction pour obtenir toutes les recettes
export function getAllRecipes() {
    return recipesData;
}

// Fonction pour récupérer une recette par son ID
export function getRecipeById(id) {
    return recipesData.find((recipe) => recipe.id === id);
}
