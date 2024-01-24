import { recipesData } from "./dataManager.js";
import { TagsComponent } from "../components/Tags.js";

export function findMatchingElements(filteredRecipes, searchTerms) {
    console.log(searchTerms);
    let matchedIngredients = new Set();
    let matchedAppliances = new Set();
    let matchedUstensils = new Set();
    filteredRecipes.forEach((recipe) => {
        searchTerms.forEach((term) => {
            recipe.ingredients.forEach((ingredient) => {
                if (ingredient.ingredient.toLowerCase().includes(term)) {
                    matchedIngredients.add(ingredient.ingredient);
                }
            });

            if (recipe.appliance.toLowerCase().includes(term)) {
                matchedAppliances.add(recipe.appliance);
            }

            recipe.ustensils.forEach((ustensil) => {
                if (ustensil.toLowerCase().includes(term)) {
                    matchedUstensils.add(ustensil);
                }
            });
        });
    });

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
}
