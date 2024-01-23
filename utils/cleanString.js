function cleanString(string) {
    // Conserve les lettres (y compris les lettres accentuées) et les espaces, exclut les chiffres
    return string.replace(/[^a-zA-Z\u00C0-\u00FF ]/g, "");
}

export default cleanString;
