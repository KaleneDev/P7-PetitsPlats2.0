// utils/jsxParser.js

export default function jsxParser(strings, ...values) {
    const htmlString = strings.reduce((result, string, i) => {
        const value = values[i] ? values[i] : '';
        return result + string + value;
    }, '');

    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
}
