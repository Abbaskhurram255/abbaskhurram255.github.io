backgroundmusic = new Sound("./music.mp3", true, false);
backgroundmusic.play();

finishedMusic = new Sound("./Finished.mp3", false, "END");
coinsSound = new Sound("./GetCoins.mp3", false, "true");
jumpSound = new Sound("./Jump/mp3", false, "true");

gameFinished = false;

var gameLoop = setInterval(function() {

  $(document).keydown(function(e) {
    player.pressedKeys[e.which] = true;
    player.idle = false;
  });
  $(document).keyup(function(e) {
    player.pressedKeys[e.which] = false;
    player.idle = true;
  });
  if (!gameFinished) {
    movePlayer();
    playerSprite();
    moveLava();
    moveCoins();
  }

  if (playerCoins >= nbCoins) {
    if (numLevel < 10) {
      numBlock = 0;
      numLevel += 1;
      playerCoins = 0;
      nbCoins = 0;
      idCoins = 0;
      resetPosPLayer();
      clear();
    } else {
      $('#player').each(function() {
        this.remove();
      });
      document.getElementById("end").style.display = "block";
      backgroundmusic.stop();
      if (!playerWon) {
        finishedMusic.play();
      }
        gameFinished = true;
    }
  }

}, 30);
