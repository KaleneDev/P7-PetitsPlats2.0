import { TagsComponent } from "../components/Tags.js";
import { updateRecipeList } from "../utils/SearchRecipes.js";
import { getRecipeList, getRecipListSearch } from "./dataManager.js";
import { removeTag, getTags, updateFilter } from "./SearchFilters.js";

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

    filteredRecipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            const lowerIngredient = ingredient.ingredient.toLowerCase();
            if (!ingredientsMap[lowerIngredient]) {
                ingredientsMap[lowerIngredient] = ingredient.ingredient;
            }
        });

        const lowerAppliance = recipe.appliance.toLowerCase();
        if (!appliancesMap[lowerAppliance]) {
            appliancesMap[lowerAppliance] = recipe.appliance;
        }

        recipe.ustensils.forEach((ustensil) => {
            const lowerUstensil = ustensil.toLowerCase();
            if (!ustensilsMap[lowerUstensil]) {
                ustensilsMap[lowerUstensil] = ustensil;
            }
        });
    });

    // Convertit les objets en tableaux de valeurs tout en préservant la casse originale
    const matchedElements = {
        ingredients: Object.values(ingredientsMap),
        appliances: Object.values(appliancesMap),
        ustensils: Object.values(ustensilsMap),
    };
    return matchedElements;
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

    updateRecipeList(getRecipListSearch(), tags);

    addEventListenersToTags(tags);
}

export function updateTagsActif() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
        const tagType = tag.classList[1]; // Assume this is either 'ingredients', 'appliances', or 'ustensils'
        const tagName = tag.dataset.tag;

        // Directement utiliser tagType pour accéder au tableau correspondant
        if (getTags()[tagType] && getTags()[tagType].includes(tagName)) {
            tag.classList.add("active");
        }
    });
}

export function addEventListenersToTags() {
    const tagsContainer = document.querySelector(".recipe-list__tags");
    const closeButtons = tagsContainer.querySelectorAll(".close-tag");

    closeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation(); // Prévenir la propagation pour éviter les effets secondaires
            const tagElement = e.target.closest(".tag");
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

                removeTag(tagName, tagType);
                tagElement.remove(); // Supprimer le tag de l'interface utilisateur
                // Refiltrer et mettre à jour la liste des recettes
                updateRecipeList(getRecipListSearch(), getTags());
            }
        });
    });
}
