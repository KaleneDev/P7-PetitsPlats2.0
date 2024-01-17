// main.js

import { initData, getAllRecipes } from "./utils/dataManager.js";
import { AppComponent } from "./components/App.js";
import { setupSearchInput } from "./components/SearchBar.js";


async function init() {
    const main = document.querySelector("#main");

    await initData();
    const allRecipes = await getAllRecipes();
    const app = AppComponent(allRecipes);

    main.appendChild(app);
    setupSearchInput();

}

init();
