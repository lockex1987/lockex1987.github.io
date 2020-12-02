// Setup
const items = document.querySelectorAll('.sequence__keys__item');
const sequence = ['a', '2', 'k', '5', 'v'];
let pressed = [];
let counter = 0;

// Listen for keyboard inputs
window.addEventListener('keyup', checkSequence);

// Check the key sequence
function checkSequence(e) {
  // if letter and position are right
  if (e.key.toLowerCase() == sequence[counter]) {
    sequenceBuilder(e);
  } else {
    resetSequence();
    displayMessage();
  }
}

// Track sequence's progress
function sequenceBuilder(e) {
  // Show progress on items
  items[counter].classList.add('active');
  // Update the sequence
  pressed.push(e.key.toLowerCase());
  counter++;

  // if the sequence is complete
  if (pressed.join('').includes(sequence.join(''))) {
    completedSequence();
  }
}

// Sequence reset
function resetSequence() {
  // Reset the sequence
  pressed = [];
  counter = 0;
  // Clear progress on items
  items.forEach(item => item.classList.remove('active'));
}

// Display reset message
function displayMessage() {
  var message = document.querySelector('.sequence__message');
  message.classList.add('active');
  setTimeout(() => message.classList.remove('active'), 2000);
}

// Display Easter-egg on completed sequence
function completedSequence() {
  document.querySelector('.easter-egg').classList.add('active');
}

// One more time!
document.querySelector('.easter-egg__close').addEventListener('click', () => {
  resetSequence();
  document.querySelector('.easter-egg').classList.remove('active');
});
