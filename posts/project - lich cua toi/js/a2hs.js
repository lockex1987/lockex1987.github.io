let deferredPrompt;
const btnAdd = document.querySelector('#a2hsSection');

window.addEventListener('beforeinstallprompt', (evt) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    evt.preventDefault();

    // Stash the event so it can be triggered later
    deferredPrompt = evt;

    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'flex';
});

btnAdd.addEventListener('click', (evt) => {
    // Hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';

    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
});

window.addEventListener('appinstalled', (evt) => {
    console.log('Installed');
});

if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('display-mode is standalone');
}
