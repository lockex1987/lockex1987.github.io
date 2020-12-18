const { ipcRenderer } = require('electron');

/*
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// map multiple combinations to the same callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
    console.log('command k or control k')

    // return false to prevent default behavior and stop event from bubbling
    return false
})

// gmail style sequences
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', () => {
    console.log('konami code')
});
*/

// trigger file prompt
Mousetrap.bind('ctrl+o', () => {
    // Renderer gửi cho Main
    ipcRenderer.send('chooseFile');
});


// handle response
// Renderer lắng nghe kết quả từ Main
ipcRenderer.on('chosenFile', (evt, base64) => {
    document.querySelector('#theImage').src = 'data:image/jpg;base64,' + base64;
});
