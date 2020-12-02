(function() {
	var colors = {
		secondary: '#ed4e7c',
		primary: '#36e2be'
	}
	
	function ready(fn) {
		if (document.readyState != 'loading'){
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	ready(function() {
		var data = {
			labels: ['Intusion Prevention', 'Bug Detection', 'Computer Forensics', 'Network Security', 'Code Retirement'],
			datasets: [
				{
					data: [90, 70, 50, 35, 80],
					fillColor: 'transparent',
					strokeColor: colors.secondary,
					pointColor: colors.secondary
				}
			]
		};

		var radarOpts = {
			pointLabelFontFamily: "'Roboto Condensed', 'Roboto', sans-serif",
			pointLabelFontStyle: '300',
			pointLabelFontSize: 14,
			pointLabelFontColor: 'white',
			pointDotRadius: 4,
			angleLineColor: 'rgba(255,255,255,0.1)',
			scaleLineColor: 'rgba(255,255,255,0.1)',
			scaleOverride: true,
			scaleSteps: 2,
			scaleStepWidth: 50,
			showTooltips: false
		};

		var ctx = document.getElementById("skills-radar").getContext("2d");
		var radar = new Chart(ctx).Radar(data, radarOpts);
	});
})();