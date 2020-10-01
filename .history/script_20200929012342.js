/* load default (light) theme each time the window (aka body object (DOM document.body) loads) nd show a tooltip whenever searchInput is active. Run startTime function too */
window.onload = () => {
 $lTheme.attr('media', '');
 $dTheme.attr('media', 'none');
 islTh = true;
 isdTh = false;
 startTime();
 if (jQuery) {
  log("JQuery loaded successfully!");
 } else {
  log("Failed to load JQuery :(");
 }
 const tippy1 = document.querySelector('#searchInput');
 tippy(tippy1, {
  content: "Try asking for <strong onclick=\"$('#searchInput').val($(this).html());\" onmouseover=\"$(this).css('cursor', 'pointer');\">the weather</strong> or your <strong onclick=\"document.querySelector('#searchInput').value = 'whats my ' + this.innerHTML;\" onmouseover=\"$(this).css('cursor', 'pointer')\">name</strong>, <strong onclick=\"document.querySelector('#searchInput').value = 'whats my ' + this.innerHTML;\" onmouseover=\"$(this).css('cursor', 'pointer')\">age</strong>, or <strong onclick=\"document.querySelector('#searchInput').value = 'whats my ' + this.innerHTML;\" onmouseover=\"$(this).css('cursor', 'pointer')\">bday</strong>",
  followCursor: 'horizontal',
  interactive: true,  /* To add interactions and make your tippy's text highlight-able and selectable*/
  appendTo: document.body,
  animation: 'scale',
  duration: 1200,
  theme: "translucent",
  allowHTML: true,
  arrow: true,
  maxWidth: 370,
 });
 
 // Run ASK function whenever the user presses return (enter) key
 $('#searchInput').keydown(function(e) {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      ask();
    }
 });

 //optional* $(document).ready(function(){
 	$('#message').animate({height:'toggle', opacity: 'toggle'}, 5);
/* (referred to the animation:) or you could use this instead: $('#message').slideToggle(); */
 //optional* });
} //end block of window.onload method
$(document).ready(function() {
 //JQuery functions go here
});
/* To remind you that the variable holds a jQuery selection, use $(varName) method to declare it. Plain JavaScript's method of variable declarations also work tho*/

var
 msg; /* var that will be storing the output message */
var userName = prompt(
 "Hey, user! What's your name?");
userName = capFirstletter(
 userName);
