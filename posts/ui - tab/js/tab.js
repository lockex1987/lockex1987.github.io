function openTab(evt, cityName) {
  document.querySelectorAll('.tab-content, .tab-link').forEach(function(tc) {
      tc.classList.remove('active');
  });
  document.querySelector('#' + cityName).classList.add('active');
  evt.currentTarget.classList.add('active');
}