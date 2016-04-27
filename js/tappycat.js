var tappy;
var canvasWidth = 600;
var canvasHeight = 450;
var imageWidth = 420;
var imageHeight = 400;
var randPointX, randPointY;
var bigSpotDiam = 160;
var smallSpotDiam = 50;
var bigSpotRadius = 80;
var smallSpotRadius = 25;
var spotFound = true;
var meow, menu, play;

function setup() {
  createCanvas(600, 450);
  stroke(255, 0, 0); 
  
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

  tappy = new Cat(canvasWidth/2-(imageWidth/2),canvasHeight/2-(imageHeight/2));
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
		clear();
		this.count += sin(frameCount * 5);
		if (this.count > 0){
			this.state = switchStates(this.state);
		}  
	}
	this.display = function(){
		image(this.state,this.x,this.y,this.width, this.height);
	}
}

//game object
var Game = function(){
	this.score = 0;
	//this.
}

//uses random to generate a circle within the bounds of the cat image
function generateSweetSpot(){
	//place x and y in the center
	var x = canvasWidth/2;
	var y = canvasHeight/2;
	x += random(-imageWidth/2 + 100, imageWidth/2 - 100);
	y += random(-imageHeight/2 + 50, imageHeight/2 - 50);

	randPointX = x;
	randPointY = y;
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
function mousePressed(){
	x = mouseX
	y = mouseY
	checkSpot(x,y, randPointX, randPointY);
}

function checkSpot(x1, y1, x2, y2){
	var d = int(dist(x1, y1, x2, y2))
	if (d <= bigSpotRadius && d > smallSpotRadius){
		//hit in bigSpot
		//change state and display text
		if (tappy.state != normal1){
			if(tappy.state != normal2){
				tappy.state = normal1;
			}
		}
		console.log("CLOSE");
	}
	else if (d <= smallSpotRadius){
		//hit in the smallSpot
		//change state, display text, and set flag to true
		if (tappy.state != happy1){
			if(tappy.state != happy2){
				tappy.state = happy1;
			}
		}
		spotFound = true;
		//increment score and play meow sound
		meow.play();
		console.log("YOU FOUND IT")
	}
	else{
		if (tappy.state != mad1){
			if(tappy.state != mad2){
				tappy.state = mad1;
			}
		}
		console.log("NOT EVEN CLOSE")
	}
}


function draw() {
	//state = getCatState(x,y)
	tappy.animate();
	tappy.display();
	if (spotFound == true){
		generateSweetSpot();
		spotFound = false;
	}

}