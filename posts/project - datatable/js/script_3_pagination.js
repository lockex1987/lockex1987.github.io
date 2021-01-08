import serverData from './mock_data.js';

new Datatable({
    table: '#myTable',
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
    data: serverData,
    paginationPosition: 'above', // bellow
    paginationSize: 20
});
