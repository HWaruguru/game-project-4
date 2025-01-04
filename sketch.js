// Game project 4 side scrolling
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isRight;
var isLeft;
var isPlummeting;
var isFalling;
var collectable;
var scrollPos = 0;
var tree_x;



function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;
	isLeft = false;
	isRight = false;
	isPlummeting = false;
	isFalling = false;
	collectable = { x_pos: 200, y_pos: 410, size: 50, isFound: false }
	canyon = { x_pos: 300, width: 100 };
	tree_x = [300, 500, 900, 1150]
}

function draw() {

	///////////DRAWING CODE//////////

	background(100, 155, 255); //fill the sky blue


	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

for(var i = 1; tree_x.length; i++){
	console.log(i)
}


	//draw the canyon
	if (gameChar_x > canyon.x_pos && gameChar_x < canyon.x_pos + canyon.width && gameChar_y >= floorPos_y) {
		isPlummeting = true;
	} else {
		isPlummeting = false
	}
	fill(100, 100, 255);  // Blue color for the canyon
	rect(canyon.x_pos, floorPos_y, canyon.width, height - floorPos_y);
	//collectable

	if (dist(gameChar_x, gameChar_y, collectable.x_pos - scrollPos, collectable.y_pos) < 50) {
		collectable.isFound = true; // Mark the collectible as found
	}

	if (!collectable.isFound) {
		fill(255, 215, 0);
		ellipse(collectable.x_pos - scrollPos, collectable.y_pos, collectable.size, collectable.size);
	}


	//the game character
	if (isLeft && isFalling) {
		// add your jumping-left code
		fill(200, 100, 100);
		ellipse(gameChar_x, gameChar_y - 60, 25);
		//eye
		fill(0);
		ellipse(gameChar_x - 8, gameChar_y - 60, 3, 3)
		//body
		fill(255, 0, 0);
		rect(gameChar_x - 13, gameChar_y - 50, 26, 30);
		//legs
		fill(0);

		rect(gameChar_x - 13, gameChar_y - 20, 10, 15);
		rect(gameChar_x + 3, gameChar_y - 20, 10, 15);
		//shoes
		fill(0, 0, 255);
		rect(gameChar_x - 18, gameChar_y - 10, 15, 10);
		rect(gameChar_x - 2, gameChar_y - 10, 15, 10);
		//arms
		fill(0);
		rect(gameChar_x - 20, gameChar_y - 50, 10, 15);
		rect(gameChar_x + 13, gameChar_y - 50, 10, 15);



	}
	else if (isRight && isFalling) {
		// add your jumping-right code
		fill(200, 100, 100);
		ellipse(gameChar_x, gameChar_y - 60, 25);
		//eye
		fill(0)
		ellipse(gameChar_x + 8, gameChar_y - 60, 3, 3)
		//body
		fill(255, 0, 0);
		rect(gameChar_x - 13, gameChar_y - 50, 26, 30);
		//legs
		fill(0);


		rect(gameChar_x - 13, gameChar_y - 20, 10, 15);
		rect(gameChar_x + 3, gameChar_y - 20, 10, 15);
		fill(0, 0, 255)
		triangle(gameChar_x + 13, gameChar_y - 20, gameChar_y - 30, gameChar_x + 13, gameChar_y - 5);

		//shoes
		fill(0, 0, 255);
		rect(gameChar_x - 13, gameChar_y - 10, 15, 10);
		rect(gameChar_x + 3, gameChar_y - 10, 15, 10);
		//arms
		fill(0);
		rect(gameChar_x - 20, gameChar_y - 50, 10, 15);
		rect(gameChar_x + 13, gameChar_y - 50, 10, 15);
	}
	else if (isLeft) {
		// add your walking left code
		fill(200, 100, 100);
		ellipse(gameChar_x, gameChar_y - 60, 25);
		//eye
		fill(0);
		ellipse(gameChar_x - 8, gameChar_y - 60, 3, 3)

		//body
		fill(255, 0, 0);
		rect(gameChar_x - 13, gameChar_y - 50, 26, 30);
		//legs
		fill(0);
		rect(gameChar_x - 13, gameChar_y - 20, 10, 15);
		rect(gameChar_x + 3, gameChar_y - 20, 10, 15);
		//shoes
		fill(0, 0, 255);
		rect(gameChar_x - 18, gameChar_y - 10, 15, 10);
		rect(gameChar_x - 2, gameChar_y - 10, 15, 10);
		//arms
		fill(0);
		rect(gameChar_x - 23, gameChar_y - 50, 10, 15);
		rect(gameChar_x + 3, gameChar_y - 50, 10, 15);

	}
	else if (isRight) {
		// add your walking right code
		fill(200, 100, 100);
		ellipse(gameChar_x, gameChar_y - 60, 25);
		//eye
		fill(0)
		ellipse(gameChar_x + 8, gameChar_y - 60, 3, 3)
		//body
		fill(255, 0, 0);
		rect(gameChar_x - 13, gameChar_y - 50, 26, 30);
		//legs
		fill(0);
		rect(gameChar_x - 13, gameChar_y - 20, 10, 15);
		rect(gameChar_x + 3, gameChar_y - 20, 10, 15);
		//shoes
		fill(0, 0, 255);
		rect(gameChar_x - 13, gameChar_y - 10, 15, 10);
		rect(gameChar_x + 3, gameChar_y - 10, 15, 10);
		//arms
		fill(0);
		rect(gameChar_x - 13, gameChar_y - 50, 10, 15);
		rect(gameChar_x + 13, gameChar_y - 50, 10, 15);

	}
	else if (isFalling || isPlummeting) {
		// add your jumping facing forwards code
		fill(200, 100, 100);
		ellipse(gameChar_x, gameChar_y - 60, 25);

		//eye
		fill(0);
		ellipse(gameChar_x - 8, gameChar_y - 60, 3, 3)
		ellipse(gameChar_x + 8, gameChar_y - 60, 3, 3)

		//body
		fill(255, 0, 0);
		rect(gameChar_x - 13, gameChar_y - 50, 26, 30);
		//legs
		fill(0);
		rect(gameChar_x - 13, gameChar_y - 20, 10, 15);
		rect(gameChar_x + 3, gameChar_y - 20, 10, 15);
		//arms
		fill(0);
		rect(gameChar_x - 23, gameChar_y - 50, 10, 13);
		rect(gameChar_x + 13, gameChar_y - 50, 10, 13);
	}
	else {
		// add your standing front facing code
		fill(200, 100, 100);
		ellipse(gameChar_x, gameChar_y - 50, 25);

		//eye
		fill(0);
		ellipse(gameChar_x - 8, gameChar_y - 52, 3, 3)
		ellipse(gameChar_x + 8, gameChar_y - 52, 3, 3)
		//body
		fill(255, 0, 0);
		rect(gameChar_x - 13, gameChar_y - 40, 26, 30);
		//legs
		fill(0);
		rect(gameChar_x - 13, gameChar_y - 10, 10, 15);
		rect(gameChar_x + 3, gameChar_y - 10, 10, 15);
		//arms
		fill(0);
		rect(gameChar_x - 22, gameChar_y - 40, 10, 25);
		rect(gameChar_x + 13, gameChar_y - 40, 10, 25);

	}


	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (isLeft == true) {
		gameChar_x -= 5
	}
	if (isRight == true) {
		gameChar_x += 5
	}

	if (gameChar_y <= floorPos_y) {
		gameChar_y += 2
		isFalling = true
	} else {
		isFalling = false
	}

	if (isPlummeting) {
		gameChar_y += 20
	}
}


function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.
	if(isPlummeting){
		return  // Prevent movement if the character is plummeting
	}

	if (keyCode == 37) {
		console.log("left arrow")
		isLeft = true;
	} else if (keyCode == 39) {
		console.log('right arrow')
		isRight = true;
	}
	if (keyCode == 38) {
		if (isFalling = true) {
			gameChar_y -= 100
		}

	}
	if (keyCode == 38 && isLeft) {
		if (isFalling == true) {
			gameChar_y -= 100
		}
	}
	if (keyCode == 38 && isRight) {
		if (isFalling = true) {
			gameChar_y -= 100
		}
	}

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.
	if (keyCode == 37) {
		console.log("left arrow")
		isLeft = false;
	} else if (keyCode == 39) {
		console.log('right arrow')
		isRight = false;
	}
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
}


