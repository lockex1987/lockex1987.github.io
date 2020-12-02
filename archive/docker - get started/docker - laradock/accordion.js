function toggleContent(h3, displayType) {
    var node = h3.nextElementSibling;
    while (node && ! ['h2', 'h3'].includes(node.tagName.toLowerCase())) {
        node.style.display = displayType;
        node = node.nextElementSibling;
    }
}

function addClickEvent() {
    document.addEventListener('click', function(event) {
        if (event.target.tagName.toLowerCase() == 'h3') {
            var h3 = event.target;
            if (h3.classList.contains('active')) {
                toggleContent(h3, 'none');
            } else {
                toggleContent(h3, 'block');
            }

            h3.classList.toggle('active');
        }
    });
}

function hideAll() {
    var headings = document.querySelectorAll('h3');
    headings.forEach(h3 => {
		if (h3.classList.contains('checked')) {
			h3.classList.add('active');
		} else {
			h3.classList.remove('active');
			toggleContent(h3, 'none');
		}
    });
}

function init() {
    addClickEvent();
    hideAll();
}

init();
