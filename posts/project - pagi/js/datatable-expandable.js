import serverData from '../data/mock_data.js';

new Vue({
    el: '#app',

    data() {
        return {
            items: serverData.slice(0, 10)
        };
    }
});

/**
 * Thêm sự kiện click vào mũi tên để expand dòng nào đó.
 */
function handleClickExpandableArrow() {
    const table = document.querySelector('#app');
    if (table.classList.contains('table-expandable')) {
        table.addEventListener('click', (evt) => {
            const target = evt.target;
            if (target.classList.contains('table-expandable-arrow')) {
                const arrow = target;
                arrow.classList.toggle('expanded');

                const mainRow = arrow.closest('tr');
                const detailRow = mainRow.nextElementSibling;
                if (detailRow.style.display === 'none') {
                    detailRow.style.display = '';
                } else {
                    detailRow.style.display = 'none';
                }
            }
        });
    }
}

// Click vào mũi tên expand
handleClickExpandableArrow();
