import { FilterComponent } from "../components/Filter.js";
import { updateTags, updateTagsActif } from "../utils/SearchTags.js";
import { getMatchedElements } from "../utils/SearchTags.js";
import { getRecipeList } from "./dataManager.js";

let tagsList = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

export function getTags() {
    return tagsList;
}

export function setTags(tag, type) {
    if (!tagsList[type].includes(tag)) {
        tagsList[type].push(tag);
    }
}
export function removeTag(tag, type) {
    // Supprime le tag du tableau spécifique
    tagsList[type] = tagsList[type].filter((t) => t !== tag);
    const tagActive = document.querySelector(`.tag[data-tag="${tag}"]`);

    if (tagActive) {
        tagActive.classList.remove("active");
    }
}
export function updateFilter(tags) {
    const tagsElement = FilterComponent(tags);
    const tagsElementList = tagsElement.querySelectorAll(".filter__container");

    const container = document.querySelector(".filter-list");
    const containerList = container.querySelectorAll(".filter__container");

    for (let i = 0; i < containerList.length; i++) {
        const currentList = containerList[i].querySelector(".filter__list");
        const newList = tagsElementList[i].querySelector(".filter__list");

        currentList.innerHTML = newList.innerHTML;
    }
    updateTagsActif();
    const filterInput = document.querySelectorAll(".filter__input");

    filterInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            const searchTerm = e.target.value;

            const list = e.target
                .closest(".filter__container")
                .querySelector(".filter__list");
            const listItems = list.querySelectorAll(".tag");
            listItems.forEach((tag) => {
                const tagText = tag.textContent.toLowerCase();
                if (tagText.includes(searchTerm.toLowerCase())) {
                    tag.style.display = "flex";
                } else {
                    tag.style.display = "none";
                }
            });
        });
    });

    openFilter();
    tagActive();
}

function openFilterHandler(e) {
    const title = e.target.closest(".filter__list__title");

    const list = e.target
        .closest(".filter__container")
        .querySelector(".filter__list");
    const container = e.target.closest(".filter__container");
    container.classList.toggle("open");
    list.classList.toggle("open");
    title.querySelector("span").classList.toggle("icon-chevron-up");
}

export function openFilter() {
    const filter = document.querySelectorAll(".filter__list__title");
    if (filter) {
        filter.forEach((title) => {
            title.removeEventListener("click", openFilterHandler);
            title.addEventListener("click", openFilterHandler);
        });
    }
}

export function tagActive() {
    const tags = document.querySelectorAll(
        ".tag.appliances, .tag.ingredients, .tag.ustensils"
    );
    tags.forEach((tag) => {
        const type = tag.classList.contains("appliances")
            ? "appliances"
            : tag.classList.contains("ingredients")
            ? "ingredients"
            : "ustensils";

        tag.addEventListener("click", function (e) {
            // Pour empêcher le clic sur le span de fermeture de propager au tag
            e.stopPropagation();
            if (!tag.classList.contains("active")) {
                tag.classList.add("active");
                // Supposons que setTags ajoute le tag à une liste de tags actifs
                setTags(tag.dataset.tag, type);
                updateTags(getTags());
                updateFilter(getMatchedElements());
            }

        });

        const closeSpan = tag.querySelector(".close-tag");
        // Attacher un écouteur d'événements directement au span de fermeture
        closeSpan.addEventListener("click", function (e) {
            e.stopPropagation(); // Empêche le clic de se propager
            const tag = this.closest(".tag");
            if (tag) {
                // Mise à jour de l'état des tags
                removeTag(tag.dataset.tag, type);
                updateTags(getTags());
                // console.log(getRecipeList());
                updateFilter(getMatchedElements());
            }
        });
    });
}
