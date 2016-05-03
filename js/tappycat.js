var tappy;
var canvasWidth = 650;
var canvasHeight = 650;
var imageWidth = 420;
var imageHeight = 400;
var randPointX, randPointY;
var bigSpotDiam = 180;
var smallSpotDiam = 60;
var bigSpotRadius = 90;
var smallSpotRadius = 30;
var spotFound = true;
var mad = false;
var normal1, normal2, mad1, mad2, happy1, happy2;
var meow, menu, play, font, txt;
var start, time, score, gameover, startTime;
var offset = 0;
var easing = 0.05;

function preload(){
	normal1 = loadImage("./resources/tappycat_s1-01.png");
	normal2 = loadImage("./resources/tappycat_s1-02.png");

	mad1 = loadImage("./resources/tappycat_s2-01.png");
	mad2 = loadImage("./resources/tappycat_s2-02.png");

	happy1 = loadImage("./resources/tappycat_s3-01.png");
	happy2 = loadImage("./resources/tappycat_s3-02.png");

	soundFormats('wav',"mp3");
	meow = loadSound("./resources/meow01_loud.wav");
	menu = loadSound("./resources/ComeBack_01.wav");
	play = loadSound("./resources/ComeBack02.wav");

	font = loadFont('./resources/Animated.ttf');
}
function setup() {
	createCanvas(650, 650);
	stroke(255, 0, 0); 

	tappy = new Cat(canvasWidth/2-(imageWidth/2),canvasHeight/2-(imageHeight/2)+ 80);
	happiness = new Bar(canvasWidth/2-(500/2), 120, 500, 50);

	textFont(font);
	textSize(30);

	txt = "Click on Tappy to begin.";
	start = false;
	score = 0;

	menu.loop();
	gameover = false;
}
//cat object
var Cat = function(x, y){
	this.x = x;
	this.y = y;
	this.width = imageWidth;
	this.height = imageHeight;
	this.state = normal1;
	this.count = 0;

	this.animate = function() {
		tint(255,255); //its weird that I need this for the animation to slow down
		//clear();
		this.hide();
		this.count += sin(frameCount * 5);
		if (this.count > 0){
			this.state = switchStates(this.state);
		}  
	}
	this.display = function(){
		image(this.state,this.x,this.y,this.width, this.height);
	}
	this.hide = function(){
		noStroke();
		fill("#ffb18f");
		rect(this.x,this.y - 10,imageWidth,imageHeight + 20);
	}
	this.shake = function(){
		this.x += random(-2, 2);
    	this.y += random(-2, 2);
	}
}

//game object
var Game = function(){
	this.score = 0;
	//this.
}

var Bar = function(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.level = 1;
	this.fill = "lightgreen"

	this.display = function(){
		fill("lightgray");
		rect(this.x, this.y, 500, 50, 20);
		fill(this.fill);
		rect(this.x, this.y, this.width, this.height, 20);
		fill(255);
		textAlign(CENTER);
		text("Happy Meter",this.x + 250 , 150);
	}
	this.decrease = function(){
		this.hide();
		this.width -= this.level;
		if(this.width >= 0){
			this.display();
		}else{
			//Gameover
			this.shake(false);
			this.width = 1;
			time = millis() -startTime;
			gameOver(time);
		}
	}
	this.increase = function(){
		this.hide();
		this.width += 100;
		if(this.width > 500){
			this.width = 500;
		}
		this.display();
	}
	this.slowlyDecrease = function(){
		this.hide();
		this.width -= this.level;
		if(this.width >= 0){
			this.display();
		}else{
			//gameOver
			this.shake(false);
			this.width = 1;
			time = millis() -startTime;
			gameOver(time);
		}	
	}
	this.hide = function(){
		fill("#ffb18f");
		noStroke();
		rect(this.x-20, this.y-20, 540, this.height+55, 20);
	}
	this.shake = function(doShake){
		if (doShake){
			this.fill = "red";
			this.x += random(-1, 1);
    		this.y += random(-1, 1);
    	}else{
    		this.fill = "lightgreen";
    		this.x = canvasWidth/2-(500/2);
    		this.y = 120;
    	}
	}
}

//uses random to generate a circle within the bounds of the cat image
function generateSweetSpot(){
	//place x and y in the center
	var x = canvasWidth/2;
	var y = canvasHeight/2;
	console.log(x,y)
	x += random(-imageWidth/2 + 100, imageWidth/2 - 100);
	y += random(-imageHeight/2 + 100, imageHeight/2 + 50);
	//console.log("X, Y ", mouseX, mouseY);
	randPointX = x;
	randPointY = y;
	//console.log(randPointX, randPointY);
	//for visualization
	//ellipse(x,y,bigSpotDiam,bigSpotDiam);
	//ellipse(x,y,smallSpotDiam,smallSpotDiam);
}


function switchStates(state){
	switch (state){
		case normal1:
			return normal2;
		case normal2:
			return normal1;
		case mad1:
			return mad2;
		case mad2:
			return mad1;
		case happy1:
			return happy2;
		case happy2:
			return happy1;
	}
}

