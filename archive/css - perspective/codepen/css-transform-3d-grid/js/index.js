var threeDee = {
			"version": 0.1,
			"create": function(obj) {
						this.id = threeDee.numberOfObjects;
						threeDee.numberOfObjects += 1;
						this.width = obj.width;
						this.height = obj.height;
						this.pos = obj.pos;
						this.rotation = obj.rotation || {
									x: "0deg",
									y: "0deg",
									z: "0deg"
						};
						this.transformOrigin = obj.transformOrigin || "initial";
						this.content = obj.content || "";
						this.css = obj.css || "";
						this.el = $("#" + this.id);

						this.spawn = function() {
									$("#" + this.id).remove();
									$("#viewport").append("<div class='threeDee' id='" + this.id + "' style='width:" + this.height + "; height:" + this.width + "; bottom: 0; left: 0; position: absolute; transform: translate3d(" + this.pos.x + ", " + this.pos.y + ", " + this.pos.z + ") rotateX(" + this.rotation.x + ") rotateY(" + this.rotation.y + ") rotateZ(" + this.rotation.z + ") ; transform-origin:" + this.transformOrigin + "; " + this.css + " '>" + this.content + "</div>");

						}; //.spawn
						this.rotate = function(obj) {
									$.extend(true, this.rotation, obj);
									this.spawn();
						};
						this.move = function(obj) {
									$.extend(true, this.pos, obj);
									this.spawn();
						}

			}, //.create
			"sphere": function(obj, res) {
						//Skapa en array med X antal discs (Sätt upplösning) och dela upp antalet på 360 grader. Använd egen rotationsfunktion.
						obj.css += " border-radius: 50%;";
						var angle = 360/res;
						var coords = obj.pos;
						var discs = [];
for (var i = 0; i < res; i++) {
  discs[i] = new threeDee.create(obj);
	discs[i].rotate({y: angle*i+"deg"});
	discs[i].spawn();
}	


			},
			"numberOfObjects": 0
};




/*Execution code starts here*/

var bottom = new threeDee.create({
			height: "300px",
			width: "200px",
			pos: {
						x: "0px",
						y: "0px",
						z: "0px"
			},
			css: "border: solid 1px white;",
			rotation: {
						x: "90deg",
						y: "0deg",
						z: "0deg"
			},
			transformOrigin: "bottom"
});

bottom.spawn();
var fusionSphere = new threeDee.sphere({
			pos: {
						x: "150px",
						y: "-100px",
						z: "-100px"
			},
			width: "50px",
			height: "50px",
			css: "background-color: white; box-shadow: 0 0 10px white;"
}, 20);