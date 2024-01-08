// components/AppComponent.js

import { HeaderComponent } from "./Header.js";
import { RecipeListComponent } from "./RecipeList.js";

export function AppComponent(recipes) {
    const app = document.createElement("div");
    app.className = "app-container";

    const header = HeaderComponent(recipes);
    const recipeList = RecipeListComponent(recipes);

    app.appendChild(header);
    app.appendChild(recipeList);

    return app;
}
