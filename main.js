// Importation des modules nécessaires pour la gestion des données, l'interface utilisateur et la barre de recherche
import {
    initData,
    getRecipeList,
    displayNumberOfRecipes,
} from "./utils/dataManager.js";
import { AppComponent } from "./components/App.js";
import { setupSearchInput } from "./components/SearchBar.js";
import { runPerformanceTests } from "./utils/testPerformance.js";

// Fonction asynchrone init() pour initialiser l'application
async function init() {
    try {
        // Sélection de l'élément principal du DOM où l'application sera injectée
        const main = document.querySelector("#main");

        // Initialisation des données (pourrait inclure le chargement à partir d'une API ou d'une base de données locale)
        await initData();

        // Récupération de la liste complète des recettes
        const allRecipes = await getRecipeList();

        // Création du composant principal de l'application et ajout au DOM
        const app = AppComponent(allRecipes);
        main.appendChild(app);

        // Configuration de la barre de recherche
        setupSearchInput();

        // Affichage du nombre total de recettes disponibles
        displayNumberOfRecipes(allRecipes.length);

        runPerformanceTests();
   
    } catch (error) {
        console.error(
            "Erreur lors de l'initialisation de l'application :",
            error
        );
    }
}

init();
