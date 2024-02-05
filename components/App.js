// components/AppComponent.js

import { HeaderComponent } from "./Header.js";
import { RecipeListComponent } from "./RecipeList.js";
import { FilterComponent } from "./Filter.js";
import { MainComponent } from "./Main.js";
import { getMatchedElements } from "../utils/SearchTags.js";


export function AppComponent(recipes) {
    const app = document.createElement("div");
    app.className = "app-container";

    const header = HeaderComponent(recipes);
    const main = MainComponent();

    const recipeList = RecipeListComponent(recipes);
    const filter = FilterComponent(getMatchedElements(recipes));

    app.appendChild(header);
    app.appendChild(main);
    main.appendChild(filter);
    main.appendChild(recipeList);
  

    return app;
}
