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
var trees_x;
var treePos_y;
var clouds;
var mountains;
var cameraPosX = 0;



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
	//tree
	trees_x = [10, 480, 680, 900, 1150, 2500]
	treePos_y = height / 2;
	//clouds
	clouds = [
		{
			x_pos: 300,   // X position of the cloud
			y_pos: 100,   // Y position of the cloud
			width: 150,   // Width of the cloud
			height: 60    // Height of the cloud
		}, {
			x_pos: 600,   // X position of the cloud
			y_pos: 100,   // Y position of the cloud
			width: 150,   // Width of the cloud
			height: 60    // Height of the cloud
		}, {
			x_pos: 900,   // X position of the cloud
			y_pos: 100,   // Y position of the cloud
			width: 150,   // Width of the cloud
			height: 60    // Height of the cloud
		}, {
			x_pos: 1200,   // X position of the cloud
			y_pos: 100,   // Y position of the cloud
			width: 150,   // Width of the cloud
			height: 60    // Height of the cloud
		}, {
			x_pos: 1800,   // X position of the cloud
			y_pos: 100,   // Y position of the cloud
			width: 150,   // Width of the cloud
			height: 60    // Height of the cloud
		}]
	//mountains
	mountains = [
		{
			x_pos: 10,   // X position of the mountain
			y_pos: 435,   // Y position of the mountain (height of its base)
			width: 150,   // Width of the mountain
			height: 200   // Height of the mountain
		},
		{
			x_pos: 100,   // X position of the mountain
			y_pos: 435,   // Y position of the mountain (height of its base)
			width: 150,   // Width of the mountain
			height: 200   // Height of the mountain
		},
		{
			x_pos: 560,   // X position of the mountain
			y_pos: 435,   // Y position of the mountain (height of its base)
			width: 100,   // Width of the mountain
			height: 200   // Height of the mountain
		},
		{
			x_pos: 2000,   // X position of the mountain
			y_pos: 435,   // Y position of the mountain (height of its base)
			width: 150,   // Width of the mountain
			height: 200   // Height of the mountain
		}]
	cameraPosX = 0;
}

function draw() {

	///////////DRAWING CODE//////////
	cameraPosX = gameChar_x - width / 2;

	background(100, 155, 255); //fill the sky blue


	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
	push()
	translate(-cameraPosX, 0)

	// trees
	for (var i = 0; i < trees_x.length; i++) {

		fill(120, 100, 40)
		rect(trees_x[i], treePos_y, 60, 150)

		fill(0, 155, 0)
		triangle(trees_x[i] - 50, treePos_y + 50,
			trees_x[i] + 30, treePos_y - 50, trees_x[i] + 110, treePos_y + 50)

		triangle(trees_x[i] - 50, treePos_y, trees_x[i] + 30, treePos_y - 100, trees_x[i] + 110, treePos_y)
	}
	//clouds
	for (var i = 0; i < clouds.length; i++) {
		fill(255, 255, 255); // White color for the cloud
		ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].width, clouds[i].height); // First ellipse (left)
		ellipse(clouds[i].x_pos + 50, clouds[i].y_pos - 30, clouds[i].width - 30, clouds[i].height - 20); // Second ellipse (middle)
		ellipse(clouds[i].x_pos + 100, clouds[i].y_pos, clouds[i].width, clouds[i].height);

	}
	// mountains
	for (var i = 0; i < mountains.length; i++) {
		fill(150, 150, 150);// Light gray color for the mountain
		triangle(
			mountains[i].x_pos, mountains[i].y_pos,
			mountains[i].x_pos + mountains[i].width / 2, mountains[i].y_pos - mountains[i].height,
			mountains[i].x_pos + mountains[i].width, mountains[i].y_pos
		);
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
	if (isPlummeting) {
		return  // Prevent movement if the character is plummeting
	}

	if (keyCode == 37) {
		isLeft = true;
	} else if (keyCode == 39) {
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

	pop()
}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.
	if (keyCode == 37) {
		isLeft = false;
	} else if (keyCode == 39) {
		isRight = false;
	}

}


