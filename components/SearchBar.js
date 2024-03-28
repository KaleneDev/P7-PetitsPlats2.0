import jsxParser from "../utils/jsxParser.js";
import {
    getRecipeList,
    setRecipeList,
    getAllRecipes,
    setRecipListSearch,
} from "../utils/dataManager.js";
import {
    updateRecipeList,
    searchRecipes,
    cleanSearchInput,
} from "../utils/SearchRecipes.js";
import { updateFilter, getTags } from "../utils/SearchFilters.js";
import cleanString from "../utils/cleanString.js";
import { getMatchedElements } from "../utils/SearchTags.js";
// import { runPerformanceTests } from "../utils/testPerformance.js";

export function SearchBarComponent() {
    return jsxParser/*html*/ `
        <div class="search-bar">
            <img src="assets/images/search-icon.png" alt="search" />
            <input id="search-input" type="text" placeholder="Rechercher une recette, un ingredient, ..."/>
            <span class="icon-xmark clean"></span>
        </div>
    `;
}

export function setupSearchInput() {
    const searchInput = document.getElementById("search-input");
    setRecipListSearch(getAllRecipes());
    updateFilter(getMatchedElements());
    cleanSearchInput();

    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            let searchTerm = event.target.value;

            if (searchTerm.length !== 0) {
                document.querySelector(".icon-xmark").style.display = "block";
            } else {
                document.querySelector(".icon-xmark").style.display = "none";
            }
            const cleanSearchTerm = cleanString(searchTerm);
            // Divise en mots et filtre ceux ayant au moins 3 caractères

            if (searchTerm.length > 3) {
                // Début de la mesure de performance
                const filteredRecipes = searchRecipes(cleanSearchTerm);

                setRecipeList(filteredRecipes);

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

                    setRecipListSearch(getAllRecipes());

                    setRecipeList(getAllRecipes());
                    updateRecipeList(getAllRecipes(), getTags());
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
