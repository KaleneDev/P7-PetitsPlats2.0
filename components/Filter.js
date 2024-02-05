import jsxParser from "../utils/jsxParser.js";

function generateTagsList(tags, className) {
    return tags
        .map(
            (tag) => /*html*/ `
        <li class="tag ${className}" data-tag="${tag}">
            ${tag}
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
                    <ul class="ingredient filter__list">${generateTagsList(
                        tags.ingredients,
                        "ingredient"
                    )}</ul> 
                </div>
                <div class="filter__container">
                    <span class="filter__list__title">Appareils <span class="icon-chevron-down"></span></span>
                    <ul class="appliance filter__list">${generateTagsList(
                        tags.appliances,
                        "appliance"
                    )}</ul>
                </div>
                <div class="filter__container">
                    <span class="filter__list__title">Ustensiles <span class="icon-chevron-down"></span></span>
                    <ul class="ustensil filter__list">${generateTagsList(
                        tags.ustensils,
                        "ustensil"
                    )}</ul>
                </div>
            </div>
        </div>
    `;

    return tagsHtml;
}

