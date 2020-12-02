class Wheel{
	constructor(){
		this.wheelElm = document.getElementById('wheel');
		this.wheelElm.addEventListener('mousedown', e =>{
			this.onGrab(e.clientX, e.clientY);
		});
		window.addEventListener('mousemove', e =>{
			if(e.which == 1)
				this.onMove(e.clientX, e.clientY);
			else if(!this.isDragging)
				this.onRelease()
			
		});
		window.addEventListener('mouseup', this.onRelease.bind(this));

		this.wheelElm.addEventListener('touchstart', e =>{
			this.onGrab(e.touches[0].clientX, e.touches[0].clientY);
		});
		window.addEventListener('touchmove', e =>{
			this.onMove(e.touches[0].clientX, e.touches[0].clientY);
		});
		window.addEventListener('touchend', this.onRelease.bind(this));

		this.calculatePositions();
		window.addEventListener('resize', this.calculatePositions.bind(this));

		this.currentAngle = 0;
		this.oldAngle = 0;
		this.lastAngles = [0,0,0];
		this.isDragging = false;
		this.startX = null;
		this.startY = null;

		this.positionCallbacks = [];
	}

	calculatePositions(){
		this.wheelWidth = this.wheelElm.getBoundingClientRect()['width'];
		this.wheelHeight = this.wheelElm.getBoundingClientRect()['height']
		this.wheelX = this.wheelElm.getBoundingClientRect()['x'] + this.wheelWidth / 2;
		this.wheelY = this.wheelElm.getBoundingClientRect()['y'] + this.wheelHeight / 2;
	}

	onPositionChange(callback){
		this.positionCallbacks.push(callback);
	}

	onGrab(x, y){
		if(!this.isSpinning){
			this.isDragging = true;
			this.startAngle = this.calculateAngle(x, y);
		}				
	}

	onMove(x, y){
		if(!this.isDragging)
			return

		this.lastAngles.shift();
		this.lastAngles.push(this.currentAngle);

		let deltaAngle = this.calculateAngle(x, y) - this.startAngle;
		this.currentAngle = deltaAngle + this.oldAngle;
		
		this.render(this.currentAngle);
	}

	calculateAngle(currentX, currentY){
		let xLength = currentX - this.wheelX;
		let yLength = currentY - this.wheelY;
		let angle = Math.atan2(xLength, yLength) * (180/Math.PI);
		return 365 - angle;
	}

	onRelease(){
		if(this.isDragging){
			this.isDragging = false;
			this.oldAngle = this.currentAngle;

			let speed = this.lastAngles[0] - this.lastAngles[2];
			this.giveMoment(speed);
		}		
	}

	giveMoment(speed){
		let maxSpeed = 30;
		if(speed >= maxSpeed)
			speed = maxSpeed;
		else if(speed <= -maxSpeed)
			speed = -maxSpeed;

		if(speed >= 0.1){
			speed -= 0.1;
			window.requestAnimationFrame(this.giveMoment.bind(this, speed));
			this.isSpinning = true;
		}
		else if(speed <= -0.1){
			speed += 0.1;
			window.requestAnimationFrame(this.giveMoment.bind(this, speed));
			this.isSpinning = true;
		}
		else{
			this.isSpinning = false;
		}

		this.oldAngle -= speed;
		this.render(this.oldAngle);
	}

	render(deg){
		this.wheelElm.style.transform = `rotate(${deg}deg)`;
		for(let callback of this.positionCallbacks){
			callback(deg);
		}
	}
}

let wheel = new Wheel();