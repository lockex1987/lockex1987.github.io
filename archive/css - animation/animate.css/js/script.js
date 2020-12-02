let sandbox = $('#animationSandbox');
let selectTag = $('#selectTag');
let btn = $('#btnExec');
let animationName;

function startAnimation() {
    animationName = selectTag.value;
    //sandbox.className = animationName + ' animated';
    sandbox.classList.add(animationName);
    sandbox.classList.add('animated');
}

function resetAnimation() {
    if (animationName) {
        sandbox.classList.remove(animationName);
    }
    sandbox.classList.remove('animated');
    //sandbox.className = '';
}

function listenToEvents() {
    btn.on('click', startAnimation);
    selectTag.on('change', startAnimation);
    sandbox.on('animationend', resetAnimation);
}

function bindSelectTag() {
    const GROUPS = [
        { label: 'Attention Seekers', items: ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello"] },
        { label: 'Bouncing Entrances', items: ["bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp"] },
        { label: 'Bouncing Exits', items: ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp'] },
        { label: 'Fading Entrances', items: ['fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig'] },
        { label: 'Fading Exits', items: ['fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig'] },
        { label: 'Flippers', items: ['flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY'] },
        { label: 'Lightspeed', items: ['lightSpeedIn', 'lightSpeedOut'] },
        { label: 'Rotating Entrances', items: ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight'] },
        { label: 'Rotating Exits', items: ['rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight'] },
        { label: 'Sliding Entrances', items: ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight'] },
        { label: 'Sliding Exits', items: ['slideOutUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight'] },
        { label: 'Zoom Entrances', items: ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp'] },
        { label: 'Zoom Exits', items: ['zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp'] },
        { label: 'Specials', items: ['hinge', 'jackInTheBox', 'rollIn', 'rollOut'] }
    ];

    GROUPS.forEach(g => {
        let optgroup = _.createElement('optgroup', {
            label: g.label
        });
        g.items.forEach(name => {
            optgroup.appendChild(_.createElement('option', {
                value: name,
                textContent: name
            }));
        });
        selectTag.appendChild(optgroup);
    });
}

bindSelectTag();
listenToEvents();
