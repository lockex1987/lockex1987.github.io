// https://archive.org/details/Hoi019ThanhHaPhiTaoThaoDungBinhLauBachMonLaBoTuyetMenh
// https://archive.org/details/hiep-khach-hanh/01.hiepKhachHanhtruyenaudio.net.mp3

const chapters = [];

document.querySelectorAll('#jw6__list .jwrowV2').forEach(div => {
    const name = div.querySelector('.ttl').textContent.trim().substring(8);
    const duration = div.querySelector('.tm').textContent.trim();
    chapters.push({ name, duration });
});

// #quickdown4, #quickdown5
document.querySelectorAll('#quickdown5 .format-file').forEach((div, idx) => {
    const audio = div.querySelector('a').href;
    const size = div.querySelector('.down-rite').textContent.trim();
    Object.assign(chapters[idx], { audio, size });
});

console.log(JSON.stringify(chapters, null, 2));






