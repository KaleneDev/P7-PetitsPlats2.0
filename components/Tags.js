import jsxParser from "../utils/jsxParser.js";

function generateTagsList(tags, className) {
    let tagsHtml = "";
    for (let i = 0; i < tags.length; i++) {
        tagsHtml += /*html*/ `
            <li class="tag ${className}" data-tag="${tags[i]}">
                ${tags[i]}
                <span class="icon-xmark close-tag"></span>
            </li>
        `;
    }
    return tagsHtml;
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
