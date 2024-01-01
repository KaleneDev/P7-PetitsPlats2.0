// components/HeaderComponent.js
import jsxParser from "../utils/jsxParser.js";

export function HeaderComponent(recipes) {
    return jsxParser`
            <header class="site-header">
                <div class="site-header__logo">
                    <span class="site-header__logo__text">LES PETITS PLATS</span>                                                               
            </div>

            <h1>CHERCHEZ PARMI PLUS DE 1500 RECETTES </br>
            DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES</h1>

        </header>
    `;
}
