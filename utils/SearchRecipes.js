import { RecipeListComponent } from "../components/RecipeList.js";
import { setRecipeList, getRecipeList,getAllRecipes } from "./dataManager.js";

// Fonction pour rechercher des recettes
export function searchRecipes(searchTerm) {
    const searchTerms = searchTerm.toLowerCase().split(" ");

    return getAllRecipes().filter((recipe) =>
        searchTerms.every(
            (term) => {
                return recipe.name.toLowerCase().includes(term) ||
                    recipe.ingredients.some((ingredient) =>
                        ingredient.ingredient.toLowerCase().includes(term)
                    ) ||
                    recipe.description.toLowerCase().includes(term);
            }
        )
    );
}


// Fonction pour mettre à jour la liste des recettes
export function updateRecipeList(recipes, tags) {
    // Fonction pour filtrer les recettes en fonction des tags
    const filterRecipes = (recipes, tags) => {
        return recipes.filter((recipe) => {
            // Vérifie si chaque ingrédient de la recette est présent dans tags.ingredients
            const ingredientMatch =
                tags.ingredients.length === 0 ||
                tags.ingredients.every((tagIngredient) =>
                    recipe.ingredients.some(
                        (recipeIngredient) =>
                            recipeIngredient.ingredient === tagIngredient
                    )
                );

            // Vérifie si l'appareil de la recette est présent dans tags.appliances
            const applianceMatch =
                tags.appliances.length === 0 ||
                tags.appliances.includes(recipe.appliance);

            // Vérifie si chaque ustensile de la recette est présent dans tags.ustensils
            const utensilMatch =
                tags.ustensils.length === 0 ||
                tags.ustensils.every((tagUtensil) =>
                    recipe.ustensils.includes(tagUtensil)
                );

            // Une recette doit respecter tous les critères pour être incluse
            return ingredientMatch && applianceMatch && utensilMatch;
        });
    };

    const filteredRecipes = filterRecipes(recipes, tags);

    // Met à jour la liste des recettes affichées
    const recipeListElement = RecipeListComponent(filteredRecipes); // Supposons que cette fonction met à jour l'affichage

    const container = document.querySelector(".recipe-list");

    if (!container) {
        // create container
        console.log("container not found");
    }

    if (container) {
        container.parentNode.replaceChild(recipeListElement, container);
    }

    // Cette ligne semble ne pas être utilisée dans le contexte actuel
    // setRecipeList(recipes);
}

export function updateAllRecipeList(recipes) {
    const recipeListElement = RecipeListComponent(recipes); // Cela devrait être un élément DOM
    const container = document.getElementById("recipe-list");
    if (container) {
        // Vide le conteneur existant
        container.innerHTML = "";
        // ecrase le contenu du conteneur
        container.innerHTML = recipeListElement.outerHTML;
    }

    setRecipeList(recipes);
}
