import { FilterComponent } from "../components/Filter.js";
import { updateTags, updateTagsActif } from "../utils/SearchTags.js";
import { getMatchedElements } from "../utils/SearchTags.js";
import { cleanSearchInput } from "../utils/SearchRecipes.js";

let tagsList = {
    ingredients: [],
    appliances: [],
    ustensils: [],
};

export function getTags() {
    return tagsList;
}

export function setTags(tag, type) {
    let isPresent = false;
    for (let i = 0; i < tagsList[type].length; i++) {
        if (tagsList[type][i] === tag) {
            isPresent = true;
            break;
        }
    }
    if (!isPresent) {
        tagsList[type].push(tag);
    }
}

export function removeTag(tag, type) {
    for (let i = 0; i < tagsList[type].length; i++) {
        if (tagsList[type][i] === tag) {
            tagsList[type].splice(i, 1); // Remove the tag at index i
            break;
        }
    }

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
    for (let i = 0; i < filterInput.length; i++) {
        filterInput[i].addEventListener("input", (e) => {
            cleanSearchInput();
            const searchTerm = e.target.value;

            if (searchTerm.length !== 0) {
                e.target.nextElementSibling.style.display = "block";
            } else {
                e.target.nextElementSibling.style.display = "none";
            }

            const list = e.target
                .closest(".filter__container")
                .querySelector(".filter__list");
            const listItems = list.querySelectorAll(".tag");

            for (let j = 0; j < listItems.length; j++) {
                const tag = listItems[j];
                const tagText = tag.textContent.toLowerCase();
                if (tagText.includes(searchTerm.toLowerCase())) {
                    tag.style.display = "flex";
                } else {
                    tag.style.display = "none";
                }
            }
        });
    }

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
    for (let i = 0; i < filter.length; i++) {
        filter[i].removeEventListener("click", openFilterHandler);
        filter[i].addEventListener("click", openFilterHandler);
    }
}

export function tagActive() {
    const tags = document.querySelectorAll(
        ".tag.appliances, .tag.ingredients, .tag.ustensils"
    );
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const type = tag.classList.contains("appliances")
            ? "appliances"
            : tag.classList.contains("ingredients")
            ? "ingredients"
            : "ustensils";

        tag.addEventListener("click", function (e) {
            e.stopPropagation();
            if (!this.classList.contains("active")) {
                this.classList.add("active");
                setTags(this.dataset.tag, type);
                updateTags(getTags());
                updateFilter(getMatchedElements());
            }
        });

        const closeSpan = tag.querySelector(".close-tag");
        closeSpan.addEventListener("click", function (e) {
            e.stopPropagation();
            removeTag(this.closest(".tag").dataset.tag, type);
            updateTags(getTags());
            updateFilter(getMatchedElements());
        });
    }
}
