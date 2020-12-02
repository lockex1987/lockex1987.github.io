function tctResetForm(formId) {
	var formObject = document.getElementById(formId);
	var formElements = formObject.elements;
	for (var i = 0; i < formElements.length; i++) {
		var e = formElements[i];
		if (e.type !== undefined) {
			var fieldType = e.type.toLowerCase();
			switch (fieldType) {
				case "text":
				case "password":
				case "textarea":
				case "hidden":
				case "file":
					e.value = "";
					break;
				case "radio":
				case "checkbox":
					if (e.checked) {
						e.checked = false;
					}
					break;
				case "select-one":
				case "select-multi":
					e.selectedIndex = 0;
					break;
				default:
					break;
			}
		}
	}
}

function tctFocusFirstElement(frmId) {
	var formElements = document.getElementById(frmId).elements;
	for (var i = 0; i < formElements.length; i++) {
		var e = formElements[i];
		if (e.type !== undefined) {
			var fieldType = e.type.toLowerCase();
			if ((fieldType === "text") || (fieldType === "select-one") || (fieldType === "file")) {
				e.focus();
				break;
			}
		}
	}
}
