import jsxParser from "../utils/jsxParser.js";
import { getNumberOfRecipes } from "../utils/dataManager.js";

function generateTagsList(tags, className) {
    let tagsHtml = '';
    for (let i = 0; i < tags.length; i++) {
        tagsHtml += /*html*/ `
        <li class="tag ${className}" data-tag="${tags[i]}">
            ${tags[i]}
            <span class="icon-circle-xmark close-tag"></span>
        </li>
    `;
    }
    return tagsHtml;
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
                        <span class="icon-xmark clean ingredient"></span>
                    </div>
                        ${generateTagsList(tags.ingredients, "ingredients")}
                    </ul> 
                </div>
                <div class="filter__container">
                    <span class="filter__list__title">Appareils <span class="icon-chevron-down"></span></span>
                    <ul class="appliance filter__list">
                    <div class="filter__input__container">
                        <input type="text"  class="filter__input" placeholder="Rechercher un appareil"/>
                        <span class="icon-xmark clean appliance"></span>
                    </div>
                        ${generateTagsList(tags.appliances, "appliances")}
                    </ul>
                </div>
                <div class="filter__container">
                    <span class="filter__list__title">Ustensiles <span class="icon-chevron-down"></span></span>
                    <ul class="ustensil filter__list">
                    <div class="filter__input__container">
                        <input type="text"  class="filter__input" placeholder="Rechercher un ustensile"/>
                        <span class="icon-xmark clean ustensil"></span>
                    </div>
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
