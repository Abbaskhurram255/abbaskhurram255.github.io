//nbBlocks = 11;

numLevel = 0;
levels = [map1, map2, map3, map4, map5, map6, map7, map8, map9, map10];

let map = [];
map = levels[numLevel];

blocks = new Array();
numBlock = 0;
console.log('launch');

idCoins = 0;
idMovingLava = 0;
nbCoins = 0;
playerCoins = 0;
drawMap();
function drawMap() {

    for (let y=0; y<map.length; y++) {
      for (let x=0; x<map[y].length; x++) {

        if (map[y][x] == "W") {
          blocks[numBlock] = new Block(x*20, y*20, 20, 20, "#595959", "wall");
          let e = document.createElement('img');
          e.setAttribute('style', 'position: absolute;');
          e.setAttribute('src', './block.png');
          e.setAttribute('class', 'wall');
          e.style.left = blocks[numBlock].X + "px";
          e.style.top = blocks[numBlock].Y + "px";
          e.style.width = blocks[numBlock].Width + "px";
          e.style.height = blocks[numBlock].Height + "px";
          e.style.background = blocks[numBlock].Color;
          document.getElementById("screen").appendChild(e);
          numBlock += 1;
        }

        if (map[y][x] == "V") {
          blocks[numBlock] = new Block(x*20, y*20, 20, 20, "", "movingLava", idMovingLava);
          let e = document.createElement('img');
          e.setAttribute('src', './monster.png');
          e.setAttribute('style', 'position: absolute;');
          e.setAttribute('class', 'movingLava');
          e.setAttribute('id', 'mLava' + idMovingLava);
          e.style.left = blocks[numBlock].X + "px";
          e.style.top = blocks[numBlock].Y + "px";
          e.style.width = blocks[numBlock].Width + "px";
          e.style.height = blocks[numBlock].Height + "px";
          e.style.background = blocks[numBlock].Color;
          document.getElementById("screen").appendChild(e);
          numBlock += 1;
          idMovingLava += 1;
          //moveLavas.push(e);
        }

        if (map[y][x] == "X") {
          blocks[numBlock] = new Block(x*20, y*20, 20, 20, "", "pique", idMovingLava);
          let e = document.createElement('img');
          e.setAttribute('style', 'position: absolute;');
          e.setAttribute('src', './piques.png');
          e.setAttribute('class', 'lava');
          e.style.left = blocks[numBlock].X + "px";
          e.style.top = blocks[numBlock].Y + "px";
          e.style.width = blocks[numBlock].Width + "px";
          e.style.height = blocks[numBlock].Height + "px";
          e.style.background = blocks[numBlock].Color;
          document.getElementById("screen").appendChild(e);
          numBlock += 1;
          idMovingLava += 1;
          //moveLavas.push(e);
        }

        if (map[y][x] == "+") {
          blocks[numBlock] = new Block(x*20, y*20, 20, 20, "#ad1f1f", "lava");
          let e = document.createElement('div');
          e.setAttribute('style', 'position: absolute;');
          e.setAttribute('class', 'lava');
          e.style.left = blocks[numBlock].X + "px";
          e.style.top = blocks[numBlock].Y + "px";
          e.style.width = blocks[numBlock].Width + "px";
          e.style.height = blocks[numBlock].Height + "px";
          e.style.background = blocks[numBlock].Color;
          document.getElementById("screen").appendChild(e);
          numBlock += 1;
        }

        if (map[y][x] == "O") {
          blocks[numBlock] = new Block(x*20, y*20, 20, 20, "", "coin", idCoins);
          let e = document.createElement('img');
          e.setAttribute('style', 'position: absolute;');
          e.setAttribute('src', './coin.png');
          e.setAttribute('id', 'coins' + idCoins);
          e.setAttribute('class', 'coins');
          e.style.left = blocks[numBlock].X + "px";
          e.style.top = blocks[numBlock].Y + "px";
          e.style.width = blocks[numBlock].Width + "px";
          e.style.height = blocks[numBlock].Height + "px";
          e.style.background = blocks[numBlock].Color;
          document.getElementById("screen").appendChild(e);
          numBlock += 1;
          idCoins += 1;
          nbCoins += 1;
        }
      }
    }

}

function clear() {
  blocks = new Array();
  map = levels[numLevel];
  $('.wall').each(function() {
    this.remove();
  });
  $('.lava').each(function() {
    this.remove();
  });
  $('.movingLava').each(function() {
    this.remove();
  });
  $('.coins').each(function() {
    this.remove();
  });
  drawMap();
}
function Block(x, y, width, height, color, status, id) {
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
  this.Color = color;
  this.Status = status;
  if (status == "coin") {
    this.Id = "#coins" + id;
    this.beginPos = y;
    this.moveStep = "DOWN";
  }
  if (status == "movingLava" || status == "movingLavaAway") {
    this.Id = "#mLava" + id;
    this.beginPos = y - height;
  }
}
