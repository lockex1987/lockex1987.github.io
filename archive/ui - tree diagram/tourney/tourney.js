$(document).on('ready', function() {
	var knownBrackets = [2, 4, 8, 16, 32], // brackets with "perfect" proportions (full fields, no byes)
	exampleTeams  = _.shuffle(["New Jersey Devils", "New York Islanders", "New York Rangers", "Philadelphia Flyers",
			"Pittsburgh Penguins", "Boston Bruins", "Buffalo Sabres", "Montreal Canadiens", "Ottawa Senators",
			"Toronto Maple Leafs", "Carolina Hurricanes", "Florida Panthers", "Tampa Bay Lightning", "Washington Capitals",
			"Winnipeg Jets", "Chicago Blackhawks", "Columbus Blue Jackets", "Detroit Red Wings", "Nashville Predators",
			"St. Louis Blues", "Calgary Flames", "Colorado Avalanche", "Edmonton Oilers", "Minnesota Wild", "Vancouver Canucks",
			"Anaheim Ducks", "Dallas Stars", "Los Angeles Kings", "Phoenix Coyotes", "San Jose Sharks", "Montreal Wanderers",
			"Quebec Nordiques", "Hartford Whalers"]), // because a bracket needs some teams!
	bracketCount = 0;
	
	/*
	 * Build our bracket "model"
	 */
	function getBracket(base) {
		var closest = _.find(knownBrackets, function(k) { return k>=base; });
		var byes = closest-base;
		if (byes > 0) base = closest;

		var brackets 	= [],
			round 		= 1,
			baseT 		= base / 2,
			baseC 		= base / 2,
			teamMark	= 0,
			nextInc		= base / 2;
			
		for(i = 1; i <= (base - 1); i++) {
			var	baseR = i / baseT,
				isBye = false;
				
			if(byes>0 && (i%2!=0 || byes>=(baseT-i))) {
				isBye = true;
				byes--;
			}
			
			var last = _.map(_.filter(brackets, function(b) { return b.nextGame == i; }), function(b) { return {game:b.bracketNo,teams:b.teamnames}; });
			
			brackets.push({
				lastGames:	round==1 ? null : [last[0].game,last[1].game],
				nextGame:	nextInc+i>base-1?null:nextInc+i,
				teamnames:	round==1 ? [exampleTeams[teamMark],exampleTeams[teamMark+1]] : [last[0].teams[_.random(1)],last[1].teams[_.random(1)]],
				bracketNo:	i,
				roundNo:	round,
				bye:		isBye
			});
			teamMark+=2;
			if(i%2!=0)	nextInc--;
			while(baseR>=1) {
				round++;
				baseC/= 2;
				baseT = baseT + baseC;
				baseR = i/baseT;
			}
		}
		
		renderBrackets(brackets);
	}
				
	/*
	 * Inject our brackets
	 */
	function renderBrackets(struct) {
		var groupCount	= _.uniq(_.map(struct, function(s) { return s.roundNo; })).length;
		
		var group	= $('<div class="group'+(groupCount+1)+'" id="b'+bracketCount+'"></div>'),
			grouped = _.groupBy(struct, function(s) { return s.roundNo; });

		for(g=1;g<=groupCount;g++) {
			var round = $('<div class="r'+g+'"></div>');
			_.each(grouped[g], function(gg) {
				if(gg.bye)
					round.append('<div></div>');
				else
					round.append('<div><div class="bracketbox"><span class="info">'+gg.bracketNo+'</span><span class="teama">'+gg.teamnames[0]+'</span><span class="teamb">'+gg.teamnames[1]+'</span></div></div>');
			});
			group.append(round);
		}
		group.append('<div class="r'+(groupCount+1)+'"><div class="final"><div class="bracketbox"><span class="teamc">'+_.last(struct).teamnames[_.random(1)]+'</span></div></div></div>');
		$('#brackets').append(group);
		
		bracketCount++;
		$('html,body').animate({
			scrollTop: $("#b"+(bracketCount-1)).offset().top
		});
	}
				
	$('#add').on('click', function() {
		var opts = parseInt(prompt('Bracket size (number of teams):', 32));
		if (!_.isNaN(opts) && opts <= _.last(knownBrackets)) {
			getBracket(opts);
		} else {
			alert('The bracket size you specified is not currently supported.');
		}
	});
});
