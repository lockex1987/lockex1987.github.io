/**
 * Hiển thị giá trị của từng danh sách.
 * @param {Event} evt 
 */
function updateOutput(evt) {
    let list = evt.target;
    let id = list.id;
    let data = $(list).nestable('serialize');
    document.querySelector('#' + id + 'Output').innerHTML = JSON.stringify(data , null, 2); //
};

// Khởi tạo danh sách 1
$('#nestable1').nestable({ group: 1 })
        .on('change', updateOutput)
        .change();

// Khởi tạo danh sách 3
$('#nestable3').nestable();
