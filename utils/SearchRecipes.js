import { RecipeListComponent } from "../components/RecipeList.js";
import { recipesData } from "./dataManager.js";
import { setRecipeList } from "./dataManager.js";
import { setFilteredRecipes } from "../components/SearchBar.js";

// Fonction pour rechercher des recettes
export function searchRecipes(searchTerm) {
    const searchTerms = searchTerm.toLowerCase().split(" ");

    return recipesData.filter((recipe) =>
        searchTerms.every(
            (term) =>
                recipe.name.toLowerCase().includes(term) ||
                recipe.ingredients.some((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(term)
                ) ||
                recipe.description.toLowerCase().includes(term)
        )
    );
}

// Fonction pour mettre à jour la liste des recettes
export function updateRecipeList(recipes, matchedElements) {
    function filterRecipes(recipes, matchedElements) {
        return recipes.filter((recipe) => {
            // Vérifie si chaque ingrédient de la recette est présent dans matchedElements.ingredients
            const ingredientMatch = recipe.ingredients.every(
                (recipeIngredient) =>
                    matchedElements.ingredients.includes(
                        recipeIngredient.ingredient
                    )
            );

            // Vérifie si l'appareil de la recette est présent dans matchedElements.appliances
            const applianceMatch = matchedElements.appliances.includes(
                recipe.appliance
            );

            // Vérifie si chaque ustensile de la recette est présent dans matchedElements.ustensils
            const utensilMatch = recipe.ustensils.every((utensil) =>
                matchedElements.ustensils.includes(utensil)
            );

            // Une recette doit respecter tous les critères pour être incluse
            return ingredientMatch && applianceMatch && utensilMatch;
        });
    }
    const RecipesIncludeTags = filterRecipes(recipes, matchedElements);
    setFilteredRecipes(RecipesIncludeTags);

    const recipeListElement = RecipeListComponent(RecipesIncludeTags); // Cela devrait être un élément DOM
    const container = document.getElementById("recipe-list-container");
    if (container) {
        // Vide le conteneur existant
        container.innerHTML = "";
        // ecrase le contenu du conteneur
        container.innerHTML = recipeListElement.innerHTML;
    }

    setRecipeList(recipes);
}

export function updateAllRecipeList(recipes) {
    const recipeListElement = RecipeListComponent(recipes); // Cela devrait être un élément DOM
    const container = document.getElementById("recipe-list-container");
    if (container) {
        // Vide le conteneur existant
        container.innerHTML = "";
        // ecrase le contenu du conteneur
        container.innerHTML = recipeListElement.innerHTML;
    }

    setRecipeList(recipes);
}
