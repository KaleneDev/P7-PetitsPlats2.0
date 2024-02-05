import { TagsComponent } from "../components/Tags.js";
import { updateRecipeList } from "../utils/SearchRecipes.js";
import { getRecipeList } from "./dataManager.js";
import { removeTag, getTags, setTags } from "./SearchFilters.js";
let matchedElements = [];

export function getMatchedElements() {
    if (getRecipeList()) {
        return findMatchingElements(getRecipeList());
    }
    return matchedElements;
}

export function setMatchedElements(newMatchedElements) {
    matchedElements = newMatchedElements;
}

export function findMatchingElements(filteredRecipes) {
    let matchedIngredients = new Set();
    let matchedAppliances = new Set();
    let matchedUstensils = new Set();
    filteredRecipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            matchedIngredients.add(ingredient.ingredient);
        });
        matchedAppliances.add(recipe.appliance);

        recipe.ustensils.forEach((ustensil) => {
            matchedUstensils.add(ustensil);
        });
    });

    matchedElements = {
        ingredients: Array.from(matchedIngredients),
        appliances: Array.from(matchedAppliances),
        ustensils: Array.from(matchedUstensils),
    };

    return {
        ingredients: Array.from(matchedIngredients),
        appliances: Array.from(matchedAppliances),
        ustensils: Array.from(matchedUstensils),
    };
}

export function updateTags(tags) {
    const tagsElement = TagsComponent(tags); // Supposons que ceci retourne un élément DOM
    const filterList = document.querySelector(".filter-list");
    let tagsContainer = document.querySelector(".recipe-list__tags");

    if (!tagsContainer && filterList) {
        tagsContainer = document.createElement("div");
        tagsContainer.className = "recipe-list__tags";
        filterList.insertAdjacentElement("afterend", tagsContainer);
    }
    // Étape 2: Insérer tagsElement dans la <div> .recipe-list__tags
    if (tagsContainer) {
        tagsContainer.innerHTML = ""; // Nettoie le conteneur pour les mises à jour
        tagsContainer.appendChild(tagsElement);
    }
    if (!getRecipeList().length === 0) {
        updateRecipeList(getRecipeList(), tags);
    } else {
        updateRecipeList(getRecipeList(), tags);
    }
    addEventListenersToTags(tags);
}

export function addEventListenersToTags(tags) {
    const tagsContainer = document.querySelector(".recipe-list__tags");
    const closeButtons = tagsContainer.querySelectorAll(".close-tag");

    closeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Prévenir la propagation pour éviter les effets secondaires
            const tagElement = e.target.closest(".tag");
            console.log(tagElement);
            if (tagElement) {
                // Vérifie que tagElement n'est pas null
                const tagName = tagElement.dataset.tag;
                const tagType = tagElement.classList.contains("ingredient")
                    ? "ingredients"
                    : tagElement.classList.contains("appliance")
                    ? "appliances"
                    : tagElement.classList.contains("ustensil")
                    ? "ustensils"
                    : null;
                // if (tagType) {
                //     // Supprimer le tag de matchedElements
                //     const index = matchedElements[tagType].indexOf(tagName);
                //     if (index > -1) {
                //         matchedElements[tagType].splice(index, 1);
                //     }
                // }

                console.log(getRecipeList());
                console.log(getTags());
                removeTag(tagName, tagType);
                tagElement.remove(); // Supprimer le tag de l'interface utilisateur

                // Refiltrer et mettre à jour la liste des recettes
                // updateTags(matchedElements);
                updateRecipeList(getRecipeList(), getTags());
            }
        });
    });
}