var age;
var bday = prompt(
  "What's your day? Note: We ask for your birthday only for statistical purposes.\nAccepted format *: YYYY(separator)m(separator)d");
  if ((userName != null &&
    typeof userName === 'string') && (
    userName.length != 0 &&
    userName instanceof String)) {
   alert(`Welcome ${userName}. I'm your virtual assistant.`);
   console.log(`Welcome ${userName}`);
  } else {
   alert("Welcome, user!");
   console.log("Welcome, user!");
  }

  /* regular expressions/ questions to be answered: */
  const q1 =
   /(what'?s? (up|popping)[?]?)/gi,
   q2 = /who are you[?]?/gi,
   q3 =
   /(who am I[?]?)|(my bio)|(what do you know about me[?]?)/gi,
   q4 =
   /(how are you[?]?)|(how are you doing[?]?)|(how've you been)|(how have you been[?]?)/gi,
   q5 =
   /((what'?s?|show) my name[?]?)/gi,
   q6 = /(what'?s? your name[?]?)|(what call you[?]?)/gi,
   q7 = /what are you[?]?/gi,
   q8 =
   /((what'?s?|show) my (birthday|b-day|bday|day)[?]?)/gi,
   q9 =
   /(how old am I[?]?)|((show|what'?s?) my age[?]?)/gi,
   q10 =
   /(call me by another name)|(change my name)|(call me [a-z])/gi,
   q11 =
   /(change my (dob|bday|day|birthday))/gi,
   q12 = /am I nice[?]?/gi,
   q13 =
   /what (date|time|day) ?is? ?it?|(date)|(time)/gi,
   q14 =
   /(hi)|(hello)|(hey)|(hola)|(howdy)/gi,
   q15 = /(tic tac toe)/gi,
   q16 = /(weather)|(temperature)|((hot|rainy|cloudy|sunny) day)/gi,
   q17 = /^$/,
   q18 = /(calculator)|(calc)/gi,
   q19 = /(tts)|(speech engine)|(text to speech)|(ebook to audiobook)/gi,
   q20 = /notes/gi,
   q21 = /(todo)|(reminder)/gi,
   q22 = /(music)|(songs)/gi,
   q23 = /(contact?s?)|(address book)/gi;

  function ask() {
   const q = document.querySelector(
     "#searchInput")
    .value; /* var that will be storing the value of question asked by the user */
   const $output = $(
    "#message"
    ); /* var for output message */
   if (q1.test(q)) {
   	$('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
   	/* or you could use this instead: $('#message').delay(10000).slideToggle(800); */
    msg = "Nothing much";
    if ((userName != null &&
      typeof userName === 'string') && (
      userName.length != 0 &&
      userName instanceof String)) {
     msg += ` ${userName}, sup with you?`;
    } else {
     msg += ", sup with you?";
    }
    $output.html(msg);
    console.log(msg);
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
    /* or you could use this instead: $('#message').delay(10000).slideToggle(800); */
   } else if (q2.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
    msg =
     "Hey &#128075;,<br>I'm Chatterbox, an assistant of yours. What can I assist you with?";
    $output.html(msg);
    console.log(msg);
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q3.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
    let age = calc_age(new Date(
     bday));
    msg =
     "<em style='font-weight:600;'>";
    msg +=
     "Here's what I know about you:";
    msg += "<ul><li>Your name: " +
     userName +
     '</li>' +
     "<li>Your birthday: " +
     bday + '</li>' +
     "<li>Your age: " +
     age + "</li></ul></em><br><br>";
        $output.html(msg);
        console.log(msg); $.get("https://api.ipdata.co/?api-key=test", function (response) {
     $("#message").append(`<b>Data recieved via your IP Address</b><br>Your country: ${response.country_name}|${response.emoji_flag}(<img src="${response.flag}" height="15vh" width="22vw">)<br>Your native language: ${response.languages[1].name}<br>Your timezone: UTC ${response.time_zone.offset} (${response.time_zone.abbr})<br>Note: We value your privacy! None of your data will be shared.`);
}, "jsonp");
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q4.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
    msg = "Not bad, and you?";
    $output.html(msg);
    console.log(msg);
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q5.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
     msg = `Your name is ${userName}. Want it changed? <a onclick="$('#searchInput').val('Change my name');" style="color:rgba(0,0,255,0.9);text-decoration:underline;">Click here</a>`;
     $output.html(msg);
      console.log(msg);
      $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q6.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
    msg =
     "I am your assistant. My name is Chattetbox... Funny, isnt it? :D";
    $output.html(msg);
    console.log(msg);
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q7.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
    msg =
     "I am a virtual assistant created by Alex--- by the means of HTML5, CSS, and vanillaJavaScript";
    $output.html(msg);
    console.log(msg);
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q8.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
    if ((bday != null || bday !==
      'undefined') && (bday.length !=
      0 || bday != '')) {
     msg = `You day is ${bday}`;
     log(msg);
    } else {
     bday = prompt(
      "Your bday isn't saved yet. Would you mind (re-)listing it?\nAccepted format: YYYY(separator)m(separator)d\nNote: We ask for your birthday only for statistical purposes.");
      msg =
      `Date set. Your new bday is ${bday}`;
      log(msg);
    }
           $output.html(msg);
           console.log(msg);
           $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
    } else if (q9.test(q)) {
     $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
     if ((bday != null || bday !==
       'undefined') && (bday
       .length != 0 || bday != ''
      )) {
      age = calc_age(new Date(
       bday));
      msg = `You are ${age}`;
      if (age <= 18) {
       msg +=
        ". Too young, pal &#128526;";
       console.log(msg);
      }
     } else {
      bday = prompt(
       "Can't show your age on account of not knowing your bday. Please submit your bday first.\nSupported format: YYYY(separator)m(separator)d");
       age = calc_age(new Date(
        bday)); msg = 'You are ' +
       age;
       if (age <= 18) {
        msg +=
         ". Too young, pal &#128526;";
        console.log(msg);
       }
      }
      $output.html(msg);
      console.log(msg);
      $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
     } else if (q10.test(q)) {
      $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
      let cfm = confirm(
       "Are you sure?");
      if (cfm) {
       userName = prompt(
        'What do you want me to call you?',
        userName);
        userName = capFirstletter(
          userName);
       console.log(`New username: ${userName}`);
       if ((userName != null &&
        typeof userName === 'string') && (
        userName.length != 0 &&
        userName instanceof String)) {
        msg =
        `&#128077; Sucess. I'll call you ${userName} from now on &#128521;`;
        console.log(msg);
       } else {
        userName = prompt(
         "Couldn't change your name. Try resubmitting it."
        );
        userName = capFirstletter(
          userName);
        msg =
         `&#128077; Sucess. I'll call you ${userName} from now on &#128521;`;
        console.log(msg);
       }
        $output.html(msg);
        log(msg);
        $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
      }
     } else if (q11.test(q)) {
      $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
      let cfm = confirm(
       "Are you sure?");
      if (cfm) {
       bday = prompt(
        "Reset your bday. The format should be: YYYY(separator)m(separator)d\nNote: We ask for your birthday only for statistical proposes.");
        if ((bday != null ||
          bday !==
          'undefined') && (bday
          .length != 0 || bday != ''
         )) {
         msg =
          `&#128077; Success. Your new bday is ${bday}&#9786;`;
         console.log(msg);
        } else {
         bday = prompt(
          "Couldn't change your bday. Try resubmitting it.\nNote: We ask for your birthday only for statistical purposes.");
          msg =
          `&#128077; Success. Your new bday is ${bday}&#9786;`;
console.log(msg);
         }
         $output.html(msg);
         debug(msg);
         $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
        }
       }
       else if (q12.test(q)) {
        $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
        msg =
         "You are! Actually I think you are even way too nicer than me &#128524;";
        $output.html(msg);
        console.log(msg);
        $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
       } else if (q13.test(q)) {
        $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
        msg =
         dateTime();
        $output.html(msg);
        console.log(msg);
        $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
       } else if (q14.test(q)) {
        $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
        msg = "Hey there &#128075;, want some assistance? Try asking me for <a onclick='$(\"#searchInput\").val($(this).html());' style='font-weight:500;font-style:italic;color:rgba(0,0,255,0.9);text-decoration:underline;'>current date and time</a>";
        $output.html(msg);
        console.log(msg);
        $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
       } else if (q15.test(q)) {
        let gameWin = window.open('./tic-tac-toe-master/', '_blank', "width=500,height=500,resizable=yes,toolbar=no,menubar=no");
        if (gameWin) { window.focus(); } else { alert('Please turn on popups on this site.'); }
      } else if (q16.test(q)) {
        let weatherWin = window.open('./weather/', '_blank');
        if (weatherWin) { window.focus(); log("Opened Weather"); } else { alert('Please turn on popups on this site.'); }
      } else if (q17.test(q)){
        $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
        msg =
         "Hey pal. Go ahead and ask me (for) something, would you?&#9786;";
        $output.html(msg);
        console.log(msg);
        $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
      } else if (q18.test(q)) {
        let calcWin = window.open('./calc/', '_blank');
        if (calcWin) { window.focus(); log("Opened Calculator"); } else { alert('Please turn on popups on this site.'); }
      } else if (q19.test(q)) {
        let ttsWin = window.open('./tts/', '_blank');
        if (ttsWin) { window.focus(); log("Opened TTS"); } else { alert('Please turn on popups on this site.'); }
      } else if (q20.test(q)) {
        let notesWin = window.open('./notes-app-project-master/', '_blank');
        if (notesWin) { window.focus(); log("Opened Notes"); } else { alert('Please turn on popups on this site.'); }
      } else if (q21.test(q)) {
        let todoWin = window.open('./todo-app-project-master/', '_blank');
        if (todoWin) { window.focus(); log("Opened TODO"); } else { alert('Please turn on popups on this site.'); }
      } else if (q22.test(q)) {
        let musicWin = window.open('./music/', '_blank');
        if (musicWin) { window.focus(); log("Opened Music player"); } else { alert('Please turn on popups on this site.'); }
      } else if (q23.test(q)) {
        let contactsWin = window.open('./js-contact-app-master/dist', '_blank');
        if (contactsWin) { window.focus(); log("Opened Contacts"); } else { alert('Please turn on popups on this site.'); }
      } else {
        $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
        msg =
         "<code>Sorry, the program is still under development.</code>";
        $output.html(msg);
        console.log(msg);
        $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
       }
      }

      /* function that capitalizes first-letter of a word */
      function capFirstletter(
      string) {
       return string[0]
       .toUpperCase() + string.slice(
         1);
      }

      //age calculator
      function calc_age(ag) {
       var diff_ms = Date.now() - ag
        .getTime();
       var age_dt = new Date(
       diff_ms);

       return Math.abs(age_dt
        .getUTCFullYear() - 1970);
      }
      /* its debuggers
      console.log(calc_age(new Date(1982, 11, 4)));
      console.log(calc_age(new Date(2002, 1, 1)));
      */

      //Time function:
      function startTime() {
       var d = new Date();
       var hr = d.getHours();
       var min = d.getMinutes();
       if (min < 10) {
        min = "0" + min;
       }
       var ampm = "am";
       if (hr > 12) {
        hr -= 12;
        ampm = "pm";
       }
       if (hr < 10) {
        hr = "0" + hr;
       }
       var $time = $('#time');
       msg = hr + ":" + min + ampm;
       $time.html(msg);
       setTimeout(startTime, 1000);

      }

      // Date function
      function dateTime() {
       var months = ["Jan", "Feb",
        "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct",
        "Nov", "Dec"
       ];
       var days = ["Sunday",
        "Monday",
        "Tuesday", "Wednesday",
        "Thursday", "Friday",
        "Saturday"
       ];
       var d = new Date();
       var day = days[d.getDay()];
       var hr = d.getHours();
       var min = d.getMinutes();
       if (min < 10) {
        min = "0" + min;
       }
       var ampm = "am";
       if (hr > 12) {
        hr -= 12;
        ampm = "pm";
       }
       var date = d.getDate();
       var month = months[d
        .getMonth()];
       var year = d.getFullYear();
       var result =
        "Local date & time right now: <br>" +
        day + " " + hr + ":" + min +
        ampm + " (" + seconds_with_leading_zeros(d) + ") " + month + " " +
        date + " " + year;
       return result;
      }

      // Theme switcher:
      var lTheme, dTheme, islTh,
       isdTh, snack;
      $lTheme = $('.lightTh');
      $dTheme = $('.darkTh');
      snack = document.querySelector('#snackbar');
      /*       initial state of the switcher: 
      islTh = true;
      isdTh = !islTh;
      */
      function switchTheme() {
       if (islTh && !isdTh) {
        $lTheme.attr('media',
        'none');
        $dTheme.attr('media', '');
        islTh = false;
        isdTh = !islTh;
        //Show a snackbar each time the theme switches to Lth
        snack.innerText = "Switched to Dark theme";
        snack.className = 'show';
        setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
        console.log(
         "Switched to Dark Theme");
       } else if (isdTh && !islTh) {
        $lTheme.attr('media', '');
        $dTheme.attr('media',
        'none');
        isdTh = false;
        islTh = !isdTh;
        //Show a snackbar each time the theme switches to dth
        snack.innerText = "Switched to Light Theme";
        snack.className = 'show';
        setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
        console.log(
         "Switched to Light Theme");
       }
      }

  /* Query function, enable it in case JQuery fails to run
     function $(x) {return document.querySelector(x);} 
Another method for it:
  create a global '$' variable:
window.$ = function(selector) {
  return document.querySelector(selector);
};
*/

      // shortcut to debugger
      //start
      function log(x) {
       return console.log(x);
      }

      function debug(x) {
       return console.log(x);
      } //end
      
      // Get User's Timezone
      function seconds_with_leading_zeros(d) 
{ 
  return /\((.*)\)/.exec(new Date().toString())[1];
}

// Speech Engine func
const playButton = document.querySelector('#askBtn');
const mesg = document.querySelector('#message');
const textInput = document.querySelector('#searchInput');
let currentCharacter;

if ('speechSynthesis' in window) {
  log("Speech Synthesis is supported!");
playButton.addEventListener('click', () => {
if (mesg.innerText != '' && mesg.innerText.length != 0) {
  if (speechSynthesis.speaking) {
  stopText();
} else {
  log("Speech Synthesis is not supported :(");
}
 playText(mesg.innerText);
 //Show a snackbar each time Speech Synthesis reads the text
 snack.innerText = "Speech synthesis is ongoing. You can't enter text in the input field until it finishes reading.";
        snack.className = 'show';
        setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 5000);
  }
})
}

//Speech Synthesis section
//start block
const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener('end', () => {
  textInput.disabled = false;
})
utterance.addEventListener('boundary', e => {
  currentCharacter = e.charIndex;
})

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  if (speechSynthesis.speaking) return
  utterance.text = text;
  var voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
}
utterance.voice = voices.filter(function(voice) { return voice.name == 'Microsoft Zira Desktop - English (United States)'; })[0]
  /*Or set if you want Microsoft's default female voice: utterance.voice = voices[10]*/
  /* Or if you just wanna use default male voice (MS David_En-US), just don't set any voice.*/
  utterance.pitch = 1.5;
  utterance.voiceURI = "native";
  utterance.lang = 'en-US';
  utterance.volume = 1;
  utterance.rate = 1;
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
  /* or you could simply import say.js. The link to it: https://rawgit.com/JudahRR/Say.js/master/libs/say.js
  Here's what the file (actually the lib) contains: function say(m){ 	var msg = new SpeechSynthesisUtterance();   var voices = window.speechSynthesis.getVoices(); 	msg.voice = voices[10]; 	msg.voiceURI = "native"; 	msg.volume = 1; 	msg.rate = 1; 	msg.pitch = 0.8; 	msg.text = m; 	msg.lang = 'en-US';   	speechSynthesis.speak(msg); }
  */
}

//Call this function to (immediately) stop the Speech synthesis:
function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
//end block

