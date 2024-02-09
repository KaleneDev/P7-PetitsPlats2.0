import jsxParser from "../utils/jsxParser.js";

function generateTagsList(tags, className) {
  return tags
    .map((tag) => /*html*/ {
        const isActive = !!document.querySelector('.tags .tag[data-tag="' + tag + '"]');
        const myClassname = `${className} ${isActive ? 'active' : ''}`
      return `
        <li class="tag ${myClassname}" data-tag="${tag}">
            ${tag}
            ${isActive ? '<span class="icon-circle-xmark close-tag"></span>' : ''}
        </li>

    `;
    })
    .join("");
}

export function FilterComponent(tags) {
  const tagsHtml = jsxParser/*html*/ `
        <div class="filter-list">
            <div class="filter">
                <div class="filter__container">
                    <span class="filter__list__title">Ingrédients <span class="icon-chevron-down"></span></span>
                    <ul class="ingredient filter__list">
                        <input type="text"  class="filter__input" placeholder="Rechercher un ingrédient"/>
                        ${generateTagsList(tags.ingredients, "ingredient")}
                    </ul> 
                </div>
                <div class="filter__container">
                    <span class="filter__list__title">Appareils <span class="icon-chevron-down"></span></span>
                    <ul class="appliance filter__list">
                        <input type="text"  class="filter__input" placeholder="Rechercher un Appareil"/>
                        ${generateTagsList(tags.appliances, "appliance")}
                    </ul>
                </div>
                <div class="filter__container">
                    <span class="filter__list__title">Ustensiles <span class="icon-chevron-down"></span></span>
                    <ul class="ustensil filter__list">
                        <input type="text"  class="filter__input" placeholder="Rechercher un ustensile"/>
                        ${generateTagsList(tags.ustensils, "ustensil")}
                    </ul>
                </div>
            </div>
        </div>
    `;

  return tagsHtml;
}
