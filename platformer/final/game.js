var items;
var game;
var platforms;
var stars;
var player;
var cursor;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 100;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(375, 400, 'coin');
  createItem(250, 350, 'coin');
  createItem(500, 200, 'coin');
  createItem(300, 250, 'coin');
  createItem(450, 100, 'coin');
  createItem(200, 325, 'poison')
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 550, 'platform');
  platforms.create(200, 400, 'platform');
  platforms.create(450, 300, 'platform');
  platforms.create(550, 150, 'platform');
  platforms.setAll('body.immovable', true);
}


// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 8, true);
}

// create the winning star and add to screen
function createStar() {
  stars = game.add.physicsGroup();
  var star = stars.create(750, 500, 'star');
  star.animations.add('spin');
  star.animations.play('spin', 8, true);
}


// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if(item.key === 'coin') {
    currentScore = currentScore + 20;
  }
  if (item.key === 'poison') {
    currentScore = currentScore - 20;
  }

  if (currentScore === winningScore) {
      createStar();
  }
}

// when the player collects a star on the screen
function starHandler(player, star) {
  star.kill();
  won = true;
}

// when the page is loaded, start the game
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
};


function preload () {
  game.stage.backgroundColor = '#5db1ad';

  game.load.image('platform', 'platform.png');
  game.load.spritesheet('player', 'player.png', 32, 36);
  game.load.spritesheet( 'coin', 'coin.png', 32, 42);
  game.load.spritesheet( 'poison', 'poison.png', 32, 42);
  game.load.spritesheet('star', 'star.png', 32, 38);
}

function create () {
  player = game.add.sprite(50, 600, 'player');
  player.animations.add('walk');
  player.anchor.setTo(0.5, 1);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.body.gravity.y = 500;

  addItems();
  addPlatforms();

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
  winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
  winningMessage.anchor.setTo(0.5, 1);
}


function update () {
  text.text = "SCORE: " + currentScore;
  game.physics.arcade.collide(player, platforms);
  game.physics.arcade.overlap(player, items, itemHandler);
  game.physics.arcade.overlap(player, stars, starHandler);
  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    player.animations.play('walk', 10, true);
    player.body.velocity.x = -180;
    player.scale.x = - 1;
  }
  // is the right cursor key pressed?
  else if (cursors.right.isDown) {
    player.animations.play('walk', 10, true);
    player.body.velocity.x = 180;
    player.scale.x = 1;
  }
  // player doesn't move
  else {
    player.animations.stop();
  }


  if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
    player.body.velocity.y = -400;
  }

  // when the player winw the game
  if (won) {
    winningMessage.text = "YOU WIN!!!";
  }
}
