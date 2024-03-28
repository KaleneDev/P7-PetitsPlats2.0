import { TagsComponent } from "../components/Tags.js";
import { updateRecipeList } from "../utils/SearchRecipes.js";
import { getRecipeList, getRecipListSearch } from "./dataManager.js";
import { removeTag, getTags } from "./SearchFilters.js";

let matchedElements = [];

export function getMatchedElements() {
    if (getRecipeList()) {
        return findMatchingElements(getRecipeList());
    }
    return matchedElements;
}

export function findMatchingElements(filteredRecipes) {
    let ingredientsMap = {};
    let appliancesMap = {};
    let ustensilsMap = {};

    for (let recipe of filteredRecipes) {
        for (let ingredient of recipe.ingredients) {
            const lowerIngredient = ingredient.ingredient.toLowerCase();
            if (!ingredientsMap[lowerIngredient]) {
                ingredientsMap[lowerIngredient] = ingredient.ingredient;
            }
        }

        const lowerAppliance = recipe.appliance.toLowerCase();
        if (!appliancesMap[lowerAppliance]) {
            appliancesMap[lowerAppliance] = recipe.appliance;
        }

        for (let ustensil of recipe.ustensils) {
            const lowerUstensil = ustensil.toLowerCase();
            if (!ustensilsMap[lowerUstensil]) {
                ustensilsMap[lowerUstensil] = ustensil;
            }
        }
    }

    const matchedElements = {
        ingredients: Object.values(ingredientsMap),
        appliances: Object.values(appliancesMap),
        ustensils: Object.values(ustensilsMap),
    };
    return matchedElements;
}

export function updateTags(tags) {
    const tagsElement = TagsComponent(tags);
    const filterList = document.querySelector(".filter-list");
    let tagsContainer = document.querySelector(".recipe-list__tags");

    if (!tagsContainer && filterList) {
        tagsContainer = document.createElement("div");
        tagsContainer.className = "recipe-list__tags";
        filterList.insertAdjacentElement("afterend", tagsContainer);
    }

    if (tagsContainer) {
        tagsContainer.innerHTML = "";
        tagsContainer.appendChild(tagsElement);
    }

    updateRecipeList(getRecipListSearch(), tags);
    addEventListenersToTags(tags);
}

export function updateTagsActif() {
    const tags = document.querySelectorAll(".tag");
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const tagType = tag.classList[1];
        const tagName = tag.dataset.tag;

        if (getTags()[tagType] && getTags()[tagType].includes(tagName)) {
            tag.classList.add("active");
        }
    }
}

export function addEventListenersToTags() {
    const tagsContainer = document.querySelector(".recipe-list__tags");
    const closeButtons = tagsContainer.querySelectorAll(".close-tag");

    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", (e) => {
            e.stopPropagation();
            const tagElement = e.target.closest(".tag");
            if (tagElement) {
                const tagName = tagElement.dataset.tag;
                const tagType = tagElement.classList.contains("ingredient")
                    ? "ingredients"
                    : tagElement.classList.contains("appliance")
                    ? "appliances"
                    : tagElement.classList.contains("ustensil")
                    ? "ustensils"
                    : null;

                removeTag(tagName, tagType);
                tagElement.remove();
                updateRecipeList(getRecipListSearch(), getTags());
            }
        });
    }
}
