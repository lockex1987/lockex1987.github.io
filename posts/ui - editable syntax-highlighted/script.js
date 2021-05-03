// https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
function update(text) {
  let result_element = document.querySelector("#highlighting-content");
  // Update code
  result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
  // Syntax Highlight
  Prism.highlightElement(result_element);
}

function sync_scroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector("#highlighting");
  // Get and set x and y
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
  let code = element.value;
  if(event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionEnd + 2; // after tab placed, where cursor moves to - 2 for 2 spaces
    element.value = before_tab + "  " + after_tab; // add tab char - 2 spaces
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
  }
}