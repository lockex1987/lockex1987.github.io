var img;

var blur = 0;
var brightness = 100;
var contrast = 100;
var grayscale = 0;
var hueRotate = 0;
var invert = 0;
var opacity = 100;
var saturate = 100;
var sepia = 0;

$(document).ready(function() {
    $('.control').on('change', update);
});

function update() {
    $(this).parent().find('.filter-value').html( $(this).val() );

    blur = $('#blur').val();
    brightness = $('#brightness').val();
    contrast = $('#contrast').val();
    grayscale = $('#grayscale').val();
    hueRotate = $('#hue-rotate').val();
    invert = $('#invert').val();
    opacity = $('#opacity').val();
    saturate = $('#saturate').val();
    sepia = $('#sepia').val();

    $('img').css('filter', 'blur('+blur+'px) brightness('+brightness+'%) contrast('+contrast+'%) grayscale('+grayscale+'%) hue-rotate('+hueRotate+'deg) invert('+invert+'%) opacity('+opacity+'%) saturate('+saturate+'%) sepia('+sepia+'%)');
}

function reset() {
    $('.filter-value').html('');

    blur = 0;
    brightness = 100;
    contrast = 100;
    grayscale = 0;
    hueRotate = 0;
    invert = 0;
    opacity = 100;
    saturate = 100;
    sepia = 0;

    $('#blur').val(blur);
    $('#brightness').val(brightness);
    $('#contrast').val(contrast);
    $('#grayscale').val(grayscale);
    $('#hue-rotate').val(hueRotate);
    $('#invert').val(invert);
    $('#opacity').val(opacity);
    $('#saturate').val(saturate);
    $('#sepia').val(sepia);

    $('img').css('filter', 'blur('+blur+'px) brightness('+brightness+'%) contrast('+contrast+'%) grayscale('+grayscale+'%) hue-rotate('+hueRotate+'deg) invert('+invert+'%) opacity('+opacity+'%) saturate('+saturate+'%) sepia('+sepia+'%)');
}