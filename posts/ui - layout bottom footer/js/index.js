document.querySelector('#add').addEventListener('click', () => {
  var mainContent = document.querySelector('main');
  var newContent = document.createElement('p');
  newContent.textContent = 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. '.repeat(3);
  mainContent.appendChild(newContent);
});
