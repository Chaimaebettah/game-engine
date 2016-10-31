
var playerChoice = 'char-cat-girl';
var startGame = false;
var player = null;
var choice = document.getElementsByTagName("img");
for(var i = 0; i < choice.length; i++) {
  choice[i].addEventListener("click", function (e) {
    console.log(e.target.id);
    playerChoice = e.target.id;
    document.getElementById('intro').style = 'display:none';
    startGame = true;
    player.sprite = 'images/'+playerChoice+'.png';
  });
}



var completionCounter = 0;
// Enemies our player must avoid
var Enemy = function (x, y) {
  this.x = x;
  this.y = y;
  this.positionX = x;

  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //Math.floor(Math.random()*dt*this.x);
  this.x += dt * (Math.floor(Math.random() * (100)) + 100);
  document.getElementById("level").innerHTML = "Level :1";
  if (this.x > 600) {
    this.x = this.positionX;
  }
  if (completionCounter >= 40) {
    //document.getElementById("level").innerHTML="Level :2";
    //console.log("heeey");
    this.x += dt * (Math.floor(Math.random() * (250)) + 100);
  }

};

//Math.floor(Math.random()*256)
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function (imageName) {
  this.x = 200;
  this.y = 400;
  this.sprite = 'images/'+imageName+'.png';
  //this.sprite = choicePlayer(makeChoice);

};
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function (dt) {
  player.checkCollisions(dt);

};

player = new Player(playerChoice);


Player.prototype.handleInput = function (e) {
  if (this.y <= 0) {
    return;
  }
  ;

  if (e == "right" && this.x < 400) {
    this.x += 100;
  } else if (e == "left" && this.x > 0) {
    this.x -= 100;
  } else if (e == "up" && this.y > 0) {
    this.y -= 80;
  } else if (e == "down" && this.y < 400) {
    this.y += 80;
  }

  player.didPlayerFinish();

};

Player.prototype.reset = function (playerChoice) {
  this.x = 200;
  this.y = 400;
  this.sprite = 'images/'+playerChoice+'.png';
};

//var clicks = 0;
//function click() {
//    clicks += 1;
//    document.getElementById("clicks").innerHTML = clicks;
//};
Player.prototype.checkCollisions = function () {
  //console.log(this.x);
  allEnemies.forEach(function (enemy) {
    //console.log(player.x);
    //console.log(enemy.x);
    if (enemy.x < player.x + 30 &&
      enemy.x + 30 > player.x &&
      enemy.y < player.y + 30 &&
      enemy.y + 30 > player.y) {
      completionCounter = 0;
      document.getElementById("score").innerHTML = " Your Score :" + completionCounter;
      player.reset(playerChoice);
    }
  });
  allStones.forEach(function (stone) {
    if (stone.x < player.x + 55 &&
      stone.x + 55 > player.x &&
      stone.y < player.y + 55 &&
      stone.y + 55 > player.y) {
      completionCounter += 30;
      document.getElementById("score").innerHTML = " Your Score :" + completionCounter;
      stone.reset()
    }
  });

};


Player.prototype.didPlayerFinish = function () {
  //console.log(player.y);
  if (player.y == 0) {
    completionCounter++;
    document.getElementById("score").innerHTML = " Your Score :" + completionCounter;
    player.sprite = 'images/key.png';
    setTimeout(function () {
      player.reset(playerChoice)
    }, 2000);
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-80, 65);
var enemy2 = new Enemy(-200, 145);
var enemy3 = new Enemy(-490, 230);
var enemy4 = new Enemy(-290, 300);


var allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


var Stones = function (x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/1.png';
};
Stones.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Stones.prototype.update = function (dt) {

};

Stones.prototype.reset = function () {
  this.x = Math.floor((Math.random() * 300) + 100);
  this.y = Math.floor((Math.random() * 200) + 200);

};

var stone1 = new Stones(110, 90);
var stone2 = new Stones(214, 175);
//var stone3 = new Stones(420,340);
//var stone4 = new Stones(20,260);


var allStones = [];
allStones.push(stone1, stone2);

