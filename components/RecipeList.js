// components/RecipeListComponent.js
import jsxParser from "../utils/jsxParser.js";

export function RecipeListComponent(recipes) {
    console.log(recipes);
    const recipeItems = recipes
        .map(
            (recipe) => /*html*/ `
            <div class="recipe-container">
                <div class="recipe-container__image">
                    <img src="./../assets/Les_petits_plats/${recipe.image}" alt="${recipe.name}" />
                </div>
                <div class="recipe-container__content">
                    <div class="recipe-container__content__time">
                        <span>${recipe.time} min</span>
                    </div>
                    <div class="recipe-container__content__title">
                        <h2>${recipe.name}</h2>
                    </div>
                </div>
            </div>
        `
        )
        .join("");

    return jsxParser/*html*/ `
        <div class="recipe-list">
            ${recipeItems}
        </div>
    `;
}
