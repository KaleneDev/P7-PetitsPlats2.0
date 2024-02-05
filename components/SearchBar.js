import jsxParser from "../utils/jsxParser.js";
import { getRecipeList, getAllRecipes } from "../utils/dataManager.js";
import {
    updateRecipeList,
    updateAllRecipeList,
    searchRecipes,
} from "../utils/SearchRecipes.js";
import { updateFilter, getTags } from "../utils/SearchFilters.js";
import cleanString from "../utils/cleanString.js";
import { getMatchedElements } from "../utils/SearchTags.js";

let filteredRecipes = [];

export function getFilteredRecipes() {
    return filteredRecipes;
}
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

    updateFilter(getMatchedElements(getRecipeList()));

    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            const searchTerm = event.target.value;
            const cleanSearchTerm = cleanString(searchTerm);
            // Divise en mots et filtre ceux ayant au moins 3 caractères

            if (searchTerm.length > 3) {
                filteredRecipes = searchRecipes(cleanSearchTerm);

                updateRecipeList(filteredRecipes, getTags());

                updateFilter(getMatchedElements());

                if (filteredRecipes.length === 0) {
                    // Supprime la liste des recettes
                    const listRecipes = document.querySelector(".recipe-list");
                    listRecipes.innerHTML = "";
                    if (document.querySelector(".message")) {
                        document.querySelector(".message").remove();
                    }
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
                    updateRecipeList(allRecipes, getTags());
                    updateFilter(getMatchedElements(getRecipeList()));
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
    } else {
        console.error("Search input not found");
    }
}
