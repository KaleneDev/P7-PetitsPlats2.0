import jsxParser from "../utils/jsxParser.js";
import {
    getRecipeList,
    setRecipeList,
    getAllRecipes,
    setRecipListSearch,
} from "../utils/dataManager.js";
import { updateRecipeList, searchRecipes } from "../utils/SearchRecipes.js";
import { updateFilter, getTags } from "../utils/SearchFilters.js";
import cleanString from "../utils/cleanString.js";
import { getMatchedElements } from "../utils/SearchTags.js";

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

    updateFilter(getMatchedElements());

    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            const searchTerm = event.target.value;
            const cleanSearchTerm = cleanString(searchTerm);
            // Divise en mots et filtre ceux ayant au moins 3 caractères

            if (searchTerm.length > 3) {
                const filteredRecipes = searchRecipes(cleanSearchTerm);

                setRecipeList(filteredRecipes);
                
                console.log(filteredRecipes);
                setRecipListSearch(filteredRecipes);

                updateRecipeList(getRecipeList(), getTags());
                updateFilter(getMatchedElements());

                if (getRecipeList().length === 0) {
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
                    // get all
                    const allRecipes = getAllRecipes();
                    setRecipeList(allRecipes);
                    updateRecipeList(allRecipes, getTags());
                    updateFilter(getMatchedElements());
                } else if (getRecipeList().length === 0) {
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
