const datatable = new Datatable({
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
    data: serverData
});


document.querySelector('#getSelectedButton').addEventListener('click', () => {
    const selectedRows = datatable.getSelectedRows();
    alert(JSON.stringify(selectedRows));
});
