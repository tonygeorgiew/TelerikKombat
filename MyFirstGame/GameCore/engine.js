var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {
    let imageSrc = document.getElementsByTagName('div')[0].className;

    game.load.image('mortal', 'assets/backgrounds/' + imageSrc);
    game.load.image('ground', 'assets/grounds/platform.jpg');
    game.load.image('star', 'assets/items/star.png');
    //Dude 1
    game.load.spritesheet('dude', 'assets/heroes/enemy.png', 38.5, 56);
    //Dude2
    game.load.spritesheet('fighter', 'assets/heroes/figher1Movement.png', 38, 61);
}

var player1;
var player2;

var platforms;
var cursors;
var cursors2;

var stars;
var score = 0;
var scoreText;

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'mortal');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player1 and its settings
    player1 = game.add.sprite(32, game.world.height - 150, 'fighter');
    player2 = game.add.sprite(32, game.world.height - 550, 'dude');

    //  We need to enable physics on the player1
    game.physics.arcade.enable(player1);
    game.physics.arcade.enable(player2);

    //  player1 physics properties. Give the little guy a slight bounce.
    player1.body.bounce.y = 0.2;
    player1.body.gravity.y = 300;
    player1.body.collideWorldBounds = true;

    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 300;
    player2.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player1.animations.add('left', [0, 1, 2], 10, true);
    player1.animations.add('right', [3, 4, 5], 10, true);

    player2.animations.add('left', [3, 4, 5], 10, true);
    player2.animations.add('right', [0, 1, 2], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++) {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyUP = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyDOWN = game.input.keyboard.addKey(Phaser.Keyboard.S);

}

function update() {

    //  Collide the player1 and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player1, platforms);
    hitPlatform = game.physics.arcade.collide(player2, platforms);
    hitPlatform = game.physics.arcade.collide(player1, player2);
    // var hitPlayers = game.physics.arcade.collide(player1,player2)
    //????????????????????????????

    game.physics.arcade.collide(stars, platforms);
    // game.physics.arcade.collide(player1,player2)

    //  Checks to see if the player1 overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player1, stars, collectStar, null, this);
    game.physics.arcade.overlap(player2, stars, collectStar, null, this);

    //  Reset the player1s velocity (movement)
    player1.body.velocity.x = 0;
    player2.body.velocity.x = 0;
    //cursors.addKeys(W,A,S,D);

    if (keyLeft.isDown) {
        player2.body.velocity.x = -150;

        player2.animations.play('left');
    } else if (keyRight.isDown) {
        //  Move to the right
        player2.body.velocity.x = 150;

        player2.animations.play('right');
    } else {
        //  Stand still
        player2.animations.stop();

        player2.frame = 4;
    }

    if (cursors.left.isDown) {
        //  Move to the left
        player1.body.velocity.x = -150;

        player1.animations.play('left');
    } else if (cursors.right.isDown) {
        //  Move to the right
        player1.body.velocity.x = 150;

        player1.animations.play('right');
    } else {
        //  Stand still
        player1.animations.stop();

        player1.frame = 4;
    }


    //  Allow the player1 to jump if they are touching the ground.
    // if (keyUp.isDown && player2.body.touching.down && hitPlatform) {
    //     player2.body.velocity.y = -350;
    // }
    if (cursors.up.isDown && player1.body.touching.down) {
        player1.body.velocity.y = -350;
    }

    if (keyUP.isDown && player2.body.touching.down) {
        player2.body.velocity.y = -350;
    }

}

function collectStar(player1, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}