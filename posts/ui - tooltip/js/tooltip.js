document.addEventListener('mousemove', (evt) => {
    const div = evt.target;
    if (div.classList.contains('tooltip-follow-mouse') && div.classList.contains('tooltip-container')) {
        // console.log(div.className);
        const tooltip = div.querySelector('.tooltip');
        if (tooltip) {
            const containerRect = div.getBoundingClientRect();
            const xOffset = 10;
            const yOffset = 20;
            tooltip.style.top = (evt.clientY - containerRect.top - xOffset) + 'px';
            tooltip.style.left = (evt.clientX - containerRect.left + yOffset) + 'px';
        }
    }
});
