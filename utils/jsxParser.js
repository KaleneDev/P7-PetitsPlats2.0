export default function jsxParser(strings, ...values) {
    const template = document.createElement("template");
    let htmlString = strings[0];

    values.forEach((value, index) => {
        if (value instanceof HTMLElement) {
            // Créer un identifiant unique pour le placeholder
            const placeholderId = `jsx-placeholder-${index}`;
            htmlString += `<span id="${placeholderId}"></span>`;
            htmlString += strings[index + 1];

            // Ajouter le contenu dans le template
            template.innerHTML = htmlString.trim();

            // Remplacer immédiatement le placeholder par l'élément DOM
            const placeholder = template.content.querySelector(`#${placeholderId}`);
            if (placeholder) {
                placeholder.replaceWith(value);
            }

            // Remettre à jour la chaîne HTML avec le nouveau contenu du template
            htmlString = template.innerHTML;
        } else {
            htmlString += value;
            htmlString += strings[index + 1];
        }
    });
    
    // Mettre à jour le contenu du template une dernière fois
    template.innerHTML = htmlString.trim();

    return template.content.firstChild;
}