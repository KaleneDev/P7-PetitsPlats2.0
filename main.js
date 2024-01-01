// main.js

import { initData, getAllRecipes } from "./utils/dataManager.js";
import { AppComponent } from "./components/App.js";

async function init() {
    const main = document.querySelector("#main");

    initData();
    const recipes = await getAllRecipes();
    const app = AppComponent(recipes);

    main.appendChild(app);
}

init();
