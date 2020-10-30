function moveLava() {

  for (let i=0; i<blocks.length; i++) {
    if(blocks[i].Status == "movingLava") {
      blocks[i].Y += 2;
      $(blocks[i].Id).css ({
        "top": blocks[i].Y  + "px",
      })
      if (blocks[i].Y >= 340) {
        blocks[i].Y = blocks[i].beginPos;
      }
    }
    if(blocks[i].Status == "movingLavaAway") {
        if (blocks[i].Y >= blocks[i].beginPos + 210) {
          blocks[i].Y = blocks[i].beginPos;
        }
    }
  }

}

function isLavaColliding (lava) {
  for (let i=0; i<blocks.length; i++) {
    if (blocks[i].Status != "movingLava" && blocks[i].Status != "lava") {
      if (lava.X > blocks[i].X + blocks[i].Width) return false;
      if (lava.X + lava.Width < blocks[i].X) return false;
      if (lava.Y < blocks[i].Y + blocks[i].Height) return false;
      if (lava.Y + lava.Height + 5 < blocks[i].Y) return false;
      return true;
    }
  }
}
