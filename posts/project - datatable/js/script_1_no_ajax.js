import serverData from './mock_data.js';

function bindRow(dataEle) {
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
                    ${dataEle.fake_date}
                </td>
            </tr>`;
}

new Datatable({
    table: '#myTable',
    rowTemplate: bindRow,
    data: serverData,
    searchableProps: [
        'country'
    ]
});
