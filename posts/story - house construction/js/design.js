$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

function toggleFurnitures(checkbox) {
    if (checkbox.checked) {
        $('.furniture').show();
    } else {
        $('.furniture').hide();
    }
}
