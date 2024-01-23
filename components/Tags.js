import jsxParser from "../utils/jsxParser.js";

export function TagsComponent(tags) {
    const tagsHTML = tags.ingredients
        .map(
            (tag) => /*html*/ `
            <li class="tag" data-tag="${tag}">${tag}</li>
        `
        )
        .join("");

    return jsxParser/*html*/ `
        <ul class="tags ingredient">
            ${tagsHTML}
        </ul>
    `;
}
