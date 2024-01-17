import jsxParser from "../utils/jsxParser.js";
import { searchRecipes } from "../utils/dataManager.js";
import { updateRecipeList } from "../utils/dataManager.js";
import cleanString from "../utils/cleanString.js";

export function SearchBarComponent() {
    return jsxParser/*html*/ `
        <div class="search-bar">
            <img src="assets/images/search-icon.png" alt="search" />
            <input id="search-input" type="text" placeholder="Rechercher une recette, un ingredient, ..."/>
        </div>
    `;
}

function sanitizeStr(str) {
    // sanitize input user
    return str;
}

export function setupSearchInput() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener('input', (event) => { 
            const searchTerm = sanitizeStr(event.target.value);
            // 
            if (searchTerm.length >= 3) {
                const filteredRecipes = searchRecipes(searchTerm);
                updateRecipeList(filteredRecipes);

                if (filteredRecipes.length === 0) {
                    // Supprime la liste des recettes
                    const listRecipes = document.querySelector(".recipe-list");
                    listRecipes.remove();
                    // Ajoute dans recipeList un message d'erreur
                    const listRecipeContainer = document.getElementById(
                        "recipe-list-container"
                    );
                    const message = document.createElement("div");
                    message.classList.add("message");
                    message.innerText = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
                    listRecipeContainer.appendChild(message);
                }
            } else {
                // message pour dire qu'il faut chercher au minimum 3 caractères
            }
        });
    }
}
