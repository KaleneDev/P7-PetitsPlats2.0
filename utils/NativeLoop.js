// Réimplémentation de map
Array.prototype.map = function (callback) {
    const arr = this; // Le tableau sur lequel la méthode `map` est appelée.
    const newArr = []; // Initialisation d'un nouveau tableau pour recueillir les résultats de l'application du callback.

    // Parcourt chaque élément du tableau original.
    for (let i = 0; i < arr.length; i++) {
        // Applique la fonction callback à chaque élément du tableau,
        // puis ajoute le résultat retourné par le callback au nouveau tableau.
        newArr.push(callback(arr[i]));
    }

    // Retourne le nouveau tableau qui contient les résultats
    // après l'application de la fonction callback sur chaque élément du tableau original.
    return newArr;
};

// Définit une méthode customFilter sur le prototype d'Array.
Array.prototype.filter = function (callback) {
    const resultArray = []; // Nouveau tableau pour stocker les éléments qui passent le test du callback.
    // Itère sur chaque élément du tableau.
    for (let i = 0; i < this.length; i++) {
        // Applique la fonction callback sur chaque élément.
        // Si la fonction callback retourne `true`, cela signifie que l'élément satisfait le critère,
        if (callback(this[i])) {
            resultArray.push(this[i]);
        }
    }

    // Retourne le tableau des éléments qui ont satisfait le critère défini par le callback.
    return resultArray;
};

// Redéfinit la méthode forEach sur le prototype d'Array.
Array.prototype.forEach = function (callback) {
    console.log(callback);
    // Itère sur chaque élément du tableau.
    for (let i = 0; i < this.length; i++) {
        // Exécute la fonction callback pour chaque élément du tableau,
        // passant l'élément, son indice, et le tableau complet comme arguments.
        callback(this[i], i, this);
    }
    // `forEach` n'a pas de valeur de retour ; son utilisation est pour les effets de bord.
};

// Définit une méthode customSome sur le prototype d'Array.
Array.prototype.some = function (callback) {
    // Itère sur chaque élément du tableau.
    for (let i = 0; i < this.length; i++) {
        // Si le callback retourne `true` pour au moins un élément du tableau,
        // `some` retourne immédiatement `true`.
        if (callback(this[i])) {
            return true;
        }
    }
    // Si aucun élément ne satisfait la condition du callback, retourne `false`.
    return false;
};

// Redéfinit la méthode every sur le prototype d'Array.
Array.prototype.every = function (callback) {
    // Itère sur chaque élément du tableau.
    for (let i = 0; i < this.length; i++) {
        // Si le callback retourne `false` pour au moins un élément,
        // `every` retourne immédiatement `false`.
        if (callback(this[i])) {
            return true;
        }
    }
    // Si tous les éléments satisfont la condition définie dans le callback, retourne `true`.
    return false;
};

// Ajoute une méthode 'includes' personnalisée au prototype d'Array,
Array.prototype.includes = function (element) {
    // Démarre une boucle pour itérer sur tous les éléments du tableau.
    for (let i = 0; i < this.length; i++) {
        // À chaque itération, vérifie si l'élément courant (this[i])
        // est strictement égal à l'élément recherché ('element').
        if (this[i] === element) {
            return true;
        }
    }
    // Si la boucle se termine sans trouver de correspondance
    return false;
};
