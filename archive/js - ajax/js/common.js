/**
 * Lấy các tham số của form.
 * Các giá trị được encode.
 * @param {String} formId ID của form
 */
function getFormAsString(formId) {
    var formElement = document.getElementById(formId);
    return new URLSearchParams(new FormData(formElement)).toString();
}

/**
 * Lấy giá trị CRSF token.
 */
function getCsrfToken() {
    var metaTag = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.content : '';
}
