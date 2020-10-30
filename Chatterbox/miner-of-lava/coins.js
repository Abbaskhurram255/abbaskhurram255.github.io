function moveCoins() {

  for (let i=0; i<blocks.length; i++) {
    if(blocks[i].Status == "coin") {
      if (blocks[i].Y >= blocks[i].beginPos + 10) {
        blocks[i].moveStep = "UP";
      }else if (blocks[i].Y <= blocks[i].beginPos) {
        blocks[i].moveStep = "DOWN";
      }

      if (blocks[i].moveStep == "UP") {
        blocks[i].Y -= 0.75;
      }
      if (blocks[i].moveStep == "DOWN") {
        blocks[i].Y += 0.75;
      }

      $(blocks[i].Id).css ({
        "top": blocks[i].Y  + "px",
      })
    }
  }

}
