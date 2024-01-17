// clean String injectée
function cleanString(string) {
    return string.replace(/[^a-zA-Z0-9]/g, "");
}

export default cleanString;