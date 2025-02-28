// Game project 6 Adding Game Mechanics
let gameChar_x;
let gameChar_y;
let floorPos_y;
let isRight;
let isLeft;
let isPlummeting;
let isFalling;
let collectable;
let scrollPos = 0;
let trees_x;
let treePos_y;
let clouds;
let mountains;
let cameraPosX;
let collectables;
let canyons;
let gameScore;
let flagpole;
let gameChar_world_x;
let lives;
let platforms;
let enemies;
let jumpSound;
let collectCoinSound;
let gameOverSound;
let reachFlagSound;
let enemySound;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  lives = 3;
  gameScore = 0;
  isPlatformContact = false;
  startGame();
}

function draw() {
  cameraPosX = gameChar_x - width / 2;
  ///////////DRAWING CODE//////////
  background(100, 155, 255); //fill the sky blue
  noStroke();
  //draw some green ground
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y);

  //score
  fill(255);
  textSize(32);
  noStroke();
  text("score: " + gameScore, 70, 20);

  drawLives();
  gameOver();

  push();
  translate(-cameraPosX, 0);

  if (flagpole.isReached) {
    isLeft = false;
    isRight = false;
    // Level complete text near the flag
    fill(255, 0, 0); // Text color
    textSize(32);
    noStroke();
    text("Level Complete!!!", flagpole.x_pos + 50, height / 2 - 100);
  }
  // trees
  drawTrees();
  //clouds
  drawClouds();
  checkPlayerDie();
  // mountains
  drawMountains();
  //flagpole
  renderFlagpole();
  //draw the canyon
  for (let i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
    checkCanyon(canyons[i]);
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    let isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);
    if (isContact) {
      enemySound.play();
      if (lives > 0) {
        startGame();
        break;
      }
    }
  }

  //collectable
  for (let i = 0; i < collectables.length; i++) {
    drawCollectable(collectables[i]);
    checkCollectable(collectables[i]);
  }

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }
  //the game character

  drawCharacter();

  //move the game character
  if (isLeft) {
    gameChar_x -= 5;
  }

  if (isRight) {
    gameChar_x += 5;
  }

  if (gameChar_y < floorPos_y && !isPlummeting) {
    
    let isContact = false;
    for (let i = 0; i < platforms.length; i++) {
      if (platforms[i].checkContact(gameChar_world_x, gameChar_y)) {
        isContact = true;
        isPlatformContact = true;
        break;
      }
    }
    // Apply normal gravity
    if (isContact == false) {
      gameChar_y += 2;
      isFalling = true;
    }
  } else if (isPlummeting) {
    // Apply faster gravity (plummeting) when in the canyon
    gameChar_y += 5; // You can increase this for faster falling
  } else {
    // Make sure the character stops at the floor if not plummeting
    gameChar_y = floorPos_y;
    isFalling = false;
  }

  if (isFalling && gameChar_y == floorPos_y) {
    // play sound if was falling and now is on the floor
    jumpSound.play();
  }

  if (isPlatformContact && gameChar_y == floorPos_y - 110) {
    // play sound if character on platform
    isPlatformContact = false;
    jumpSound.play();
  }

  if (isPlummeting) {
    gameChar_y += 20;
  }

  pop();

  if (flagpole.isReached == false) {
    checkFlagpole();
  }

  gameChar_world_x = gameChar_x - scrollPos;
}

function preload() {
  jumpSound = loadSound("assets/jumpland.wav");
  jumpSound.setVolume(0.1);
  collectCoinSound = loadSound("assets/coin2.wav");
  collectCoinSound.setVolume(0.1);
  gameOverSound = loadSound("assets/gameover.mp3");
  gameOverSound.setVolume(0.1);
  reachFlagSound = loadSound("assets/reach-flag.wav");
  reachFlagSound.setVolume(0.1);
  enemySound = loadSound("assets/enemy-roar.mp3");
  enemySound.setVolume(0.1);
}

