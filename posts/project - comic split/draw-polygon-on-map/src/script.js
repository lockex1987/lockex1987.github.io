var mymap;
var circle;
var poly;
var polygon;
var marker;
var arrayOfLatLngs = [];
$(document).ready(function() {
  mymap = L.map('mapid').setView([41.998284, 13.004637], 6);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,		
		id: 'mapbox.streets'
	}).addTo(mymap);
  mymap.pm.setLang('it');
  mymap.pm.addControls({position: 'topleft', drawCircleMarker:false, drawPolyline:false, cutPolygon:false, drawRectangle:false});
  
  var homeMarker = L.AwesomeMarkers.icon({prefix: 'fa', icon: 'fa-house-damage', markerColor: 'green'});
  var houseMarker = L.AwesomeMarkers.icon({prefix: 'fa', icon: 'fa-home', markerColor: 'blue'});
  
  $('.refreshmap').on('click', function(e){
    e.preventDefault();
    var lat = parseFloat($('#latitudine').val()) || 41.998284;
    var lng = parseFloat($('#longitudine').val()) || 13.004637;
    var raggio = parseFloat($('#raggio').val());
    var poly = $('#poly').val();
    if (marker) {mymap.removeLayer(marker);}
    if (polygon) {mymap.removeLayer(polygon);}
    if (circle) {mymap.removeLayer(circle);}
    
    if ((lat != '') && (lng != '')) {
      mymap.flyTo([lat, lng], 6);
      marker = L.marker([lat, lng], {icon: homeMarker}).addTo(mymap);
    }
    if (poly != '') {
      var punti = poly.split(',');
      arrayOfLatLngs = [];      
      $.each(punti, function(id, elem){
				var plat  = elem.split(' ')[0];
				var plng  = elem.split(' ')[1];
				arrayOfLatLngs.push(L.latLng([plat, plng]));
        if (punti.length > 2) {
				  L.marker([plat, plng]);
        } else {
          L.marker([plat, plng], {icon: houseMarker}).addTo(mymap);
        }
			});
      if (punti.length > 2) {
        polygon = L.polygon(arrayOfLatLngs, {color: 'blue'}).addTo(mymap);
        mymap.fitBounds(arrayOfLatLngs);
      }      
    }
    if (raggio > 0) {      
      circle = L.circle([lat, lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: raggio
      }).addTo(mymap);
      mymap.fitBounds(circle.getBounds());
    }
    //mymap.pm.enableGlobalEditMode();
  });
  
  $('.resetmap').on('click', function(e){
    e.preventDefault();
    $('#latitudine, #longitudine, #raggio, #poly').val('');
    
  });
  
  mymap.on('pm:create', e => {
    console.log ('create %o', e);
    if (e.shape == "Polygon") {
      var latlng = '';
      $(e.layer._latlngs[0]).each(function (id, el) {
        latlng += ((id == 0) ? '' : ',') + el.lat + ' ' + el.lng;
      });
      latlng += ',' + e.layer._latlngs[0][0].lat + ' ' + e.layer._latlngs[0][0].lng;
      $('#poly').val(latlng);
    }
    if (e.shape == "Circle") {
      $('#latitudine').val(e.layer._latlng.lat);
      $('#longitudine').val(e.layer._latlng.lng);
      $('#raggio').val(e.layer._mRadius);
    }
    if (e.shape == "Marker") {
      $('#latitudine').val(e.marker._latlng.lat);
      $('#longitudine').val(e.marker._latlng.lng);
    }
    
  });
  
  
})