import jsxParser from "../utils/jsxParser.js";

function generateTagsList(tags, className) {
    return tags
        .map(
            (tag) => /*html*/ `
        <li class="tag ${className}" data-tag="${tag}">
            ${tag}
            <span class="icon-xmark close-tag"></span>
        </li>
    `
        )
        .join("");
}

export function TagsComponent(tags) {
    const tagsHtml = jsxParser/*html*/ `
        
        <div class="tags">
            <ul class="ingredient">${generateTagsList(
                tags.ingredients,
                "ingredient"
            )}</ul>
            <ul class="appliance">${generateTagsList(
                tags.appliances,
                "appliance"
            )}</ul>
            <ul class="ustensil">${generateTagsList(
                tags.ustensils,
                "ustensil"
            )}</ul>
    
        </div>
    `;

    return tagsHtml;
}
