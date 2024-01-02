// utils/jsxParser.js

export default function jsxParser(strings, ...values) {
    const template = document.createElement('template');
    let htmlString = strings[0];

    values.forEach((value, index) => {
        if (value instanceof HTMLElement) {
            htmlString += `<span id="jsx-placeholder-${index}"></span>`;
        } else {
            htmlString += value;
        }
        htmlString += strings[index + 1];
    });

    template.innerHTML = htmlString.trim();

    values.forEach((value, index) => {
        if (value instanceof HTMLElement) {
            const placeholder = template.content.querySelector(`#jsx-placeholder-${index}`);
            if (placeholder) {
                placeholder.replaceWith(value);
            }
        }
    });

    return template.content.firstChild;
}
