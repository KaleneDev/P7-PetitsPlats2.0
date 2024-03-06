import jsxParser from "../utils/jsxParser.js";
import { getNumberOfRecipes } from "../utils/dataManager.js";

function generateTagsList(tags, className) {
    return tags
        .map(
            (tag) => /*html*/ `
        <li class="tag ${className}" data-tag="${tag}">
            ${tag}
            <span class="icon-circle-xmark close-tag"></span>
        </li>

    `
        )
        .join("");
}

export function FilterComponent(tags) {
    const tagsHtml = jsxParser/*html*/ `
        <div class="filter-list">
            <div class="filter">
                <div class="filter__container">
                    <span class="filter__list__title">Ingrédients <span class="icon-chevron-down"></span></span>
                    <ul class="ingredient filter__list">
                    <div class="filter__input__container">
                        <input type="text"  class="filter__input" placeholder="Rechercher un ingrédient"/>
                        <span class="icon-xmark clean"></span>
                    </div>
                        ${generateTagsList(tags.ingredients, "ingredients")}
                    </ul> 
                </div>
                <div class="filter__container">
                    <span class="filter__list__title">Appareils <span class="icon-chevron-down"></span></span>
                    <ul class="appliance filter__list">
                        <input type="text"  class="filter__input" placeholder="Rechercher un Appareil"/>
                        ${generateTagsList(tags.appliances, "appliances")}
                    </ul>
                </div>
                <div class="filter__container">
                    <span class="filter__list__title">Ustensiles <span class="icon-chevron-down"></span></span>
                    <ul class="ustensil filter__list">
                        <input type="text"  class="filter__input" placeholder="Rechercher un ustensile"/>
                        ${generateTagsList(tags.ustensils, "ustensils")}
                    </ul>
                </div>
                </div>
            <div class="filter__numberOfRecipes">
                <span id="number-of-recipes">${getNumberOfRecipes()}</span>
                <span>recettes</span>
            </div>
        </div>
    `;

    return tagsHtml;
}
