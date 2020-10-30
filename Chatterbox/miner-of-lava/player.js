const KEYS = {
  SPACE: 32,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
}

var player= {
  width: 18,
  height: 28,
  y: 300,
  x: 50,
  y_velocity: 0,
  jumpForce: 20,
  isJumping: false,
  speed: 8,
  gravity: 1.5,
  pressedKeys: [],
  KEY: KEYS,
  left: false,
  right: false,
  idle: true
}



function movePlayer () {

    if (player.pressedKeys[player.KEY.SPACE] && player.isJumping == false) {
      player.gravity = 1.5;
      player.y_velocity -= player.jumpForce;
      player.isJumping = true;
      jumpSound = new Sound("", false);
      jumpSound = new Sound("./Jump.mp3", false);
      jumpSound.play();
    }

    if (player.pressedKeys[player.KEY.RIGHT]) {
      player.x += player.speed;
      player.right = true;
      player.left = false;
    }
    if (player.pressedKeys[player.KEY.LEFT]) {
      player.x -= player.speed;
      player.left = true;
      player.right = false;
    }

    player.y_velocity += player.gravity;
    player.y += player.y_velocity;
    player.y_velocity *= 0.9;

    for (let i=0; i<blocks.length; i++) {
      if (isColliding(blocks[i])) {
        if (!isLava(blocks[i])) {
          if (!isCoin(blocks[i])) {
            //player.gravity = 0;
            player.y = blocks[i].Y- player.height;
            player.y_velocity = 0;
            player.isJumping = false;

          }else {
            $(blocks[i].Id).remove();
            playerCoins += 1;
            blocks.splice(i, 1);
            coinsSound = new Sound("", false);
            coinsSound = new Sound("./GetCoins.mp3", false);
            coinsSound.play();
          }
        }else {
          numBlock = 0;
          playerCoins = 0;
          nbCoins = 0;
          idCoins = 0;
          resetPosPLayer();
          clear();
        }
      }
    }

    if (player.y > 500) {
      numBlock = 0;
      playerCoins = 0;
      nbCoins = 0;
      idCoins = 0;
      resetPosPLayer();
      clear();
    }

    $("#player").css ({
      "top": player.y  + "px",
      "left": player.x + "px",
      "width": player.width + "px",
      "height": player.height + "px",
    })

}

function playerSprite() {
  if (player.isJumping) {
    if (player.right) {
      document.getElementById("playerImg").setAttribute('src', './heroSaut.png');
    }else if (player.left) {
      document.getElementById("playerImg").setAttribute('src', './heroSautL.png');
    }else {
      document.getElementById("playerImg").setAttribute('src', './heroSaut.png');
    }
  }else {
    if (player.right && !player.idle) {
      document.getElementById("playerImg").setAttribute('src', './heroMarche.png');
    } else if (player.left && !player.idle) {
      document.getElementById("playerImg").setAttribute('src', './heroMarcheL.png');
    }else if (player.idle && player.left) {
      document.getElementById("playerImg").setAttribute('src', './heroL.png');
    }else if (player.idle && player.right || player.idle && !player.right && !player.left) {
      document.getElementById("playerImg").setAttribute('src', './hero.png');
    }
  }

}

function resetPosPLayer() {
  player.y = 300;
  player.x = 50;
  player.gravity = 1.5;
}

function isColliding (obj) {
  if (player.x > obj.X + obj.Width) return false;
  if (player.x + player.width < obj.X) return false;
  if (player.y > obj.Y + obj.Height) return false;
  if (player.y + player.height + 5 < obj.Y) return false;
  return true;
}

function isLava (obj) {
  if(obj.Status == "lava")return true;
  if(obj.Status == "pique")return true;
  if(obj.Status == "movingLava")return true;
  return false;
}

function isCoin (obj) {
  if(obj.Status == "coin")return true;
  return false;
}
