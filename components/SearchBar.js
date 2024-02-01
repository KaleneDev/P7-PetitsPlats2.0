import jsxParser from "../utils/jsxParser.js";
import { getAllRecipes } from "../utils/dataManager.js";
import {
    updateRecipeList,
    updateAllRecipeList,
    searchRecipes,
} from "../utils/SearchRecipes.js";
import { findMatchingElements, updateTags } from "../utils/SearchTags.js";
import cleanString from "../utils/cleanString.js";
import { matchedElements } from "../utils/SearchTags.js";

export let filteredRecipes = [];

export function setFilteredRecipes(newFilteredRecipes) {
    filteredRecipes = newFilteredRecipes;
}
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
            // Divise en mots et filtre ceux ayant au moins 3 caractères

            if (searchTerm.length > 3) {
                filteredRecipes = searchRecipes(cleanSearchTerm);

                findMatchingElements(filteredRecipes);

                updateRecipeList(filteredRecipes, matchedElements);
                updateTags(matchedElements);

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
                // Supprime la liste des recettes
                if (cleanSearchTerm.length === 0) {
                    //    get all
                    const allRecipes = getAllRecipes();
                    updateAllRecipeList(allRecipes);
                } else {
                    const listRecipeContainer = document.getElementById(
                        "recipe-list-container"
                    );
                    if (listRecipeContainer.querySelector(".message")) {
                        listRecipeContainer.querySelector(".message").remove();
                    }
                    const message = document.createElement("div");
                    message.classList.add("message");
                    message.innerText = `Aucune recette ne contient '${searchTerm}'. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
                    listRecipeContainer.appendChild(message);
                }
            }
        });
    }
}
