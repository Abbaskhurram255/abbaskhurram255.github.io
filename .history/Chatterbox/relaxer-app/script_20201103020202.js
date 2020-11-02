

const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  playText(text.innerText);
  container.className = 'container grow';

  setTimeout(() => {
    text.innerText = 'Hold';
    playText(text.innerText);

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      playText(text.innerText);
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);

