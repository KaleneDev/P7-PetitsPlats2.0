// limiter le nombres de caractere dans la description fait une fonction 

function limiteDescription(description) { 
    if (description.length > 150) {
        return description.slice(0, 150) + "...";
    }
    return description;
}
 


export {limiteDescription} 
