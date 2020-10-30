playerWon = false;

function Sound(src, isBackgroundMusic, isLittleSound) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
        this.sound.play();
        if (isBackgroundMusic) {
          setTimeout(this.rebootSound, 46000);
        }
        if (isLittleSound === "END") {
          if (!playerWon && !gameFinished) {
            setTimeout(this.won, 1000);
          }
        }
    }

    this.stop = function(){
        this.sound.pause();
    }

    this.rebootSound = function() {
      backgroundmusic.play();
    }

    this.won = function() {
      playerWon = true;
    }
}
