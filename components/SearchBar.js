import jsxParser from "../utils/jsxParser.js";
import { searchRecipes } from "../utils/dataManager.js";
import { getAllRecipes } from "../utils/dataManager.js";
import { updateRecipeList } from "../utils/dataManager.js";

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
        searchInput.oninput = (event) => {
            const searchTerm = event.target.value;
            if (searchTerm.length >= 3) {
                const filteredRecipes = searchRecipes(searchTerm);
                updateRecipeList(filteredRecipes);

                if (filteredRecipes.length === 0) {
                    // delete recipeList
                    const listRecipes = document.querySelector(".recipe-list");
                    listRecipes.remove();
                    // ajouter dans recipelist un message d'erreur
                    const listRecipeContainer = document.getElementById("recipe-list-container");
                    const message = document.createElement("div");
                    message.classList.add("message");
                    message.innerText = `Aucune recette ne contient '${searchTerm}' vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
                    listRecipeContainer.appendChild(message);
                   
                }
            } else {
                updateRecipeList(getAllRecipes());
            }
        };
    }
}
