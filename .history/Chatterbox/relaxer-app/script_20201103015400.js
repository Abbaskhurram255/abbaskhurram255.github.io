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

// Speech Engine section
//start block
const playButton = document.querySelector("#askBtn");
const mesg = document.querySelector("#message");
const textInput = document.querySelector("#searchInput");
let currentCharacter;

if ("speechSynthesis" in window) {
  log("Speech Synthesis is supported!");
  playButton.addEventListener("click", () => {
    if (mesg.innerText != "") {
      if (speechSynthesis.speaking) {
        stopText();
      }
      playText(mesg.innerText);
      //Show a snackbar each time Speech Synthesis reads the text

    }
  });
} else {
  log("Speech Synthesis isn't supported by your browser");
}

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("end", () => {
  textInput.disabled = false;
  if (
    snack.innerText ==
    "Speech synthesis is ongoing. You can't enter text in the input field until it finishes reading."
  ) {
    snack.className = snack.className.replace("show", "");
  }
});
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
  /*Or set this if you want Microsoft's default female voice: utterance.voice = voices[10]*/
  /* Or if you just wanna use default male voice (MS David_En-US), just don't set any voice.*/
  utterance.pitch = 1.5;
  utterance.voiceURI = "native";
  utterance.lang = "en-US";
  utterance.volume = 1;
  utterance.rate = 1;
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
  /* or you could simply import say.js. The link to it: https://rawit.com/JudahRR/Say.js/master/libs/say.js */
}

//Call this function to (immediately) stop the Speech synthesis:
function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
//end block