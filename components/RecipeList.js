// components/RecipeListComponent.js
import jsxParser from '../utils/jsxParser.js';

export function RecipeListComponent(recipes) {
    console.log(recipes);
    const recipeItems = recipes.map(recipe => 
        `<div class="recipe">${recipe.name}</div>`
    ).join('');

    return jsxParser`
        <div class="recipe-list">
            ${recipeItems}
        </div>
    `;
}
