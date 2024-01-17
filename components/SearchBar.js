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

export function setupSearchInput() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            const searchTerm = event.target.value;
            const cleanSearchTerm = cleanString(searchTerm);
            if (cleanSearchTerm.length >= 3) {
                const filteredRecipes = searchRecipes(cleanSearchTerm);
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
                // const listRecipeContainer = document.getElementById(
                //     "recipe-list-container"
                // );
                // const message = document.createElement("div");
                // message.classList.add("message");
                // message.innerText = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
                // listRecipeContainer.appendChild(message);
            }
        });
    }
}
