function addZero(n) {
	return (n < 10) ? ('0' + n) : n;
}

function openVolume(volIdx) {
	var chapters = document.querySelectorAll('.chapters');
	chapters.forEach(c => c.style.display = 'none');
	chapters[volIdx].style.display = 'block';
}

function bindVolumes() {
	var chapterNo = 1;
	var html = `
		${volumes.map((chapters, volIdx) =>
			`
			<div class="item" onclick="openVolume(${volIdx})">
				<div class="no">
					${addZero(volIdx + 1)}
				</div>
				<div class="chapters" style="display: none">
					<ul>
						${chapters.map(chap =>
						`
						<li>${chapterNo++}. ${chap}</li>
						`
						).join('')}
					</ul>
				</div>
				<div class="cover">
					<img src="images/${addZero(volIdx + 1)}.jpg"/>
				</div>
			</div>
			`
		).join('')}`;

	document.querySelector('#display').innerHTML = html;
}

bindVolumes();