import { FilterComponent } from "../components/Filter.js";
import { updateTags } from "../utils/SearchTags.js";

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
}
export function updateFilter(tags) {
    const tagsElement = FilterComponent(tags);
    const container = document.querySelector(".filter-list");

    if (container) {

        container.parentNode.replaceChild(tagsElement, container);
    }
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
                list.classList.toggle("open");
                title.querySelector("span").classList.toggle("icon-chevron-up");
            });
        });
    }
}
export function tagActive() {
    const tags = document.querySelectorAll(
        ".tag.appliance, .tag.ingredient, .tag.ustensil"
    );
    tags.forEach((tag) => {
        tag.addEventListener("click", function (e) {
            // Pour empêcher le clic sur le span de fermeture de propager au tag
            e.stopPropagation();
            const type = this.classList.contains("appliance")
                ? "appliances"
                : this.classList.contains("ingredient")
                ? "ingredients"
                : "ustensils"; //

            if (!this.classList.contains("active")) {
                this.classList.add("active");
                const span = document.createElement("span");
                span.classList.add("icon-circle-xmark", "tag-close");
                // Attacher un écouteur d'événements directement au span de fermeture
                span.addEventListener("click", function (e) {
                    e.stopPropagation(); // Empêche le clic de se propager
                    const tag = this.closest(".tag");
                    if (tag) {
                        tag.classList.remove("active");
                        tag.removeChild(this); // Supprime le span du DOM
                        // Mise à jour de l'état des tags
                        removeTag(tag.dataset.tag, type);
                        updateTags(getTags());
                    }
                });
                this.appendChild(span);
                // Supposons que setTags ajoute le tag à une liste de tags actifs
                setTags(this.dataset.tag, type);
            } else {
                // Gestion de la désactivation d'un tag
                this.classList.remove("active");
                removeTag(this.dataset.tag, type); // Retire le tag si déjà actif et cliqué à nouveau
            }
            updateTags(getTags());
        });
    });
}
