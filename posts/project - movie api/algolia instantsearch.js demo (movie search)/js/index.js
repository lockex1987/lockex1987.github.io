var search = instantsearch({
  appId: 'latency',
  apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  indexName: 'movies' });


search.addWidget(
instantsearch.widgets.searchBox({
  container: '#search-box',
  placeholder: 'Search for movies',
  autofocus: false }));



search.addWidget(
instantsearch.widgets.stats({
  container: '#stats' }));



var hitTemplate = document.getElementById('movie').innerHTML;

search.addWidget(
instantsearch.widgets.hits({
  container: '#hits',
  hitsPerPage: 12,
  templates: {
    item: hitTemplate },

  transformData: function transformData(hit) {
    hit.stars = [];
    for (var i = 1; i <= 5; ++i) {
      hit.stars.push(i <= hit.rating);
    }
    return hit;
  } }));



search.addWidget(
instantsearch.widgets.pagination({
  container: '#pagination' }));



search.addWidget(
instantsearch.widgets.refinementList({
  container: '#genres',
  attributeName: 'genre',
  operator: 'and',
  limit: 10 }));



search.addWidget(
instantsearch.widgets.starRating({
  container: '#ratings',
  attributeName: 'rating' }));



search.addWidget(
instantsearch.widgets.rangeSlider({
  container: '#year',
  attributeName: 'year',
  tooltips: {
    format: function format(v) {return v && v.toLocaleString();} } }));




search.start();