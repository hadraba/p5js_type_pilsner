let font = 'Acumin Pro';
let txtbox;
let initSize = 10;
let maxSize;
let txt = 'dopiči';
let paddings = 0.1; //in percents
let word;

const lines = 100;

let temp;

function setup() {
	createCanvas(windowWidth, windowHeight);
	temp = createGraphics(windowWidth, windowHeight);
	drawText(initSize, temp);
	word = new Word(txt);
}

function draw() {
	clear();

	word.move();

	let fps = frameRate();
	fill(0);
	text("FPS: " + fps.toFixed(2), 10, height - 10);
}

class Word {
	constructor(name) {
		this.name = name;
		this.stripes = [];
 		for (let i = 0; i < lines; i++) {
			//source
			let sx = 0;
			let sy = Math.round((txtbox.y - txtbox.h/2) + i * (txtbox.h/lines));
			let sw = windowWidth;
			let sh = int(txtbox.h/lines);
			this.stripes.push(temp.get(sx, sy, sw, sh));
		}
	}

	move() {
		for (let i = 0; i < lines; i++) {
			let dx = int(map(i,0,lines,2,-2)*map(mouseX, 0, windowWidth, txtbox.w/50 + i*5, -txtbox.w/50 -i*5));
			let dy = Math.round((txtbox.y - txtbox.h/2) + i * (txtbox.h/lines)) + int(map(sin(frameCount * 0.1 + i * 0.2), -1, 1, 0,txtbox.h/6 + map(mouseY,0, windowHeight,-txtbox.h/3,txtbox.h/6)));
			image(this.stripes[i],dx, dy);
		}
	}
}

function windowResized() {
	clear();
	resizeCanvas(windowWidth, windowHeight);
	temp = createGraphics(windowWidth, windowHeight);
	drawText(initSize, temp);
	word = new Word(txt);
}  

function drawText(size, canvas) {
	
	canvas.clear();
	canvas.textFont(font);
	canvas.textSize(size);
	canvas.textStyle('bold');
	canvas.textAlign(CENTER);
	while(canvas.textWidth(txt) <= windowWidth*(1-2*paddings) && size*1.5 < windowHeight) {
		size++;
		canvas.textSize(size);
		console.log(size*1.12);
	}
	canvas.text(txt, windowWidth/2, (windowHeight+size/3)/2);
	maxSize = size;
	rectMode(CENTER);
	
	txtbox = {
		x: windowWidth/2,
		y: windowHeight/2-size*0.17,
		w: canvas.textWidth(txt), 
		h: size*1.12,
		draw: function() {
			noFill();
			rect(this.x, this.y, this.w, this.h);
		}
	}

}