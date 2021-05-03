# Editable, syntax-highlighted code using z-indexes

A Pen created on CodePen.io. Original URL: [https://codepen.io/WebCoder49/pen/dyNyraq](https://codepen.io/WebCoder49/pen/dyNyraq).

This is the demo for [an article I wrote on CSS-Tricks](https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/) on how to use a conventional syntax-highlighting library to create an editable input for code that **supports syntax highlighting, and acts like a textarea**.

The `textarea`, almost completely transparent except for the `caret-color`, is positioned on top of the syntax-highlighted block using `z-indexes`, and the result is synchronised whenever the user enters code.

**Due to a suggestion in a comment to the article, I have created a custom element for this technique in [this Pen](https://codepen.io/WebCoder49/details/jOypJOx).**
