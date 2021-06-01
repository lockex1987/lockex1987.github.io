function playit_onload() {
    let preval = '';
    preval = document.getElementById('preselectedValue').value;
    if (preval != '') {
        change_position(preval);
        const x = document.getElementsByTagName('input');
        const l = x.length;
        for (i = 0; i < l; i++) {
            if (x[i].value == preval) {
                x[i].checked = true;
            }
        }
        document.getElementById('container').style.display = 'block';
    }
}

function click_position(obj) {
    change_position(obj.value);
}

function change_position(val) {
    let s = 'demoDIV';

    s = 'myDIV ';
    s = s.trim();

    document.getElementById(s).style.backgroundBlendMode = val;

    const x = "background-blend-mode:<span id='enlargecssprop'>" + val + '</span>';
    const y = "#myDIV {<br>    width: 200px;<br>    height: 200px;<br>    background-size: 200px 200px;<br>    background-repeat: no-repeat;<br>    background-image: linear-gradient(to right, black 0%,white 100%), url('w3css.gif');<br>    ###CSSPROP###;<br>}<br>";
    const z = y.replace('###CSSPROP###', x);

    document.getElementById('styleDIV').innerHTML = z;
}

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

playit_onload();