function keyPressed() {
  if (lives <= 0 || flagpole.isReached) {
    return; // Ignore input if game is over or level is completed
  }
  // control the animation of the character when keys are pressed.
  if (isPlummeting) {
    return; // Prevent movement if the character is plummeting
  }
  if (keyCode == 37) {
    isLeft = true;
  } else if (keyCode == 39) {
    isRight = true;
  }
  if (keyCode == 38) {
    isJumping = true;
    if (!isFalling == true) {
      gameChar_y -= 200;
    }
  }

  if (keyCode == 38 && isLeft) {
    if (isFalling == true) {
      gameChar_y -= 100;
    }
  }
  if (keyCode == 38 && isRight) {
    if (isFalling == true) {
      gameChar_y -= 100;
    }
  }
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

function drawClouds() {
  for (let i = 0; i < clouds.length; i++) {
    fill(255, 255, 255); // White color for the cloud
    ellipse(
      clouds[i].x_pos,
      clouds[i].y_pos,
      clouds[i].width,
      clouds[i].height
    ); // First ellipse (left)
    ellipse(
      clouds[i].x_pos + 50,
      clouds[i].y_pos - 30,
      clouds[i].width - 30,
      clouds[i].height - 20
    ); // Second ellipse (middle)
    ellipse(
      clouds[i].x_pos + 100,
      clouds[i].y_pos,
      clouds[i].width,
      clouds[i].height
    );
  }
}

function drawMountains() {
  for (let i = 0; i < mountains.length; i++) {
    fill(150, 150, 150); // Light gray color for the mountain
    triangle(
      mountains[i].x_pos,
      mountains[i].y_pos,
      mountains[i].x_pos + mountains[i].width / 2,
      mountains[i].y_pos - mountains[i].height,
      mountains[i].x_pos + mountains[i].width,
      mountains[i].y_pos
    );
  }
}

function drawTrees() {
  for (let i = 0; i < trees_x.length; i++) {
    fill(120, 100, 40);
    rect(trees_x[i], treePos_y, 60, 150);

    fill(0, 155, 0);
    triangle(
      trees_x[i] - 50,
      treePos_y + 50,
      trees_x[i] + 30,
      treePos_y - 50,
      trees_x[i] + 110,
      treePos_y + 50
    );

    triangle(
      trees_x[i] - 50,
      treePos_y,
      trees_x[i] + 30,
      treePos_y - 100,
      trees_x[i] + 110,
      treePos_y
    );
  }
}
function drawCollectable(t_collectable) {
  // Only draw the collectible if it hasn't been found
  if (!t_collectable.isFound) {
    fill(255, 215, 0); // Gold color
    ellipse(
      t_collectable.x_pos - scrollPos,
      t_collectable.y_pos,
      t_collectable.size,
      t_collectable.size
    );
  }
}

function drawCanyon(t_canyon) {
  fill(100, 100, 255);
  rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
}

function drawLives() {
  for (let i = 0; i < lives; i++) {
    // Draw each heart spaced 50px apart starting at (20, 20)
    drawHeart(70 + i * 50, 40, 30); // Adjust the size if needed
  }
}
//the game character
function drawCharacter() {
  if (isLeft && isFalling) {
    fill(200, 100, 100);
    ellipse(gameChar_x, gameChar_y - 60, 25);
    //eye
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 3, 3);
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
  } else if (isRight && isFalling) {
    fill(200, 100, 100);
    ellipse(gameChar_x, gameChar_y - 60, 25);
    //eye
    fill(0);
    ellipse(gameChar_x + 8, gameChar_y - 60, 3, 3);
    //body
    fill(255, 0, 0);
    rect(gameChar_x - 13, gameChar_y - 50, 26, 30);
    //legs
    fill(0);
    rect(gameChar_x - 13, gameChar_y - 20, 10, 15);
    rect(gameChar_x + 3, gameChar_y - 20, 10, 15);
    fill(0, 0, 255);
    triangle(
      gameChar_x + 13,
      gameChar_y - 20,
      gameChar_y - 30,
      gameChar_x + 13,
      gameChar_y - 5
    );
    //shoes
    fill(0, 0, 255);
    rect(gameChar_x - 13, gameChar_y - 10, 15, 10);
    rect(gameChar_x + 3, gameChar_y - 10, 15, 10);
    //arms
    fill(0);
    rect(gameChar_x - 20, gameChar_y - 50, 10, 15);
    rect(gameChar_x + 13, gameChar_y - 50, 10, 15);
  } else if (isLeft) {
    fill(200, 100, 100);
    ellipse(gameChar_x, gameChar_y - 60, 25);
    //eye
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 3, 3);

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
  } else if (isRight) {
    fill(200, 100, 100);
    ellipse(gameChar_x, gameChar_y - 60, 25);
    //eye
    fill(0);
    ellipse(gameChar_x + 8, gameChar_y - 60, 3, 3);
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
  } else if (isFalling || isPlummeting) {
    fill(200, 100, 100);
    ellipse(gameChar_x, gameChar_y - 60, 25);
    //eye
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 60, 3, 3);
    ellipse(gameChar_x + 8, gameChar_y - 60, 3, 3);
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
  } else {
    fill(200, 100, 100);
    ellipse(gameChar_x, gameChar_y - 50, 25);
    //eye
    fill(0);
    ellipse(gameChar_x - 8, gameChar_y - 52, 3, 3);
    ellipse(gameChar_x + 8, gameChar_y - 52, 3, 3);
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
}
function gameOver() {
  if (lives === 0) {
    fill(255, 0, 0);
    textSize(32);
    noStroke();
    text("Game over!!!", 70, 50);
    gameOverSound.play(-7, 1, 1, 0, 3);
    noLoop(); // Stops the draw loop, effectively pausing the game
  }
}

