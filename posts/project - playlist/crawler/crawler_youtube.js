/**
 * Lấy danh sách ở đây
    https://www.youtube.com/playlist?list=PLVOZ_45NZhu6LtmrQEfGhjxfS9jFimWYu

Phiên bản khác
    https://viblo.asia/p/cach-tao-1-web-nghe-nhac-don-gian-su-dung-youtube-api-cho-nguoi-khong-chuyen-maGK7pGeZj2
    https://github.com/nvquangth/search-video-youtube

Format dùng CSS hoặc cấu hình để ẩn những thông tin của YouTube

Player
    https://youtubevideoembed.com/#!
 */
const playlist = [];
document.querySelectorAll('ytd-playlist-video-renderer').forEach(div => {
    const image = div.querySelector('yt-img-shadow img').src;
    const duration = div.querySelector('.ytd-thumbnail-overlay-time-status-renderer').textContent.trim();
    const title = div.querySelector('#video-title').textContent.trim();
    playlist.push({
        title,
        duration,
        image
    });
});
console.log(JSON.stringify(playlist, null, 2));
