const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const textInput = document.getElementById('text')
const speedInput = document.getElementById('speed')
let currentCharacter

if ('speechSynthesis' in window) {
playButton.addEventListener('click', () => {
  if (textInput.value != '') {
  playText(textInput.value)
  }
})
}
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)
speedInput.addEventListener('input', () => {
  stopText()
  playText(utterance.text.substring(currentCharacter))
})

const utterance = new SpeechSynthesisUtterance()
utterance.addEventListener('end', () => {
  textInput.disabled = false
})
utterance.addEventListener('boundary', e => {
  currentCharacter = e.charIndex
})

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume()
  }
  if (speechSynthesis.speaking) return
  utterance.text = text
  var voices = window.speechSynthesis.getVoices()
  window.speechSynthesis.onvoiceschanged = function() {
    voices=window.speechSynthesis.getVoices()
}
utterance.voice = voices.filter(function(voice) { return voice.name == 'Microsoft Zira Desktop - English (United States)'; })[0]
  /*Or set if you want Microsoft's default female voice: utterance.voice = voices[10]*/
  /* Or if you just wanna use default male voice (MS David_En-US), just don't set any voice.*/
  utterance.voiceURI = "native"
  utterance.lang = 'en-US'
  utterance.volume = 1
  utterance.pitch = 1.5
  utterance.rate = speedInput.value || 1
  textInput.disabled = true
  speechSynthesis.speak(utterance)
  /* or you could simply import say.js. The link to it: https://rawgit.com/JudahRR/Say.js/master/libs/say.js
  Here's what the file (actually the lib) contains: function say(m){ 	var msg = new SpeechSynthesisUtterance(); 	var voices = window.speechSynthesis.getVoices(); 	msg.voice = voices[10]; 	msg.voiceURI = "native"; 	msg.volume = 1; 	msg.rate = 1; 	msg.pitch = 0.8; 	msg.text = m; 	msg.lang = 'en-US';   	speechSynthesis.speak(msg); }
  */
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
  speechSynthesis.resume()
  speechSynthesis.cancel()
}