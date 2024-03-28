import { RecipeListComponent } from "../components/RecipeList.js";
import {
    setRecipeList,
    getAllRecipes,
    setRecipListSearch,
    displayNumberOfRecipes,
} from "./dataManager.js";
import { getTags, updateFilter } from "../utils/SearchFilters.js";
import { getMatchedElements } from "../utils/SearchTags.js";

// Fonction pour rechercher des recettes en utilisant des boucles natives
export function searchRecipes(searchTerm) {
    const searchTerms = searchTerm.toLowerCase().split(" ");
    const allRecipes = getAllRecipes();
    const filteredRecipes = [];

    for (let recipe of allRecipes) {
        let recipeMatches = true;

        for (let term of searchTerms) {
            let termMatch =
                recipe.name.toLowerCase().includes(term) ||
                recipe.description.toLowerCase().includes(term);

            if (!termMatch) {
                for (let ingredient of recipe.ingredients) {
                    if (ingredient.ingredient.toLowerCase().includes(term)) {
                        termMatch = true;
                        break;
                    }
                }
            }

            if (!termMatch) {
                recipeMatches = false;
                break;
            }
        }

        if (recipeMatches) {
            filteredRecipes.push(recipe);
        }
    }

    return filteredRecipes;
}

// Fonction pour mettre à jour la liste des recettes avec des boucles natives
export function updateRecipeList(recipes, tags) {
    const filteredRecipes = [];

    for (let recipe of recipes) {
        let ingredientMatch = true,
            applianceMatch = true,
            utensilMatch = true;

        if (tags.ingredients.length > 0) {
            ingredientMatch = false;
            for (let tagIngredient of tags.ingredients) {
                for (let recipeIngredient of recipe.ingredients) {
                    if (
                        recipeIngredient.ingredient.toLowerCase() ===
                        tagIngredient.toLowerCase()
                    ) {
                        ingredientMatch = true;
                        break;
                    }
                }
                if (!ingredientMatch) break;
            }
        }

        if (tags.appliances.length > 0) {
            applianceMatch = tags.appliances
                .map((a) => a.toLowerCase())
                .includes(recipe.appliance.toLowerCase());
        }

        if (tags.ustensils.length > 0) {
            utensilMatch = false;
            for (let tagUtensil of tags.ustensils) {
                if (
                    recipe.ustensils
                        .map((u) => u.toLowerCase())
                        .includes(tagUtensil.toLowerCase())
                ) {
                    utensilMatch = true;
                    break;
                }
            }
        }

        if (ingredientMatch && applianceMatch && utensilMatch) {
            filteredRecipes.push(recipe);
        }
    }

    displayNumberOfRecipes(filteredRecipes.length);
    setRecipeList(filteredRecipes);

    const recipeListElement = RecipeListComponent(filteredRecipes);
    const container = document.querySelector(".recipe-list");

    if (container) {
        container.parentNode.replaceChild(recipeListElement, container);
    }
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

export function cleanSearchInput() {
    const clean = document.querySelectorAll(".clean");
    clean.forEach((clean) => {
        const searchInput = clean.previousElementSibling;

        if (searchInput) {
            clean.addEventListener("click", (e) => {
                e.target.style.display = "none";
                e.stopPropagation(); // Empêche le clic de se propager

                searchInput.value = "";
                setRecipListSearch(getAllRecipes());
                updateRecipeList(getAllRecipes(), getTags());
                updateFilter(getMatchedElements());
            });
        }
    });
}
