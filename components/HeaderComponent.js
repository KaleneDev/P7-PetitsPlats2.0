// uiManager.js ou HeaderComponent.js

export function HeaderComponent() {
    const header = document.createElement('header');
    header.className = 'site-header';

    const logo = document.createElement('h1');
    logo.textContent = "title";
    header.appendChild(logo);

    // Ajouter d'autres éléments au header si nécessaire
    // Par exemple, un menu de navigation, des boutons, etc.

    return header;
}
