import { setupSearchInput } from "../components/SearchBar.js";
const searchTerms = [
    "pomme",
    "poisson",
    "tarte aux pommes",
    "carotte",
    "chocolat",
];
const repetitions = 1; // Nombre de fois que chaque terme sera recherché

export async function runPerformanceTests() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) {
        console.error("Search input not found");
        return;
    }

    for (let term of searchTerms) {
        let totalTime = 0; // Accumule le temps total pour le terme actuel
        for (let i = 0; i < repetitions; i++) {
            // Définit la valeur de l'input à chaque terme
            searchInput.value = term;

            // Crée et envoie un nouvel événement d'entrée pour simuler la saisie
            const event = new Event("input", {
                bubbles: true,
                cancelable: true,
            });

            const startTime = performance.now(); // Démarre le chronomètre
            searchInput.dispatchEvent(event);
            setupSearchInput();
            // Note : Cela suppose que le traitement de l'événement est synchrone.
            // Dans un cas réel, tu devrais attendre que la recherche soit vraiment finie (peut-être via une promesse).

            const endTime = performance.now(); // Arrête le chronomètre
            totalTime += endTime - startTime; // Accumule le temps total
        }

        const averageTime = totalTime / repetitions; // Calcule la moyenne du temps de recherche pour ce terme
        console.log(
            `Moyenne du temps pour '${term}' : ${averageTime.toFixed(
                2
            )} millisecondes.`
        );
    }
}