//handles mouse pressed coord and change state accordingly
function mouseReleased(){
	//if (mouseX >= canvasWidth/2 - tappy.width/2 && mouseX <= canvasWidth/2 + tappy.width/2 &&
	//	mouseY >= canvasHeight/2 - tappy.height/2 && mouseY <= canvasHeight/2 + tappy.height/2){
		tappy.width = imageWidth;
		tappy.height = imageHeight;
		tappy.x -= 8; 
		tappy.y -= 8;
	//}
}
function mousePressed(){
	tappy.width = imageWidth-16;
	tappy.x += 8;
	tappy.height = imageHeight-16;
	tappy.y += 8;
	if (start == false && gameover == false){
		start = true;
	}
	else if(gameover == false){
		x = mouseX;
		y = mouseY;
		
		//if (mouseX >= canvasWidth/2 - tappy.width/2 && mouseX <= canvasWidth/2 + tappy.width/2 &&
		//	mouseY >= canvasHeight/2 - tappy.height/2 && mouseY <= canvasHeight/2 + tappy.height/2){
			
		checkSpot(x,y, randPointX, randPointY);
	}
	//}
}

function checkSpot(x1, y1, x2, y2){
	var d = int(dist(x1, y1, x2, y2))
	if (d <= bigSpotRadius && d > smallSpotRadius){
		//hit in bigSpot
		//change state and display text
		if (tappy.state != normal1 && tappy.state != normal2){
			//if(tappy.state != normal2){
				tappy.state = normal1;
				mad = false;
			//}
		}
		txt = "Getting warmer . . .";
		console.log("CLOSE");
	}
	else if (d <= smallSpotRadius){
		//hit in the smallSpot
		//change state, display text, and set flag to true
		if (tappy.state != happy1 && tappy.state != happy2){
			//if(tappy.state != happy2){
				tappy.state = happy1;
				mad = false;
			//}
		}
		spotFound = true;
		//play meow sound
		meow.play();
		happiness.increase();
		txt = "You found it!";
		console.log("YOU FOUND IT")
	}
	else{
		if (tappy.state != mad1 && tappy.state != mad2){
			//if(tappy.state != mad2){
				tappy.state = mad1;
				mad = true;
			//}
		}
		happiness.decrease();
		txt = "Not even close . . .";
		console.log("NOT EVEN CLOSE");

	}
}

function gameOver(time){
	txt = "GAMEOVER";
	start = false;
	gameover = true;
	score = Math.floor(time/10000);
	play.stop();
	menu.loop();
	//show score
}

function draw() {

	noStroke();
	textAlign(CENTER);
	fill("#ffb18f");
	rect(canvasWidth/2 -250,30,500,80);
	rect(canvasWidth/2 -250,0,500,50);
	fill(255);
	text(txt, canvasWidth/2, 80);
	text("Score: " + score, canvasWidth/2, 30);
	
	happiness.hide();
	happiness.display();
	//happiness.hide();

	tappy.animate();
	tappy.display();

	//gameover = true;

	if (gameover == true){
		//clear();
		var dy = 50 + offset;
		offset += dy * easing;
		if (offset > canvasHeight/2 - 200){
			offset = canvasHeight/2 - 200;
		}
		//fill(color(255,255,255,0.5));
		var level;
		if(score <= 3){
			level = "Meh. . .";
		}
		else if(score > 3 && score <= 6){
			level = "Not bad Hooman";
		}
		else if(score > 6 && score <= 10){
			level = "Tappy approves";
		}
		else if(score > 10){
			level = "Cat Whisperer!";
		}
		var c = color(0,0,0,190);
		fill(c);
		rect(canvasWidth/2 - 200, offset, 400, 400, 20);
		fill("white");
		textSize(40);
		textAlign(CENTER);
		text(level + "\nYour Score: " + score, canvasWidth/2, offset + 100);
	}

	if(start == true){
		menu.stop();
		if(!play.isPlaying()){
			play.loop();
			txt = "Start tapping!"
			startTime = millis();
		}
		time = millis() - startTime;

		score = Math.floor(time/10000);

		happiness.slowlyDecrease();	
		happiness.display();
		
		if (spotFound == true){
			generateSweetSpot();
			spotFound = false;
		}
		if (happiness.width <= 200){
			//tappy.shake();
			happiness.shake(true);
		}
		if (happiness.width > 200){
			happiness.shake(false);
		}

		//console.log(frameCount);
		if (frameCount > 100){
			happiness.level = 2;
		}
		else if (frameCount > 200){
			happiness.level = 3;
		}
		else if (frameCount > 300){
			happiness.level = 4;
		}
		else if (frameCount > 400){
			happiness.level = 5;
		}
		else if (frameCount > 500){
			happiness.level = 7;
		}
		else if (frameCount > 600){
			happiness.level = 9;
		}
		else if (frameCount > 700){
			happiness.level = 11;
		}
		else if (frameCount > 800){
			happiness.level = 13;
		}
		else if (frameCount > 900){
			happiness.level = 16;
		}
		else if (frameCount > 1000){
			happiness.level = 19;
		}
	}

}





