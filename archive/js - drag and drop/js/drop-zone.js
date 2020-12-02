/**
 * Highlight vùng drop khi di chuyển chuột vào trong / ra ngoài.
 * @param {DOMNode} zone Vùng drop
 */
function setupHighlightDropZone(zone) {
    const highlightedClass = 'drop-zone--highlighted';

    // Highlight khi di chuyển vào
    zone.addEventListener('dragenter', () => {
		zone.classList.add(highlightedClass);
    });

    // Bỏ highlight khi di chuyển ra và drop
    zone.addEventListener('dragleave', () => {
        zone.classList.remove(highlightedClass);
    });

    zone.addEventListener('drop', () => {
        zone.classList.remove(highlightedClass);
    });

    // Phải gọi preventDefault() thì mới drop được
    zone.addEventListener('dragover', evt => {
        evt.preventDefault();
    });
}
