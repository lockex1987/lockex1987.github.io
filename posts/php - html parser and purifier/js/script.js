document.querySelector('#sanitizeButton').addEventListener('click', () => {
    const sanitizer = new HtmlWhitelistedSanitizer(true);
    const sanitizedHtml = sanitizer.sanitizeString(document.querySelector('#inputHtml').value);
    document.querySelector('#outputAsString').textContent = sanitizedHtml;
    document.querySelector('#outputAsHtml').innerHTML = sanitizedHtml;
});
