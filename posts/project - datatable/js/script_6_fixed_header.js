const datatable = new Datatable({
    table: '#myTable',
    rowTemplate: (dataEle) => {
        return `
                <tr>
                    <!--td class="text-right">
                        ${dataEle.stt}
                    </td-->
                    <td class="sticky-cell">
                        ${CommonUtils.escapeHtml(dataEle.country)}
                    </td>
                    <td class="text-right">
                        ${CommonUtils.formatThousands(dataEle.population)}
                    </td>
                    <td class="text-center">
                        ${CommonUtils.normalizeDate(dataEle.fake_date)}
                    </td>

                    <td>Column one</td>
                    <td>Column two</td>
                    <td>Column three</td>
                    <td>Column four</td>
                    <td>Column firve</td>
                    <td>Column six</td>
                    <td>Column seven</td>
                    <td>Column eight</td>
                </tr>`;
    },
    data: serverData
});
