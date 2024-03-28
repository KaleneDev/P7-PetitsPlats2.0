import jsxParser from "../utils/jsxParser.js";
import { limiteDescription } from "../utils/limiteDescription.js";

export function RecipeListComponent(recipes) {
    let recipeItems = "";
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let ingredientsHtml = "";

        for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredient = recipe.ingredients[j];
            ingredientsHtml += /*html*/ `
                <ul>
                    <li class="ingredient"> ${ingredient.ingredient} </li>
                    <li class="quantityUnit"> ${
                        ingredient.quantity ? ingredient.quantity : ""
                    } ${ingredient.unit ? ingredient.unit : ""} </li>
                </ul>
            `;
        }

        recipeItems += /*html*/ `
            <div class="recipe-container">
                <div class="recipe-container__image">
                    <img src="./../assets/Les_petits_plats/${
                        recipe.image
                    }" alt="${recipe.name}" />
                </div>
                <div class="recipe-container__content">
                    <div class="recipe-container__content__time">
                        <span>${recipe.time} min</span>
                    </div>
                    <div class="recipe-container__content__title">
                        <h2>${recipe.name}</h2>
                    </div>
                    <div class="recipe-container__content__description">
                        <span>RECETTE</span>
                        <p>${limiteDescription(recipe.description)}</p>
                   </div>
                    <div class="recipe-container__content__ingredients">
                        <span>INGRÉDIENTS</span>
                        <ul class="recipe-container__content__ingredients__quantity">
                            ${ingredientsHtml}
                        </ul>
                    </div>

                </div>
            </div>
        `;
    }

    return jsxParser/*html*/ `
        <div class="recipe-list">
            ${recipeItems}
        </div>
    `;
}
