var fragment = document.createDocumentFragment();
    data.forEach((p, idx) => {
        var item = document.createElement('figure');
        item.innerHTML = `
            <img src="${p.url.replace('t=q', 't=w')}">
			
			<figcaption>
				${p.title}
			</figcaption>`;
        fragment.appendChild(item);
    });

    var listElm = document.querySelector(".list");
    listElm.appendChild(fragment);