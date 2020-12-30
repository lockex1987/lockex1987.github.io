function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function describeArc(centerX, centerY, radius, startAngle, endAngle) {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);

    const largeArcFlag = (endAngle - startAngle <= 180) ? '0' : '1';

    const d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');

    return d;
}



function drawPercent(percent) {
    const endAngle = 180 * percent / 100;
    return describeArc(200, 200, 150, 0, endAngle);
}

document.getElementById('arc0').setAttribute('d', drawPercent(75));
document.getElementById('arc1').setAttribute('d', drawPercent(100));
document.getElementById('arc2').setAttribute('d', drawPercent(90));
