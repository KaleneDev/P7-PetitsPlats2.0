// components/HeaderComponent.js
import jsxParser from "../utils/jsxParser.js";
import { SearchBarComponent } from "./searchBar.js";

export function HeaderComponent(recipes) {
    const title = 'CHERCHEZ PARMI PLUS DE 1500 RECETTES'
    const subtitle = 'DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES'
    return jsxParser`
        <header class="site-header">
            <div class="site-header__wrapper" data-tet="trucmuch">
                <div class="site-header__background"></div>
                <div class="site-header__logo">
                    <img src="assets/images/logo.png" alt="logo" />                                                              
                </div>
                <div class="site-header__title">
                    <h1> ${title}</br>
                    ${subtitle}
                    </h1>
                </div>
                ${SearchBarComponent()}
            </div>
        </header>
    `;
}
