/**
 * Đồng bộ dữ liệu mới nhất từ file JSON trên server.
 */
function synchronizeData() {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			data = JSON.parse(req.responseText);
			processData(data);
		}
	};
	req.open("GET", "data/data.json");
	req.send();	
}

/**
 * Xử lý dữ liệu và hiển thị cho người dùng.
 */
function processData(data) {
	var teams = data.teams;
	var groups = data.groups;
	var matches = data.matches;
	var coaches = data.coaches;
	var players = data.players;

	// Map các đội tuyển, để truy cập cho nhanh
	var teamMap = {};
	teams.forEach(function(t) {
		// Khởi tạo dữ liệu luôn
		initTeam(t);

		// Gán huấn luyện viên
		let coach = null;
		for (let i = 0; i < coaches.length; i++) {
			let e = coaches[i];
			if (e.country === t.name) {
				coach = e;
				break;
			}
		}
		if (coach) {
			t.coachName = coach.name;
		}
		
		// Đẩy vào map
		teamMap[t.name] = t;
	});
			
	processMatches(matches, teamMap);

	processGroups(groups, teamMap);

	var app = new Vue({
		el: "#worldCup",
		data: {
			teams: teams,
			groups: groups,
			matches: matches,
			allPlayers: players,
			teamPlayers: [],
			currentPlayer: {},
			currentTeam: null,
			screen: "main-menu" // main-menu, match-list, team-list, group-list, team-detail
		},
		methods: {
			changeScreen: function(screen, event) {
				event.preventDefault();
				//event.stopPropagation();

				this.screen = screen;
				var url = event.target.href;
				console.log("Change screen " + screen + ", " + url);
				history.pushState(screen, null, url);
			},
			viewTeam: function(t) {
				this.screen = "team-detail";
				this.currentTeam = t;
				this.teamPlayers = [];
				this.allPlayers.forEach((player) => {
					if (player.country === t.name) {
						this.teamPlayers.push(player);
					}
				});
			}
		}
	});
	window.app = app;
	
	renderFirstMatch("group");
	renderFirstMatch("round-of-16");
	renderFirstMatch("quarter-finals");
	renderFirstMatch("semi-finals");
	renderFirstMatch("third-place");
	renderFirstMatch("final");
}

/**
 * Khởi tạo một số dữ liệu luôn.
 */
function initTeam(t) {
	t.played = 0;
	t.won = 0;
	t.drawn = 0;
	t.lost = 0;
	t.gf = 0;
	t.ga = 0;
	t.point = 0;
}

/**
 * Xử lý dữ liệu trận đấu: tính điểm, số trận đã chơi - thắng - hòa - thua, số bàn thắng.
 */
function processMatches(matches, teamMap) {
	matches.forEach(function(m) {
		m.time = convertStringToLocaleTime(m.time);
		
		m.team_1_obj = teamMap[m.team_1];
		m.team_2_obj = teamMap[m.team_2];
		
		var score_1;
		var score_2;
		if (!m.score || m.score == ":") {
			// Random tỷ số
			//score_1 = Math.floor(Math.random() * 6);
			//score_2 = Math.floor(Math.random() * 6);
			//m.score = score_1 + ":" + score_2;
            return;
		}

        // Xử lý tỷ số, tính toán lại các chỉ số cho hai đội tuyển
        var a = m.score.split(":");
	    score_1 = parseInt(a[0]);
	    score_2 = parseInt(a[1]);

	    m.score_1 = score_1;
	    m.score_2 = score_2;

        // Chỉ tính vòng bảng
		if (m.round != "group") {
			return;
		}
	
	    processGames(m.team_1_obj, m.team_2_obj, score_1, score_2);

	    updateGoals(m.team_1_obj, score_1, score_2);
	    updateGoals(m.team_2_obj, score_2, score_1);
	});	
}

/**
 * Convert sang giờ Việt Nam.
 */
function convertStringToLocaleTime(text) {
	var time = new Date(text);
	// Tăng lên 7 giờ
	time.setTime(time.getTime() + (7 * 60 * 60 * 1000));
	var d = time.getDate();
	var m = time.getMonth() + 1;
	var y = time.getFullYear();
	var h = time.getHours();
	var mi = time.getMinutes();
	return addZero(d) + "/" + addZero(m) + "/" + y + " " + addZero(h) + ":" + addZero(mi);
}

function addZero(n) {
	return (n < 10) ? ("0" + n) : n;
}

function processGames(t1, t2, score_1, score_2) {
	t1.played++;
	t2.played++;

	if (score_1 > score_2) {
		t1.won++;
		t2.lost++;
		t1.point += 3;
	} else if (score_1 == score_2) {
		t1.drawn++;
		t2.drawn++;
		t1.point++;
		t2.point++;
	} else {
		t1.lost++;
		t2.won++;
		t2.point += 3;
	}
}

/**
 * Cập nhật số trận, số bàn thắng ghi được, số bàn thắng bị thủng, hiệu số bàn thắng.
 */
function updateGoals(team, goalFor, goalAgainst) {	
	team.gf += goalFor;
	team.ga += goalAgainst;
	team.gd = team.gf - team.ga;
}

/**
 * Xử lý dữ liệu nhóm: sắp xếp.
 */
function processGroups(groups, teamMap) {
	groups.forEach(function(g) {
		g.teams_more = [];
		g.teams.forEach(function(team_name) {
			g.teams_more.push(teamMap[team_name]);
		});
		g.teams_more.sort(function(a, b) {
			//console.log(JSON.stringify(a));
			if (a.point != b.point) {
				return a.point - b.point;
			}
            if (a.gd != b.gd) {
                return a.gd - b.gd;
            }
			if (a.gf != b.gf) {
				return a.gf - b.gf;
			}
			//return a.rank - b.rank;
			return a.fairPlay - b.fairPlay;
		});
		g.teams_more.reverse();
	});	
}

function renderFirstMatch(round) {
	document.querySelector(".match-list ." + round).classList.add("first-match");
}


//synchronizeData();
processData(data);

// Người dùng nhấn phím Back/Forward
window.addEventListener('popstate', function(event) {
	var screen = event.state;
	console.log("screen: " + screen);
	if (!screen) {
		app.screen = "main-menu";
	}
});
