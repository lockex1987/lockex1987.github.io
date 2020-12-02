function format1(n) {
    return n.toFixed(2).replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
    });
}

/**
 The idea behind this solution is replacing matched sections with first match and comma, i.e. '$&,'.
 The matching is done using lookahead approach.
 You may read the expression as "match a number if it is followed by a sequence of three number sets (one or more) and a dot".
 */
function format2(n) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function format3(n, currency) {
    return new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: currency
    }).format(n);
}

function format4(n) {
    return n.toLocaleString('en-US');
}

function format5(n) {
    const parts = n.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

function separateThousands(n) {
    return format5(n);
}
