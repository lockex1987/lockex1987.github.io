const datatable = new Datatable({
    table: document.querySelector('#myTable'),
    rowTemplate: (dataEle) => {
        return `
                 <tr>
                     <td class="text-right">
                         ${dataEle.stt}
                     </td>
                     <td>
                         ${CommonUtils.escapeHtml(dataEle.country)}
                     </td>
                     <td class="text-right">
                         ${CommonUtils.formatThousands(dataEle.population)}
                     </td>
                     <td class="text-center">
                         ${CommonUtils.normalizeDate(dataEle.fake_date)}
                     </td>
                 </tr>`;
    },

    startSearchCallback: () => {
        document.querySelector('#searchBtn span').style.display = '';
    },

    finishSearchCallback: () => {
        document.querySelector('#searchBtn span').style.display = 'none';
    },

    ajax: (page, pageSize, sortColumn, sortDirection) => {
        const url = 'search.php?page=' + page
            + '&pageSize=' + pageSize
            + '&orderBy=' + sortColumn
            + '&orderType=' + sortDirection
            + '&search=' + encodeURIComponent(document.querySelector('#search').value.trim());
        return fetch(url)
            .then(resp => resp.json());
    },

    getTotalAndData: (resp) => {
        return {
            total: resp['total_x'],
            data: resp['data_x']
        };
    },

    showLoading: true
});

/**
 * Khi người dùng thêm / sửa / xóa xong thì tìm kiếm lại.
 * Khi người dùng nhập cũng tìm kiếm lại.
 */
document.querySelector('#searchBtn').addEventListener('click', function () {
    datatable.reload();
});


document.querySelector('#search').addEventListener('input', () => {
    // Nên thêm debounce ở đây
    // datatable.reload();
});
