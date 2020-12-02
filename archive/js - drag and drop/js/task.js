// Dữ liệu
const data = JSON.parse(localStorage.getItem('taskData')) || {};

// Các trạng thái của công việc
const codes = {
	'1': '#pending',
	'2': '#inProgress',
	'3': '#completed'
};

/**
 * Khởi tạo.
 */
function initTask() {
	// Hiển thị dữ liệu cũ
	Object.values(data).forEach(params => generateElement(params));

	// Thêm sự kiện drop vào mỗi mục chứa (Pending, In progress, Completed)
	for (let index in codes) {
		const value = codes[index];

		const zone = document.querySelector(value);

		setupHighlightDropZone(zone);

		zone.addEventListener('drop', evt => {
			evt.preventDefault();

			const cssId = evt.dataTransfer.getData('domId');

			// Có thể người dùng drop một file nào đó
			// không phải drop một DOM công việc
			if (!cssId) {
				return;
			}

			const id = cssId.replace('task-', '');
			const object = data[id];			

			if (object.code != index) {
				// Changing object code
				object.code = index;

				const dom = document.getElementById(cssId);
				zone.appendChild(dom);

				// Update local storage
				data[id] = object;
				localStorage.setItem('taskData', JSON.stringify(data));
			}
		});
	}
}

/**
 * Thêm thẻ div tương ứng với task.
 * @param {*} params 
 */
function generateElement(params) {
	// Xác định vùng chứa (Pending, In progress, Completed)
	const parent = document.querySelector(codes[params.code]);
	if (!parent) {
		return;
	}

	// Tạo các thẻ div
	const dragItem = CommonUtils.create({
		tag: 'div',
		className: 'task-wrapper bg-white p-2 my-2 mx-3 border rounded',
		id: 'task-' + params.id,
		children: [
			CommonUtils.create({
				tag: 'div',
				textContent: params.title
			})
		]
	});
	parent.appendChild(dragItem);

	// Gắn sự kiện drag
	dragItem.setAttribute('draggable', true);

	// Highlight đối tượng được drag
	const classDragItemActive = 'drag-item--active';
	dragItem.addEventListener('dragstart', (evt) => {
		dragItem.classList.add(classDragItemActive);
		evt.dataTransfer.setData('domId', dragItem.id);
	});
	dragItem.addEventListener('dragend', () => {
		dragItem.classList.remove(classDragItemActive);

		// Highlight thêm mới
		/*
		const classHighlight = 'bg-info';
		const oldBackgroundClass = 'bg-white';
		setTimeout(() => {
			dragItem.classList.remove(oldBackgroundClass);
			dragItem.classList.add(classHighlight);
			setTimeout(() => {
				dragItem.classList.remove(classHighlight);
				dragItem.classList.add(oldBackgroundClass);
			}, 600);
		}, 100);
		*/
	});
}

/**
 * Remove task div.
 * @param {Object} params 
 */
function removeElement(params) {
	document.querySelector('#task-' + params.id).remove();
}

/**
 * Thêm task.
 */
function addTask() {
	const inputs = document.querySelectorAll('.task-form input, .task-form textarea');

	const title = inputs[0].value;

	if (!title) {
		alert('Tiêu đề không thể rỗng');
		return;
	}

	// ID ngẫu nhiên là timestamp
	const id = new Date().getTime();
	const params = {
		id,
		code: '1', // trạng thái pending
		title
	};

	// Lưu đối tượng vào local storage
	data[id] = params;
	localStorage.setItem('taskData', JSON.stringify(data));

	// Tạo thẻ div
	generateElement(params);

	// Reset form
	inputs[0].value = '';
}


initTask();