function drawHeart(x, y, size) {
  fill(255, 0, 0); // Red color for heart
  strokeWeight(2); // Set outline thickness

  // Begin drawing the heart
  beginShape();

  // Left side of the heart
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 4, x, y + size);

  // Right side of the heart
  bezierVertex(x + size, y + size / 4, x + size / 2, y - size / 2, x, y);

  // Close the shape
  endShape(CLOSE);
}

function renderFlagpole() {
  push();
  fill(255, 0, 0);
  strokeWeight(5);
  stroke(180);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  fill(255, 215, 0);
  noStroke();
  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }
  pop();
}

function checkCollectable(t_collectable) {
  // Only check for collision if the collectible hasn't been found yet
  if (!t_collectable.isFound) {
    // Check for collision using the distance between character and collectible
    if (
      dist(
        gameChar_x,
        gameChar_y,
        t_collectable.x_pos - scrollPos,
        t_collectable.y_pos
      ) <
      t_collectable.size / 2
    ) {
      // If colliding, mark as found and increase the score
      t_collectable.isFound = true;
      collectCoinSound.play();
      gameScore += 1;
    }
  }
}

function checkCanyon(t_canyon) {
  isPlummeting = false; // Default to false at the start of the loop
  for (let i = 0; i < canyons.length; i++) {
    let canyon = canyons[i];
    if (
      gameChar_x > canyon.x_pos &&
      gameChar_x < canyon.x_pos + canyon.width &&
      gameChar_y >= floorPos_y
    ) {
      isPlummeting = true;
      break; // Exit the loop once inside a canyon
    }
  }
}

function checkFlagpole() {
  let d = abs(gameChar_world_x - flagpole.x_pos);
  if (d < 15) {
    flagpole.isReached = true;
    reachFlagSound.play();
  }
}

function checkPlayerDie() {
  if (gameChar_y > height) {
    lives--;
    if (lives > 0) {
      startGame();
    }
  }
}

function startGame() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  isLeft = false;
  isRight = false;
  isFalling = false;

  flagpole = {
    x_pos: 3500,
    isReached: false,
  };
  platforms = [];
  platforms.push(createPlatforms(100, floorPos_y - 100, 100));
  platforms.push(createPlatforms(850, floorPos_y - 100, 100));
  enemies = [];
  enemies.push(new Enemy(100, floorPos_y - 10, 100));
  //tree
  trees_x = [10, 480, 680, 900, 1150, 2500];
  treePos_y = height / 2;
  //clouds
  clouds = [
    {
      x_pos: 300,
      y_pos: 100,
      width: 150,
      height: 60,
    },
    {
      x_pos: 600,
      y_pos: 100,
      width: 150,
      height: 60,
    },
    {
      x_pos: 900,
      y_pos: 100,
      width: 150,
      height: 60,
    },
    {
      x_pos: 1200,
      y_pos: 100,
      width: 150,
      height: 60,
    },
    {
      x_pos: 1800,
      y_pos: 100,
      width: 150,
      height: 60,
    },
  ];
  //mountains
  mountains = [
    {
      x_pos: 100,
      y_pos: 435,
      width: 150,
      height: 200,
    },
    {
      x_pos: 560,
      y_pos: 435,
      width: 100,
      height: 200,
    },
    {
      x_pos: 2000,
      y_pos: 435,
      width: 150,
      height: 200,
    },
  ];
  cameraPosX = 0;
  collectables = [
    { x_pos: 200, y_pos: 410, size: 50, isFound: false },
    { x_pos: -60, y_pos: 410, size: 50, isFound: false },
    { x_pos: 900, y_pos: 410, size: 50, isFound: false },
    { x_pos: 1200, y_pos: 410, size: 50, isFound: false },
    { x_pos: 2000, y_pos: 410, size: 50, isFound: false },
  ];

  canyons = [
    { x_pos: 300, width: 100 },
    { x_pos: -200, width: 50 },
    { x_pos: 1000, width: 150 },
    { x_pos: 3000, width: 200 },
  ];
}

function createPlatforms(x, y, length) {
  let p = {
    x: x,
    y: y,
    length: length,
    draw: function () {
      fill(255, 0, 255);
      rect(this.x, this.y, this.length, 20);
    },
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.x && gc_x < this.x + this.length) {
        let d = this.y - gc_y;
        if (d == -2) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}

function Enemy(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;
  this.currentX = x;
  this.inc = 1;
  this.update = function () {
    this.currentX += this.inc;
    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  };
  this.draw = function () {
    this.update();
    fill(255, 0, 0);
    ellipse(this.currentX, this.y, 20, 20);
  };
  this.checkContact = function (gc_x, gc_y) {
    let d = dist(gc_x, gc_y, this.currentX, this.y);
    if (d < 20) {
      return true;
    }
    return false;
  };
}