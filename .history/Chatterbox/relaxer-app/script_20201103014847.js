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


if ("speechSynthesis" in window) {
  console.log("Speech Synthesis is supported!");
} else {
  console.log("Speech Synthesis isn't supported by your browser");
}

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex;
});

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  if (speechSynthesis.speaking) return;
  utterance.text = text;
  var voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = function () {
    voices = window.speechSynthesis.getVoices();
  };
  utterance.voice = voices.filter(function (voice) {
    return voice.name == "Microsoft Zira Desktop - English (United States)";
  })[0];
  utterance.pitch = 1.5;
  utterance.voiceURI = "native";
  utterance.lang = "en-US";
  utterance.volume = 1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

//Call this function to (immediately) stop the Speech synthesis:
function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}

