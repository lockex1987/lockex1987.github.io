// https://vi.wikipedia.org/wiki/%C4%90%C3%B4ng_Chu_li%E1%BB%87t_qu%E1%BB%91c
// http://sachnoiviet.com/sach-noi/1606/dong-chu-liet-quoc.html
// http://files.vixahoi.com/ThuVienSachNoi/VanHoc/NuocNgoai/DongChuLietQuoc/01.DongChuLietQuoc-Phan01.mp3
// http://files.vixahoi.com/ThuVienSachNoi/VanHoc/NuocNgoai/DongChuLietQuoc/107.DongChuLietQuoc-Phan107.mp3
// http://files.vixahoi.com/ThuVienSachNoi/VanHoc/NuocNgoai/DongChuLietQuoc/108.DongChuLietQuoc-Phan108_Het.mp3

const list = [...document.querySelectorAll('#mw-content-text ul li')].map(liTag => liTag.textContent);
JSON.stringify(list, null, 2);

list.map((s, idx) => `<li><a href="OEBPS/Text/Ch${(idx + 1).toString().padStart(3, '0')}.xhtml">${s}</a></li>`).join('\n');

list.map((s, idx) => `<navPoint id="navPoint-${idx + 3}" playOrder="${idx + 3}"><navLabel><text>${s}</text></navLabel><content src="Text/Ch${(idx + 1).toString().padStart(3, '0')}.xhtml"/></navPoint>`).join('\n');

JSON.stringify(list.map((s, idx) => ({ name: s.split(': ')[1], audio: `http://files.vixahoi.com/ThuVienSachNoi/VanHoc/NuocNgoai/DongChuLietQuoc/${(idx + 1).toString().padStart(2, '0')}.DongChuLietQuoc-Phan${(idx + 1).toString().padStart(2, '0')}.mp3` })), null, 4);
