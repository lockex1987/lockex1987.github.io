function runSanitizer() {
    var parser = new HtmlWhitelistedSanitizer(true);
    var sanitizedHtml = parser.sanitizeString(input.value);
    output_as_string.textContent = sanitizedHtml;
    //output_as_node.innerHTML = sanitizedHtml;
}
