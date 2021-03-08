function runSanitizer() {
    const parser = new HtmlWhitelistedSanitizer(true);
    const sanitizedHtml = parser.sanitizeString(input.value);
    output_as_string.textContent = sanitizedHtml;
    // output_as_node.innerHTML = sanitizedHtml;
}
