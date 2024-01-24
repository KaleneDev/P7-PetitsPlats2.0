// components/HeaderComponent.js
import jsxParser from "../utils/jsxParser.js";
import { SearchBarComponent } from "./SearchBar.js";

export function HeaderComponent() {
    return jsxParser/*html*/ `
        <header class="site-header">
            <div class="site-header__wrapper">
                <div class="site-header__background"></div>
                <div class="site-header__logo">
                    <img src="assets/images/logo.png" alt="logo" />                                                              
                </div>
                <div class="site-header__title">
                    <h1>CHERCHEZ PARMI PLUS DE 1500 RECETTES </br>
                    DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES</h1>
                </div>
                
                ${SearchBarComponent()}
            </div>
        </header>
    `;
}
