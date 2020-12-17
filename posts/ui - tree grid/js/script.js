
// Danh sách dữ liệu ban đầu có thể sắp xếp theo danh sách bắt kỳ
let data = [
    { id: 2, parentId: 1, level: 2, name: 'Châu Âu' },
    { id: 7, parentId: 6, level: 5, name: 'Văn Giang' },
    { id: 3, parentId: 1, level: 2, name: 'Châu Á' },
    { id: 8, parentId: 2, level: 3, name: 'Italia' },
    { id: 1, parentId: 0, level: 1, name: 'Thế giới' },
    { id: 6, parentId: 5, level: 4, name: 'Hưng Yên' },
    { id: 5, parentId: 3, level: 3, name: 'Việt Nam' },
    { id: 4, parentId: 3, level: 3, name: 'Nhật Bản' },
];

let buildHtmlCodeOfRow = (e) => {
    return `
            <tr class="treegrid__row" data-id="${e.id}" data-parent="${e.parentId}" data-level="${e.level}">
                <td data-column="name">${e.name}</td>
                <td>Additional info</td>
            </tr>`;
};

let html = bindTreeGrid(data, buildHtmlCodeOfRow);

document.querySelector('#tree-table').innerHTML = html;

initTreeGrid(document.querySelector('#tree-table'));
