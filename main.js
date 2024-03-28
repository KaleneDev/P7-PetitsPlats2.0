import {
    initData,
    getRecipeList,
    displayNumberOfRecipes,
} from "./utils/dataManager.js";
import { AppComponent } from "./components/App.js";
import { setupSearchInput } from "./components/SearchBar.js";
import { runPerformanceTests } from "./utils/testPerformance.js";
async function init() {
    const main = document.querySelector("#main");

    await initData();
    const allRecipes = await getRecipeList();
    const app = AppComponent(allRecipes);

    main.appendChild(app);

    setupSearchInput();
    displayNumberOfRecipes(allRecipes.length);
    runPerformanceTests();
}

init();
