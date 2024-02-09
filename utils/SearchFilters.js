import { FilterComponent } from "../components/Filter.js";
import { updateTags, updateTagsActif } from "../utils/SearchTags.js";

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
    const container = document.querySelector(".filter-list");

    if (container) {
        container.parentNode.replaceChild(tagsElement, container);
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

export function openFilter() {
    const filter = document.querySelectorAll(".filter__list__title");
    if (filter) {
        filter.forEach((title) => {
            title.addEventListener("click", (e) => {
                const list = e.target
                    .closest(".filter__container")
                    .querySelector(".filter__list");
                const container = e.target.closest(".filter__container");
                container.classList.toggle("open");
                list.classList.toggle("open");
                title.querySelector("span").classList.toggle("icon-chevron-up");
            });
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
            }
            // this.appendChild(closeSpan);
            updateTags(getTags());
        });

        const closeSpan = tag.querySelector(".close-tag");
        // Attacher un écouteur d'événements directement au span de fermeture
        closeSpan.addEventListener("click", function (e) {
            console.log("click");
            e.stopPropagation(); // Empêche le clic de se propager
            const tag = this.closest(".tag");
            console.log(tag);
            if (tag) {
                // Mise à jour de l'état des tags
                removeTag(tag.dataset.tag, type);
                updateTags(getTags());
            }
        });
    });
}
