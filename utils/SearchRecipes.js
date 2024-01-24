import { RecipeListComponent } from "../components/RecipeList.js";
import { recipesData } from "./dataManager.js";
import { setRecipeList } from "./dataManager.js";

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
export function updateRecipeList(recipes) {
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
