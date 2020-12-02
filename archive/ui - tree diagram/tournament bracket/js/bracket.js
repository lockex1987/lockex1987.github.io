// Have a zoom issue
// Don't know how to align images in the middle of a div
var bracket = (function() {

	var borderSize;
	var paddingLeftSize;
	var teamWidth;
	var teamHeight;
	var teamBorderColor;
	var connectWidth;
	var connectColor;
	var paddingHeight;

	// Configure color, size
	function config(config) {
		var c = config || {};
		borderSize = c.borderSize || 1;
		paddingLeftSize = c.paddingLeftSize || 5;
		teamWidth = c.teamWidth || 190;
		teamHeight = c.teamHeight || 25;
		connectWidth = c.connectWidth || 20;
		connectColor = c.connectColor || "#00F";
		teamBorderColor = c.teamBorderColor || "#F00";
		paddingHeight = c.paddingHeight || 10;

		var blurBorderColor = "#FFF";
		var cssCode = `
.bracket {
	border: ${borderSize}px solid ${blurBorderColor};
	padding: 0;
	margin: 0;
	font-size: 12px;
}
.bracket::after {
	display: block;
	content: "";
	clear: both;
}
.bracket div {
	padding: 0;
	margin: 0;
}
.bracket img {
	vertical-align: middle;
	display: inline-block;
	margin-right: 5px;
  transform: translateY(-2px);
}
.bracket .round {
	float: left;
	width: ${borderSize * 2 + paddingLeftSize + teamWidth}px;
}
.bracket .connectRound {
	float: left;
	width: ${connectWidth}px;
}
.bracket .match {
}
.bracket .team {
	border: ${borderSize}px solid ${teamBorderColor};
	padding-left: ${paddingLeftSize}px;
	width: ${teamWidth}px;
	height: ${teamHeight}px;
	line-height: ${teamHeight}px;
}
.bracket .blankTeam {
	border-top:    ${borderSize}px solid ${blurBorderColor};
	border-bottom: ${borderSize}px solid ${blurBorderColor};
	height: ${teamHeight}px;	
}
.bracket .padding {
	border-top:    ${borderSize}px solid ${blurBorderColor};
	border-bottom: ${borderSize}px solid ${blurBorderColor};
}
.bracket .topConnector {
	border-top:    ${borderSize}px solid ${connectColor};
}
.bracket .bottomConnector {
	border-bottom: ${borderSize}px solid ${connectColor};
}
.bracket .rightConnector {
	border-right: ${borderSize * 2}px solid ${connectColor};	
}
.bracket .winner {
	font-weight: bold;
}
		`;
		
		injectCss(cssCode);
	}
	
	// Add CSS code to the page
	function injectCss(cssCode) {
		var styleElement = document.createElement("style");
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = cssCode;
		} else {
			styleElement.appendChild(document.createTextNode(cssCode));
		}
		document.getElementsByTagName("head")[0].appendChild(styleElement);
	}
	
	// Build the team box
	function buildTeam(team) {
		var img = document.createElement("img");
		img.src = "images/" + team.country.replace(" ", "\_") + ".png";
		
		var teamDiv = document.createElement("div");
		teamDiv.className = "team";
		teamDiv.appendChild(img);
		teamDiv.appendChild(document.createTextNode(team.name));
		
		if (team.isWinner) {
			teamDiv.classList.add("winner");
		}
		return teamDiv;
	}

	// Build the blank team box
	// A blank box can act as a top or bottom connector 
	function buildBlankTeam(config) {
		var teamDiv = document.createElement("div");
		teamDiv.className = "blankTeam";
		teamDiv.textContent = "";
		if (config) {
			if (config.top) {
				teamDiv.classList.add("topConnector");
			} else if (config.bottom) {
				teamDiv.classList.add("bottomConnector");
			}
		}
		return teamDiv;
	}

	// Build the match box (contains two teams)
	function buildMatch(firstTeam, secondTeam) {
		var match = document.createElement("div");
		match.className = "match";
		match.appendChild(buildTeam(firstTeam));
		match.appendChild(buildTeam(secondTeam));
		return match;
	}

	// Build the main part of a round
	function buildRound(roundData, roundIndex) {
		var roundDiv = document.createElement("div");
		roundDiv.className = "round";
		for (var i = 0; i < roundData.length; i++) {
			var match = roundData[i];
			roundDiv.appendChild(paddingForEachSide(roundIndex));
			roundDiv.appendChild(buildMatch(match.firstTeam, match.secondTeam));
			roundDiv.appendChild(paddingForEachSide(roundIndex));
		}
		return roundDiv;
	}

	// Build the left connector of a round
	function buildLeftRound(roundDataLength, roundIndex) {
		var roundDiv = document.createElement("div");
		roundDiv.className = "connectRound";
		for (var i = 0; i < roundDataLength; i++) {
			roundDiv.appendChild(paddingForEachSide(roundIndex));
			roundDiv.appendChild(buildBlankTeam({ bottom: true }));
			roundDiv.appendChild(buildBlankTeam({ top:    true }));
			roundDiv.appendChild(paddingForEachSide(roundIndex));
		}
		return roundDiv;
	}

	// Build the right connector of a round
	function buildRightRound(roundDataLength, roundIndex) {
		var roundDiv = document.createElement("div");
		roundDiv.className = "connectRound";
		
		// A height unit
		var n = Math.pow(2, roundIndex);
		var height = n * (paddingHeight + 4 * borderSize + teamHeight);
		
		// The firt padding (half size of a normal padding)
		var padding = document.createElement("div");
		padding.className = "padding";
		padding.classList.add("bottomConnector");
		padding.style.height = (height - 2 * borderSize) + "px";
		roundDiv.appendChild(padding);
		
		// Normal paddings
		for (var i = 1; i < roundDataLength; i++) {
			padding = document.createElement("div");
			padding.className = "padding";
			padding.classList.add("topConnector");
			padding.classList.add("bottomConnector");
			if (i % 2 == 1) {
				padding.classList.add("rightConnector");
			}
			padding.style.height = (height * 2 - 2 * borderSize) + "px";
			roundDiv.appendChild(padding);
		}
		
		// The last padding
		padding = document.createElement("div");
		padding.className = "padding";
		padding.classList.add("topConnector");
		padding.style.height = (height - 2 * borderSize) + "px";
		roundDiv.appendChild(padding);
		
		return roundDiv;
	}

	// Paddings for the top or bottom of an element
	function paddingForEachSide(roundIndex) {
		var n = Math.pow(2, roundIndex);
		var padding = document.createElement("div");
		padding.className = "padding";
		// Height of n padding elements, (n - 1) team elements, not include two border
		padding.style.height = (
					n * (paddingHeight + 2 * borderSize)
					+ (n - 1) * (teamHeight + 2 * borderSize)
					- 2 * borderSize
				) + "px";
		return padding;
	}

	// Build a tournament bracket
	function build(divId, rounds) {
		var bracket = document.getElementById(divId);
		bracket.className = "bracket";
		// Width of n rounds and (n - 1) * 2 connectors
		bracket.style.width = (
					(borderSize * 2 + paddingLeftSize + teamWidth) * rounds.length
					+ connectWidth * 2 * (rounds.length - 1)
				) + "px";
		for (var roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
			if (roundIndex > 0) {
				bracket.appendChild(buildLeftRound(rounds[roundIndex].length, roundIndex));
			}
			bracket.appendChild(buildRound(rounds[roundIndex], roundIndex));
			if (roundIndex < rounds.length - 1) {
				bracket.appendChild(buildRightRound(rounds[roundIndex].length, roundIndex));
			}
		}
	}

	return {
		config: config,
		build: build
	};
})();

bracket.config();
