import { TagsComponent } from "../components/Tags.js";
import { getAllRecipes } from "./dataManager.js";
import { updateRecipeList } from "../utils/SearchRecipes.js";
import {
    filteredRecipes,
    setFilteredRecipes,
} from "../components/SearchBar.js";
export let matchedElements = [];

export function findMatchingElements(filteredRecipes) {
    let matchedIngredients = new Set();
    let matchedAppliances = new Set();
    let matchedUstensils = new Set();

    filteredRecipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            matchedIngredients.add(ingredient.ingredient);
        });
        matchedAppliances.add(recipe.appliance);

        recipe.ustensils.forEach((ustensil) => {
            matchedUstensils.add(ustensil);
        });
    });

    matchedElements = {
        ingredients: Array.from(matchedIngredients),
        appliances: Array.from(matchedAppliances),
        ustensils: Array.from(matchedUstensils),
    };

    return {
        ingredients: Array.from(matchedIngredients),
        appliances: Array.from(matchedAppliances),
        ustensils: Array.from(matchedUstensils),
    };
}

export function updateTags(tags) {
    const tagsElement = TagsComponent(tags);
    const container = document.querySelector(".recipe-list__tags");

    if (container) {
        container.innerHTML = tagsElement.outerHTML;
    }
    addEventListenersToTags();
}

export function addEventListenersToTags() {
    const closeButtons = document.querySelectorAll(".tag-close");
    closeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const tagElement = e.target.closest(".tag");
            const tagName = tagElement.dataset.tag;
            const tagType = tagElement.classList.contains("ingredient")
                ? "ingredients"
                : tagElement.classList.contains("appliance")
                ? "appliances"
                : tagElement.classList.contains("ustensil")
                ? "ustensils"
                : null;

            if (tagType) {
                // Supprimer le tag de matchedElements
                const index = matchedElements[tagType].indexOf(tagName);
                if (index > -1) {
                    matchedElements[tagType].splice(index, 1);
                }
            }

            tagElement.remove(); // Supprimer le tag de l'interface utilisateur

            // Refiltrer et mettre à jour la liste des recettes

            updateRecipeList(filteredRecipes, matchedElements);
            updateTags(matchedElements);
        });
    });
}
