// components/RecipeListComponent.js

export function RecipeListComponent(recipes) {
    const list = document.createElement("div");
    list.className = "recipe-list";
    console.log(recipes);
    recipes.forEach((recipe) => {
        const item = document.createElement("div");
        item.className = "recipe";
        item.textContent = recipe.name;
        // Ajoutez plus de détails de la recette ici
        list.appendChild(item);
    });

    return list;
}
