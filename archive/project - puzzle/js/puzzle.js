//TODO: Hide ruler of the first question

// Step 1: Get global object
var puzzle = document.getElementById("puzzle"); // element "puzzle" (main container)
var data = []; // data array
var curIdx = 0; // current index
var sic = document.getElementById("sic"); // checkbox "Show all images"
var sit = document.getElementById("sit"); // label "Show all images"
var sac = document.getElementById("sac"); // checkbox "Show all answers"
var sat = document.getElementById("sat"); // label "Show all answers"
var indicator = document.getElementById("indicator"); // progress bar indicator
var myRange = document.getElementById("myRange"); // progress bar indicator
var bp = document.getElementById("bp"); // button previous
var bn = document.getElementById("bn"); // button previous

// Step 2: Convert all data from JSON and generate HTML code dynamically
function Quiz(id, q, a) {
    this.id = id;
    this.question = document.createElement("div");
    this.question.className = "question";
    this.question.innerHTML = q;
    
    this.answer = document.createElement("div");
    this.answer.className = "answer";
    this.answer.innerHTML = a;

    this.image = document.createElement("img");
    this.image.src = "images/" + id + ".jpg";

    this.hint = document.createElement("div");
    this.hint.className = "hint";
    
    this.link = document.createElement("button");
    this.link.innerHTML = "Xem đáp án >";

    this.container = document.createElement("div");
    this.container.className = "container";
    
    this.hint.appendChild(this.link);
    this.container.appendChild(this.image);
    this.container.appendChild(this.question);
    this.container.appendChild(this.hint);
    this.container.appendChild(this.answer);
}

for (var i = 0; i < raw.length; i++) {
    var e = raw[i];
    var q = new Quiz(e.id, e.q, e.a);
    puzzle.appendChild(q.container);
    data.push(q);
    
    // Be careful
    q.link.onclick = (function(idx) {
        return function() {
            toggleAnswer(idx);
        };
    })(i);
}

// Step 3: Add behaviours
function toggleAnswer(idx) {
    var q = data[idx];
    if (q.answer.style.display == "") {
        q.answer.style.display = "none";
        q.hint.style.display = "";
        //q.link.innerHTML = "Xem đáp án";
    } else {
        q.answer.style.display = "";
        q.hint.style.display = "none";
        //q.link.innerHTML = "Ẩn đáp án";
    }
}

function processAllImages() {
    var c = sic.checked ? "checked sitChecked" : "none";
    sit.className = c;
    
    var f = sic.checked ? "" : "none";
    for (var i = 0; i < data.length; i++) {
        data[i].image.style.display = f;
    }
}

function processAllAnswers() {
    var c = sac.checked ? "checked satChecked" : "none";
    sat.className = c;

    var f = sac.checked ? "" : "none";
    var hf = sac.checked ? "none" : "";
    for (var i = 0; i < data.length; i++) {
        data[i].answer.style.display = f;
        data[i].hint.style.display = hf;
    }
}

sic.onclick = function() {
    processAllImages();
};
sac.onclick = function() {
    processAllAnswers();
};

processAllImages();
processAllAnswers();

// Step 4: Only one quiz is displayed
function displayOnlyCurrent() {
    for (var i = 0; i < data.length; i++) {
        data[i].container.style.display = "none";
    }
    data[curIdx].container.style.display = "";
    indicator.value = curIdx + 1;
    myRange.value = curIdx + 1;
    bp.disabled = (curIdx == 0);
    bn.disabled = (curIdx == data.length - 1);
}

displayOnlyCurrent();
indicator.max = data.length;
myRange.max = data.length;

bn.onclick = function() {
    if (curIdx + 1 < data.length) {
        curIdx++;
        displayOnlyCurrent();
    }
};
bp.onclick = function() {
    if (curIdx - 1 >= 0) {
        curIdx--;
        displayOnlyCurrent();
    }
};
myRange.onchange = function() {
	if (myRange.value > 0) {
		curIdx = myRange.value - 1;
		displayOnlyCurrent();
	}
}
