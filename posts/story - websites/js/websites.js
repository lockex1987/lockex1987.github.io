// Hien thi danh sach website
function displayWebsites() {
    // Lấy ngày trong tuần (0 là Chủ Nhật, 1 là thứ Hai,..., 6 là thứ Bảy)
    // const currentTime = new Date();
    // const dayOfWeek = currentTime.getDay();

    fetch('data/websites.json')
        .then(resp => resp.json())
        .then(a => {
            // Sắp xếp theo tên
            // a.sort((x1, x2) => x1.name.localeCompare(x2.name));

            // Remove disabled websites
            for (let i = a.length - 1; i >= 0; i--) {
                // Nếu disable rồi thì bỏ qua
                /*
                if (a[i].disabled) {
                    a.splice(i, 1);
                    continue;
                }
                */

                // Nếu có chỉ định ngày và không chứa ngày hiện tại
                /*
                if (a[i].day && a[i].day.indexOf(dayOfWeek) < 0) {
                    a.splice(i, 1);
                    continue;
                }
                */
            }

            const html = `
                    ${a.map(w => `
                        <div class="py-1 col-md-4 col-xl-3">
                            <img src="${w.icon ? w.icon : 'images/default.png'}"
                                    class="mr-3"
                                    style="width: 1rem; height: 1rem;"/>
                            <a href="${w.url}" target="_blank">
                                ${w.name}
                            </a>
                        </div>
                    `).join('')}`;
            document.querySelector('#websites').innerHTML = html;
        });
}

displayWebsites();
