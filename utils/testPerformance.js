import { setupSearchInput } from "../components/SearchBar.js";


const searchTerms = ["pomme", "poisson", "tarte aux pommes", "carotte"];


export function runPerformanceTests() {
   searchTerms.forEach((term) => {
       const t0 = performance.now();
       setupSearchInput(term);
       const t1 = performance.now();
       console.log(
           `La recherche pour '${term}' a pris ${t1 - t0} millisecondes.`
       );
   });
}
