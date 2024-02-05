// components/AppComponent.js

import { HeaderComponent } from "./Header.js";
import { RecipeListComponent } from "./RecipeList.js";
import { FilterComponent } from "./Filter.js";
import { MainComponent } from "./Main.js";
import { getMatchedElements } from "../utils/SearchTags.js";
import { getRecipeList } from "../utils/dataManager.js";

export function AppComponent() {
    const app = document.createElement("div");
    app.className = "app-container";

    const header = HeaderComponent(getRecipeList());
    const main = MainComponent();

    const recipeList = RecipeListComponent(getRecipeList());
    const filter = FilterComponent(getMatchedElements());

    app.appendChild(header);
    app.appendChild(main);
    main.appendChild(filter);
    main.appendChild(recipeList);
  

    return app;
}
