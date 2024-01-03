// utils/jsxParser.js

export default function jsxParser(strings, ...values) {
  const template = document.createElement("template");
  let htmlString = strings[0];
  values.forEach((value, index) => {
    if (value instanceof HTMLElement) {
      htmlString += `<${value.tagName} class="${Array.from(
        value.classList
      ).join(" ")}" ${value.id ? 'id="' + value.id + '"' : ""}>${
        value.innerHTML
      }</${value.tagName}>`;
    } else {
      htmlString += value;
    }
    htmlString += strings[index + 1];
  });
  template.innerHTML = htmlString.trim();
  return template.content.firstChild;
}
