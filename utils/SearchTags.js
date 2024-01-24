import { TagsComponent } from "../components/Tags.js";

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
