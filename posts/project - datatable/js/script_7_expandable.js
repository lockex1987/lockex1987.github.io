import serverData from './mock_data.js';

new Datatable({
    table: '#myTable',

    rowTemplate(dataEle) {
        return `
                <tr class="main-row expanded">
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
                        <!-- Mũi tên expander -->
                        <span class="table-expandable-arrow"></span>
                    </td>
                </tr>
                
                <!-- Mặc định ẩn dòng chi tiết -->
                <tr class="detail-row" style="display: none">
                    <td class="text-center" colspan="4">
                        ${CommonUtils.normalizeDate(dataEle.fake_date)}
                    </td>
                </tr>
                `;
    },
    data: serverData,
    searchableProps: [
        'country'
    ]
});
