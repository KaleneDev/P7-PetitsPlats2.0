// components/RecipeListComponent.js
import jsxParser from "../utils/jsxParser.js";
import { limiteDescription } from "../utils/limiteDescription.js";

export function RecipeListComponent(recipes) {
    const recipeItems = recipes
        .map(
            (recipe) => /*html*/ `
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
                            ${recipe.ingredients
                                .map((ingredient) => {
                                    return /*html*/ `
                                            <ul >
                                                <li class="ingredient"> ${
                                                    ingredient.ingredient
                                                } </li>
                                                <li class="quantityUnit"> ${
                                                    ingredient.quantity
                                                        ? ingredient.quantity
                                                        : ""
                                                } ${
                                        ingredient.unit ? ingredient.unit : ""
                                    } </li>
                                            </ul>
                                `;
                                })
                                .join("")}
                        </ul>
                    </div>

                </div>
            </div>
        `
        )
        .join("");

    return jsxParser/*html*/ `
        <div id="recipe-list-container"> 
            <div class="recipe-list">
                ${recipeItems}
            </div>
        </div>
    `;
}
