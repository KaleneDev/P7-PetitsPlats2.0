const searchTerms = ["pomme", "poisson", "tarte aux pommes", "carotte"];

export function runPerformanceTests() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) {
        console.error("Search input not found");
        return;
    }

    searchTerms.forEach((term) => {
        // Définit la valeur de l'input
        searchInput.value = term;

        // Crée un nouvel événement d'entrée
        const event = new Event("input", {
            bubbles: true, // L'événement remonte jusqu'aux ancêtres de l'élément
            cancelable: true,
        });

        // Envoie l'événement au champ de saisie
        searchInput.dispatchEvent(event);
    });
}
