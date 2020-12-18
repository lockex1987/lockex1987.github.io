const targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

const targets = [
  { title:'Tokyo', latitude:35.652832, longitude:139.839478 },
  { title:'Osaka', latitude:34.6666667, longitude:135.5 },
  { title:'Kyoto', latitude:35, longitude:135.75 },
  { title:'Zao Fox village', latitude:38.040833, longitude:140.530349 }        
];

const map = {
  getMapData: function(country) {
    const _body = document.body,
          _script = document.createElement('script');
          
    let cleaner = function() {
      _body.removeChild(_script);
    }
    
    _script.onreadystatechange = function() {
      if(/^(complete|loaded)$/.test(this.readyState)) {
        this.onreadystatechange = null;
        cleaner();
      }
    }
    _script.onload = _script.onerror = cleaner;
    _script.src = 'https://www.amcharts.com/lib/3/maps/js/'+ country + '.js';
    
    _body.appendChild(_script);
  },
  getLines: function() {
    let _trace = [{
      "id": "line1",
      "arc": -0.5,
      "alpha": 0.3,
      "latitudes": [],
      "longitudes": []
    }];
    
    targets.map(function(item){
      _trace.map(function(line){
        line.latitudes.push(item.latitude);
        line.longitudes.push(item.longitude);
      });
    });
    
    return _trace;
  },
  getTargets: function() {
    let _targets = [];
    
    targets.map(function(item){
      let opt = Object.assign({}, item);
      _targets.push({ svgPath: targetSVG, label:item.title, title: item.title, latitude: item.latitude, longitude: item.longitude });
    });
    
    return _targets;
  },
  renderMap: function(mapData) {
    this.getMapData(mapData);
    const _images = this.getTargets(),
          _lines = this.getLines();
    
    
    let jmap = new AmCharts.makeChart( "mapContainer", {
      "type": "map",
      "theme": "light",
      "colorSteps": 10,
      "dataProvider": {
        "map": mapData,
        "getAreasFromMap": true,
        "zoomLevel": 0.9,
        "areas": [],
        "lines": _lines,
        "images": _images
      },
      "areasSettings": {
        "autoZoom": true,
        "balloonText": "[[title]]: <strong>[[value]]</strong>"
      },
      "zoomControl": {
        "minZoomLevel": 0.9
      },
      "titles": "Japan",
      "listeners": [ {
        "event": "init",
        "method": this.onMapInit
      } ]
    });
  },
  onMapInit: function(event) {
    document.querySelector('[title="Interactive JavaScript maps"]').style.display = 'none';
  }
};
function getTime(data) {
  const _now = new Date(),
        _output = document.querySelector('#time'),
        _template = '<div class="clock"><span class="clock--location">{location}</span><span class="clock--time">{time}</span></div>';
  let arr = [];
  data.map(function(location){
    let time = moment.tz(_now, location).format('LLLL');
    arr.push({ location: location, time: time });
  });
  _output.innerHTML = '';
  arr.map(function(item){
    _output.innerHTML += _template.replace(/\{(\w+)\}/g, function(_, name){ return item[name]; });
  }).join('\n');
  
  setTimeout(()=>{ getTime(['Israel','Japan']) }, 60000);
}

(function app(){
  getTime(['Israel','Japan']);
  map.renderMap("japanLow");
})();