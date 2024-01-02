import jsxParser from "../utils/jsxParser.js";

export function SearchBarComponent() {
    return jsxParser`
        <div class="search-bar">
            <img src="assets/images/search-icon.png" alt="search" />
            <input type="text" placeholder="Rechercher une recette, un ingredient, ..." />
        </div>
    `;
}