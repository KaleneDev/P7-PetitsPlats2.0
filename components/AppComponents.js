// components/AppComponent.js

import { HeaderComponent } from './HeaderComponent.js';
import { RecipeListComponent } from './RecipeListComponent.js';

export function AppComponent(recipes) {
    const app = document.createElement('div');
    app.className = 'app-container';

    const header = HeaderComponent();
    const recipeList = RecipeListComponent(recipes);

    app.appendChild(header);
    app.appendChild(recipeList);

    return app;
}
