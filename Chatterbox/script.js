﻿/* load default (light) theme every time the window (aka body object (DOM document.body) loads) nd show a tooltip whenever searchInput is active. Run startTime function too */
window.onload = () => {
  startTime();
  $lTheme.attr("media", "");
  $dTheme.attr("media", "none");
  islTh = true;
  isdTh = false;
  if (jQuery) {
    log("JQuery loaded successfully!");
  } else {
    log("Failed to load JQuery :(");
  }
  //adding a tooltop on the input
  const tippy1 = document.querySelector("#searchInput");
  tippy(tippy1, {
    content:
      "Try asking me to show <strong onclick=\"document.querySelector('#searchInput').value = 'What is the ' + this.innerText + ' like right now?';\" onmouseover=\"$(this).css('cursor', 'pointer');\">weather</strong> or to open <strong onclick=\"$('#searchInput').val($(this).text());\" onmouseover=\"$(this).css('cursor', 'pointer')\">calendar</strong>, or <strong onclick=\"$('#searchInput').val($(this).text())\" onmouseover=\"$(this).css('cursor', 'pointer')\">show exchange rates</strong>",
    followCursor: "horizontal",
    interactive: true /* To add interactions to and make your tippy's text highlight-able and clickable*/,
    appendTo: document.body,
    animation: "scale",
    duration: 1200,
    theme: "translucent",
    allowHTML: true,
    arrow: true,
    maxWidth: 370,
  });

  // Run ASK function whenever the user presses return (enter) key
  $("#searchInput").keydown(function (e) {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      ask();
      if (mesg.innerText != "") {
        if (speechSynthesis.speaking) {
          stopText();
        }
        playText(mesg.innerText);
        //Show a snackbar every time Speech Synthesis reads the text
        snack.innerText =
          "Speech synthesis is ongoing. You can't enter text in the input field until it finishes reading.";
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 2300);
      }
    }
  });
  setTimeout(daystilXmas, 1000);
  setTimeout(daystilNYE, 12000);
  setTimeout(daystilNYD, 25000);
  $("#message").slideFadeToggle(5);
  $(".stagger-menu").slideFadeToggle(5);
  $(".menu-toggler-label").click(function () {
    $(".stagger-menu").slideFadeToggle(120);
  });
}; //end block of window.onload method

$(document).ready(function () {
  //JQuery functions go here
});
/* To remind you that the variable holds a jQuery selection, use $(varName) method to declare it. Plain JavaScript's method of variable declarations also work tho*/

// SOME USEFUL FUNCTIONS

//Speech recognition func

// let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  // speech recognition API supported
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    log("Speech recognition is supported by your browser!");
var noteTextarea = $('#searchInput');
var instructions = $('#message');

var noteContent = '';

recognition.continuous = false;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

    let current = event.resultIndex;

    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;

    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if (!mobileRepeatBug) {
        noteContent = transcript;
        noteTextarea.val(noteContent);
        ask();
        if (mesg.innerText != '') {
  if (speechSynthesis.speaking) {
  stopText();
  }
  playText(mesg.innerText);
  }
    }
};


recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      let snack = document.querySelector("#snackbar");
      snack.innerText =
          "No speech was detected. Try again.";
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 3500);
    }
};


$('#recIcon').on('click', function() {
	stopText();
    recognition.start();
});


/* Sync the text inside the text area with the noteContent variable.*/
noteTextarea.on('input', function() {
    noteContent = $(this).val();
});
} else {
  let err = "Speech recognition is not supported by your browser. So, the microphone function won't work :(";
  log(err);
  alert(err);
}


//JQuery function that makes it easy to toggle a slide w fade animation
$.fn.slideFadeToggle = function (speed, easing, callback) {
  return this.animate(
    { opacity: "toggle", height: "toggle" },
    speed,
    easing,
    callback
  );
};

const isBday = function (dat) {
  let inputDate = new Date(dat);
  let todaysDate = new Date();

  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}; 

// function that lets user know whether its a leap year
function isLeapYear(year) {
  return new Date(parseInt(year), 1, 29).getMonth() == 1;
}

//fn that calculates the dayOfYear
const dayOfYear = (date) => {
  return Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
};
//fn that tests if it's weekday today and returns boolean value as a result
const isWeekday = (d = new Date()) => {
  return d.getDay() % 6 !== 0;
};

//fn that tests if it's weekend today and returns boolean value as a result
const isWeekend = (d = new Date()) => {
  return d.getDay() % 6 === 0;
};

//fn toRomanNumeral
const toRomanNumeral = (num) => {
  let lookup = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  return lookup.reduce((acc, [k, v]) => {
    acc += k.repeat(Math.floor(num / v));
    num = num % v;
    return acc;
  }, "");
};

const milesToKm = (miles) => {
  return miles * 1.609344;
};

const kmToMiles = (km) => {
  return km * 0.621371;
};

const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  let res = d.toString().split(" G")[0];
  res = res.slice(0, 15);
  return `It was ${res} yesterday`;
};

const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  let res = d.toString().split(" G")[0];
  res = res.slice(0, 15);
  return `It'll be ${res} tomorrow`;
};

const detectDeviceType = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
};

const daystilXmas = () => {
let tday=new Date();
var cmas=new Date(tday.getFullYear(), 11, 25);
if (tday.getMonth()==11 && tday.getDate()>=25) 
{
cmas.setFullYear(cmas.getFullYear()+1); 
}  
let oneDay=1000*60*60*24;
let rslt = Math.ceil((cmas.getTime()-tday.getTime())/(oneDay));
if (rslt==0 || rslt==365) {
  /*show a snack here saying "Merry Christmas!"...*/
  let snack = document.querySelector("#snackbar");
      snack.innerText =
          "Merry Christmas!";
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 4000);
} else if (rslt==1) {
  let snack = document.querySelector("#snackbar");
      snack.innerText =
          "Reminder: It's Christmas tomorrow!";
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 4000);
} else if (rslt<7 && rslt!=0 && rslt!=1) {
  let snack = document.querySelector("#snackbar");
      snack.innerText =
          `Reminder: Only ${rslt} days left until Christmas!`;
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 4000);
  }
};

const daystilNYE = () => {
var nextNewYear, msPerDay;
let curYr = new Date().getFullYear();
let today = new Date();
nextNewYear = new Date("January 1, 2000 00:00:00")
        nextNewYear.setYear(curYr + 1);
        msPerDay = 24 * 60 * 60 * 1000;
        const noofdayslefttilNYE = Math.floor((nextNewYear.getTime() - today.getTime()) / msPerDay);
if (noofdayslefttilNYE==0 || noofdayslefttilNYE==365) {
  /*show a snack here saying "Happy New Year's Eve!"...*/
  let snack = document.querySelector("#snackbar");
      snack.innerText =
          "Happy New Year's Eve!";
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 4000);
} else if (noofdayslefttilNYE==1) {
  let snack = document.querySelector("#snackbar");
      snack.innerText =
          "Reminder: It's New Year's Eve tomorrow!";
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 4000);
} else if (noofdayslefttilNYE<7 && noofdayslefttilNYE!=0 && noofdayslefttilNYE!=1) {
  let snack = document.querySelector("#snackbar");
      snack.innerText =
          `Reminder: Only ${noofdayslefttilNYE} days left until New Year's Eve!`;
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 4000);
  }
}

const daystilNYD = () => {
let nextNewYearsDay, msPerDay;
let currentYr = new Date().getFullYear();
let today = new Date();
nextNewYearsDay = new Date("January 1, 2000 00:00:00")
        nextNewYearsDay.setYear(currentYr + 1);
        msPerDay = 24 * 60 * 60 * 1000;
        const noofdayslefttilNYD = Math.ceil((nextNewYearsDay.getTime() - today.getTime()) / msPerDay);
if (noofdayslefttilNYD==0 || noofdayslefttilNYD==365) {
  /*show a snack here saying "Happy New Year's Day!"...*/
  let snack = document.querySelector("#snackbar");
      snack.innerText =
          "Happy New Year's Day!";
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 4000);
} else if (noofdayslefttilNYD==1) {
  let snack = document.querySelector("#snackbar");
      snack.innerText =
          "Reminder: It's New Year's Day tomorrow!";
        snack.className = "show";
        setTimeout(function () {
          snack.className = snack.className.replace("show", "");
        }, 4000);
   }
}




var msg;
var userName = prompt("Hey, user! What's your name?");
userName = toTitleCase(userName);
var age;
var bday = prompt(
  "What's your bday? Note: We ask for your birthday only for statistical purposes.\nAccepted format *: YYYY(separator)m(separator)d"
);

  //Show a snackbar if it's user's birthday today
bday = toTitleCase(bday);
if (isBday(bday)) {
  let snack = document.querySelector("#snackbar");
  snack.innerHTML = "Happy birthday";
  if ((
  userName != null &&
  userName.length != 0) &&
  (/^[a-z\s]+$/i.test(userName) &&
  userName != "")
) {
  snack.innerHTML += `, ${userName}! &#127881`;
} else {
  snack.innerHTML += "! &#127881";
}
snack.className = "show";
/*optional expression*/
setTimeout(function () {
  snack.className = snack.className.replace("show", "");
}, 5000);
}
if ((
  userName != null &&
  userName.length != 0) &&
  (/^[a-z\s]+$/i.test(userName) &&
  userName != "")
) {
  alert(`Welcome, ${userName}!`);
  console.log(`Welcome, ${userName}!`);
} else {
  alert("Welcome, user!");
  console.log("Welcome, user!");
}


/* regular expressions/ questions to be answered: */
const q1 = /what'?s?( is)? (up|popping)/i,
  q2 = /who('?re| are) you/i,
  q3 = /(who am I)|(my (info|bio))|(what( do)? you know about me)/i,
  q4 = /(how('?re| are) you)|(how('?ve?| have) you been)/i,
  q5 = /(what'?s?( is)?|show) my name/i,
  q6 = /(what'?s?( is)? your name)|(what (can I|do you want me to) call you)/i,
  q7 = /(is|was) (this|\d{4})( a)? leap year/i,
  q8 = /((what'?s?|when'?s?)( is)?|show) my (dob|bday|(birth|b(-)?)day)/i,
  q9 = /(how old am I)|((show|what'?s?( is)?) my age)/i,
  q10 = /(call me by another|(change|(re)?save) my) name/i,
  q11 = /(((change|resubmit) my|incorrect) (dob|bday|(birth|b(-)?)day))|((dob|bday|(birth|b(-)?)day) is incorrect)/i,
  q12 = /am I nice/i,
  q13 = /(what (date|time|day) is it)|((current|local)( date and)? time)|(date today)|(time now)|(date and time)/i,
  q14 = /^(hi)|(hello)|(hey)|(hola)|(howdy)/i,
  q15 = /tic( |-)tac( |-)toe/i,
  q16 = /(weather)|(temperature today)|((hot|rainy|cloudy|sunny) day)/i,
  q17 = /^$/,
  q18 = /((open|run|launch|execute) calc(ulator)?)|(calculate(?:bmi))/i,
  q19 = /(tts)|(speech engine)|(text to speech)|(ebook to audiobook)|((document|text) reader)/i,
  q20 = /((my|take|open|launch) notes)|(journal)|(notebook)/i,
  q21 = /(todo)|(reminder)|(remind me to)|((bucket|shopping) list)/i,
  q22 = /(music)|(songs?)|(jukebox)/i,
  q23 = /weight( units)? conver(sion|ter)/i,
  q24 = /(random (fun|games?))|(I'?( ?a)?m bored)|(games)|(play( me)? a game)/i,
  q25 = /^(play( me)?|run|launch|execute) breakout/i,
  q26 = /^(play( me)?|run|launch|execute) flappy ?bird/i,
  q27 = /^(play( me)?|run|launch|execute) hangman/i,
  q28 = /^(play( me)?|run|launch|execute) pacman(ia)?/i,
  q29 = /^(play( me)?|run|launch|execute) (rock|stone) paper scissors?/i,
  q30 = /(lyrics)|((encycl|lyric)opedia)/i,
  q31 = /((crypto)?currency)|(exchange rates?)|(\w\w\w to \w\w\w)/i,
  q32 = /(what )?day of year( is it)?/i,
  q33 = /(is (this|it)( a)? weekday (today|yet))|((is today|today is) a weekday)/i,
  q34 = /is (it|this)( a)? weekend( day)? (today|yet)/i,
  q35 = /numbers? to roman/i,
  q36 = /(mi|miles) (and|to) (km|kilometers)/i,
  q37 = /(km|kilometers) (and|to) (mi|miles)/i,
  q38 = /what (date|day) was it yesterday/i,
  q39 = /what (date|day) will it be tomorrow/i,
  q40 = /monopoly/i,
  q41 = /(canvas)|(drawing app)|(want to draw)/i,
  q42 = /(audio (visuali(z|s)er|player))|(play( local)? audio)/i,
  q43 = /breaking bad cast/i,
  q44 = /(b(ody )?m(ass )?i(ndex)?)|(do I overweigh)/i,
  q45 = /^(execute|launch|play( me)?|run) (the )?maze/i,
  q46 = /calendar/i,
  q47 = /my recipes/i,
  q48 = /(space invaders)|(invasion game)/i,
  q49 = /voice ?(notes|recorder)/i,
  q50 = /(google doodles)|(what event is it today)/i,
  q51 = /(percentage calculator)|(calculate percentage)/i,
  q52 = /temperature( units)? conver(sion|ter)/i,
  q53 = /(meal finder)|(find( me)? meals?)|(recipes?)|(how to cook)|(help me (cook|with cooking))/i,
  q54 = /(I'?( ?a)?m (anxious|tired))|(help me (calm down|relax|with my anxiety))|(relaxer)/i,
  q55 = /(new year countdown)|(((days|time)( left)? (un)?till?|(what time|when) is) new year)/i,
  q56 = /(typing game)|((open|run|launch|play( me)?) speed( |-)?typer)/i,
  q57 = /((expenses?|budget) tracker)|(track my (budget|expenses?|pocket money))/i,
  q58 = /(stopwatch)|(countdown timer)|(counter ?clock)|(count down)/i,
  q59 = /(miner of lava)|(lava game)/i,
  q60 = /((loan|mortgage) (calculator|payment))|(calculate( my)? (loan|mortgage))|(how much do (I|people) owe)/i,
  q61 = /quotes?/i,
  q62 = /memory (game|test)/i,
  q63 = /(calo(ries? )?tracker)|(track calories)/i,
  q64 = /(dungeon crawler)|(rogue-?life)/i,
  q65 = /(fotoflick)|(puzzle game)|((photo|picture) puzzle)/i,
  q66 = /((motivate|inspire) me)|(I'?( ?a)?m demotivated)|(motivat(ional|ing) app)/i,
  q67 = /((space(X|station)|nasa) (data|live))|(live( outer)? space)/i,
  q68 = /(snapshots?)|(landscapes)|(wallpapers)/i,
  q69 = /features/i,
  q70 = /(trivia)|(quiz)|(game of questionnares)/i,
  q71 = /(ratings? for( tv)? (series|serials?))|((tv )?series app)/i,
  q72 = /((movies?'? (cast|ratings?))|(ratings? (for|of) movies?))|(movies? app)/i,
  q73 = /(day (planner|scheduler))|((plan|schedule)( my)? day)/i,
  q74 = /(chase( |-)the( |-)box)|(box chaser)/i,
  q75 = /giphy/i,
  q76 = /(pass(code|word|phrase) generator)|(generate( me)? (a )?(random|difficult)? pass(code|word|phrase))/i,
  q77 = /the (logic game|constructor)/i,
  q78 = /(fisave)|(net ?worth track(er|ing))|(track (my net ?worth|net ?worth of mine))/i,
  q79 = /(habits? (break|track)(er|ing))|((break|track) ((a |my )(bad )?habits?|(a( bad)? habit|(bad )?habits) of mine))/i,
  q80 = /(habits? build(er|ing))|(help( me)? (with building|build) a( good)? habit)/i,
  q81 = /unit conver(sion|ter)/i,
  q82 = /(game of (games|adventures?))|(adventurous game)/i,
  q83 = /my( fave?(orite)?)? ?books?'? ?list/i,
  q84 = /(math flash ?cards)|((arithmetic|math) game)/i,
  q85 = /simon/i,
  q86 = /light maze/i,
  q87 = /^((book|pdf) ((pre)?viewer|reader))|((read|(pre)?view)( me)? (a (document|pdf)|pdf('?s)?))$/i,
  q88 = /(^(open|launch|run)?( me)? ?travels? ?(app|plan(ning|s|ner))$)|(help me ?(to|with|in)? plan(ning)? travels)/i,
  q89 = /truth or dare/i,
  q90 = /metronome/i;

function ask() {
  const q = document.querySelector("#searchInput").value;
  const $output = $("#message");
  if (q1.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = "Nothing much";
    if (
      userName != null &&
      userName.length != 0 &&
      /^[a-z\s]+$/i.test(userName) &&
      userName != ""
    ) {
      msg += ` ${userName}, sup with you?`;
    } else {
      msg += ", sup with you?";
    }
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q2.test(q)) {
    $("#message").slideFadeToggle(800);
    msg =
      "Hey &#128075;,<br>I'm Chatterbox, an assistant of yours. What can I assist you with?";
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q3.test(q)) {
    $("#message").slideFadeToggle(800);
    let age = calc_age(new Date(bday));
    msg = "<em style='font-weight:600;'>";
    msg += "Here's what I know about you:<ul>";
    msg += "<li>Your name: ";
    if (
      userName != null &&
      userName.length != 0 &&
      /^[a-z\s]+$/i.test(userName) &&
      userName != ""
    ) {
      msg += userName;
    } else {
      msg += "Not saved yet :(";
    }
    msg += "</li><li>Your birthday: ";
    if (
      bday != null &&
      /^[0-9a-zA-Z(-\.\_\s\/)]+$/i.test(bday) &&
      bday != "" &&
      /^\d{4}[\/.,-\s](\d{1,2}|\b(\w*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*)\b)[\/.,-\s]\d{1,2}$/i.test(
        bday
      )
    ) {
      msg += bday;
      if (isBday(bday)) {
        msg += " (today&#127874;)";
      }
    } else {
      msg += "Not saved yet :(";
    }
    msg += "</li><li>Your age: ";
    if (!isNaN(parseInt(age))) {
      msg += age;
    } else {
      msg += "Couldn't calculate on account of not knowing your birthday";
    }
    msg += "</li></ul></em>";
    $output.html(msg);
    console.log(msg);
    /*
    if (/your (name|age|birthday):/im.test(msg) &&  mesg.innerText.toLowerCase().indexOf("data received via") === -1) {
      $.get(
        "https://api.ipdata.co/?api-key=63a8b1ef829b0a90909b1bb7e9c931fe1ffb70e27378da4c302e22c7",
        function (response) {
          $("#message").append(
            `<br><b>Data received via your IP Address</b><br>Your country: ${response.country_name} <img src="${response.flag}" height="15vh" width="22vw"> <sup><small>[${response.country_code}]</small></sup><br>Your native language: ${response.languages[1].name}<br>Your timezone: UTC ${response.time_zone.offset} (${response.time_zone.abbr})<br>Note: We value your privacy! None of your data will be shared.`
          );
        },
        "jsonp"
      );
    }
	*/
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q4.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = "Not bad, and you?";
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q5.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = "Your name is ";
    if (
      userName != null &&
      userName.length != 0 &&
      /^[a-z\s]+$/i.test(userName) &&
      userName != ""
    ) {
      msg += userName;
      msg += `. Want it changed? <a onclick="$('#searchInput').val('Change my name');stopText();ask();playText(mesg.innerText);" onmouseover="$(this).css('cursor', 'pointer')" style="color:rgba(0,0,255,0.9);text-decoration:underline;">Click here</a>`;
    } else {
      msg += "not saved yet";
      msg += `. <a onclick="$('#searchInput').val('Save my name');stopText();ask();playText(mesg.innerText);" onmouseover="$(this).css('cursor', 'pointer')" style="color:rgba(0,0,255,0.9);text-decoration:underline;">Click here to (re)submit it, your name</a>`;
    }
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q6.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = "Call me Chatterbox :D";
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q7.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = document.querySelector("#searchInput").value;
    msg = msg.replace(/this/i, "2020");
    msg = msg.replace(/was/i, "is");
    msg = msg.substr(3, 4);
    msg = parseInt(msg);
    if (isLeapYear(msg)) {
      msg = `Of course, ${msg} is a leap year`;
      let x = msg.slice(11, 15);
      let curY = new Date().getFullYear();
      if (curY != x) {
        msg = msg.replace(/is/i, "was");
      }
    } else {
      msg = "In accordance with my intelligence, no, it's not.";
    }
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q8.test(q)) {
    $("#message").slideFadeToggle(800);
    if (
      bday != null &&
      /^[0-9a-zA-Z(-\.\_\s\/)]+$/i.test(bday) &&
      bday != "" &&
      /^\d{4}[\/.,-\s](\d{1,2}|\b(\w*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*)\b)[\/.,-\s]\d{1,2}$/i.test(
        bday
      )
    ) {
      bday = toTitleCase(bday);
      msg = `Your birthday is ${bday}`;
      log(msg);
      if (isBday(bday)) {
        msg +=
          " (today)<br>Happy birthday, by the way! A gift for you &#127874;";
      }
    } else {
      bday = prompt(
        "Your bday isn't saved yet. Would you mind (re-)listing it?\nAccepted format: YYYY(separator)m(separator)d\nNote: We ask for your birthday only for statistical purposes."
      );
      bday = toTitleCase(bday);
      msg = `Date set. Your newly set bday is ${bday}`;
      log(msg);
    }
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q9.test(q)) {
    $("#message").slideFadeToggle(800);
    if (
      bday != null &&
      /^[0-9a-zA-Z(-\.\_\s\/)]+$/i.test(bday) &&
      bday != "" &&
      /^\d{4}[\/.,-\s](\d{1,2}|\b(\w*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*)\b)[\/.,-\s]\d{1,2}$/i.test(
        bday
      )
    ) {
      age = calc_age(new Date(bday));
      msg = `You are ${age}`;
      if (age <= 18) {
        msg += ". Too young, pal &#128526;";
        console.log(msg);
      }
    } else {
      bday = prompt(
        "Can't calculate your age without knowing your bday. Please (re)submit your bday first.\nSupported format: YYYY(separator)m(separator)d"
      );
      age = calc_age(new Date(bday));
      msg = "You are " + age;
      if (age <= 18) {
        msg += ". Too young, pal &#128526;";
        console.log(msg);
      }
    }
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q10.test(q)) {
    $("#message").slideFadeToggle(800);
    let cfm = confirm("Are you sure?");
    if (cfm) {
      userName = prompt("What do you want me to call you?", userName);
      userName = toTitleCase(userName);
      console.log(`New username: ${userName}`);
      if (
        userName != null &&
        userName.length != 0 &&
        /^[a-z\s]+$/i.test(userName) &&
        userName != ""
      ) {
        msg = `&#128076; Alright, I'll call you ${userName} from now on &#128521;`;
        console.log(msg);
      } else {
        userName = prompt("Couldn't change your name. Try resubmitting it.");
        userName = toTitleCase(userName);
        msg = `&#128076; Alright, I'll call you ${userName} from now on &#128521;`;
        console.log(msg);
      }
      $output.html(msg);
      log(msg);
      $("#message").delay(10000).slideFadeToggle(800);
    }
  } else if (q11.test(q)) {
    $("#message").slideFadeToggle(800);
    let cfm = confirm("Are you sure?");
    if (cfm) {
      bday = prompt(
        "Resubmit your bday. The format should be: YYYY(separator)m(separator)d\nNote: We ask for your birthday only for statistical proposes."
      );
      if (
        bday != null &&
        /^[0-9a-zA-Z(-\.\_\s\/)]+$/i.test(bday) &&
        bday != "" &&
        /^\d{4}[\/.,-\s](\d{1,2}|\b(\w*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*)\b)[\/.,-\s]\d{1,2}$/i.test(
          bday
        )
      ) {
        msg = `&#128076; Done. Your newly set bday is ${bday}&#9786;`;
        console.log(msg);
      } else {
        bday = prompt(
          "Couldn't change your bday. Try resubmitting it.\nNote: We ask for your birthday only for statistical purposes."
        );
        msg = `&#128076; Done. Your newly set bday is ${bday}&#9786;`;
        console.log(msg);
      }
      $output.html(msg);
      log(msg);
      $("#message").delay(10000).slideFadeToggle(800);
    }
  } else if (q12.test(q)) {
    $("#message").slideFadeToggle(800);
    msg =
      "You are! Actually I think you are even nicer than I am &#128521;";
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q13.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = dateTime();
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q14.test(q)) {
    $("#message").slideFadeToggle(800);
    msg =
      "Hey there &#128075;, want some assistance? Try asking me for <a onclick='$(\"#searchInput\").val($(this).html());stopText();ask();playText(mesg.innerText);' onmouseover='$(this).css(\"cursor\", \"pointer\")' style='font-weight:500;font-style:italic;color:rgba(0,0,255,0.9);text-decoration:underline;'>current date and time</a>";
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q15.test(q)) {
    let ticTacToeWin = window.open(
      "./tic-tac-toe/",
      "_blank",
      "width=500,height=900,resizable=yes,toolbar=no,menubar=no"
    );
    if (ticTacToeWin) {
      window.focus();
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q16.test(q)) {
    let weatherWin = window.open("./weather/", "_blank");
    if (weatherWin) {
      window.focus();
      log("Launched Weather");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q17.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = "Hey pal. Go ahead and ask me (for) something, would you?&#9786;";
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q18.test(q)) {
    let calcWin = window.open("../calc/", "_blank");
    if (calcWin) {
      window.focus();
      log("Launched Calculator");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q19.test(q)) {
    let ttsWin = window.open("./tts/", "_blank");
    if (ttsWin) {
      window.focus();
      log("Launched TTS");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q20.test(q)) {
    let notesWin = window.open("./notes-app-project-master/", "_blank");
    if (notesWin) {
      window.focus();
      log("Launched Notes");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q21.test(q)) {
    let todoWin = window.open("./todo-app-project-master/", "_blank");
    if (todoWin) {
      window.focus();
      log("Launched Todo app");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q22.test(q)) {
    let musicWin = window.open("./music/", "_blank");
    if (musicWin) {
      window.focus();
      log("Launched Music");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q23.test(q)) {
    let weightConvAppWin = window.open("./weight-conv/", "_blank");
    if (weightConvAppWin) {
      window.focus();
      log("Launched Weight Converter");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q24.test(q)) {
    if (detectDeviceType() != "Desktop" || detectDeviceType() == "Mobile") {
      alert(
        "You should on be a desktop for better stability because some games are not optimized for mobile devices!"
      );
    }
    let games = [
      "./tic-tac-toe/",
      "./2D-Breakout-Game-JavaScript-master/",
      "./FlappyBird-JavaScript-master/",
      "./Javascript-Pacman-master/",
      "./hangman-master/",
      "./Rock-Paper-Scissor-master",
      "./Monopoly-master",
      "https://alexs-maze-game.netlify.app/",
      "./canvas-drawing-app-master",
      "./space-invaders/",
      "./typing-game/",
      "./miner-of-lava/",
      "./mem-game/",
      "../dungeon-crawler/",
      "../foto-flick/",
      "../Trivia-Db/",
      "./box-chaser/",
      "./The Constructor/",
      "./RPG-game/",
      "../math-flash-cards/",
      "https://alexs-simon-says.netlify.app/",
      "./light-maze/",
      "https://truth-or-dare-by-alex.netlify.app",
    ];
    let gamesWin = window.open(
      games[Math.floor(Math.random() * games.length)],
      "_blank"
    );
    if (gamesWin) {
      window.focus();
      log("Launched a random game");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q25.test(q)) {
    let breakOutWin = window.open(
      "./2D-Breakout-Game-JavaScript-master/",
      "_blank",
      "width=460,height=550,resizable=no,toolbar=no,menubar=no"
    );
    if (breakOutWin) {
      window.focus();
      log("Launched Breakout");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q26.test(q)) {
    let flappyBirdWin = window.open(
      "./FlappyBird-JavaScript-master/",
      "_blank",
      "width=380,height=630,resizable=no,toolbar=no,menubar=no"
    );
    if (flappyBirdWin) {
      window.focus();
      log("Launched FlappyBird");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q27.test(q)) {
    let hangManWin = window.open("./hangman-master/", "_blank");
    if (hangManWin) {
      window.focus();
      log("Launched Hangman");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q28.test(q)) {
    let pacManWin = window.open(
      "./Javascript-Pacman-master/",
      "_blank",
      "width=527,height=527,resizable=no,toolbar=no,menubar=no"
    );
    if (pacManWin) {
      window.focus();
      log("Launched Pacman");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q29.test(q)) {
    let rockPSWin = window.open(
      "./Rock-Paper-Scissor-master/",
      "_blank",
      "width=830,height=710,resizable=no,toolbar=no,menubar=no"
    );
    if (rockPSWin) {
      window.focus();
      log("Launched Rock Paper Scissor");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q30.test(q)) {
    let lyricsAppWin = window.open("./lyrics-search-master/", "_blank");
    if (lyricsAppWin) {
      window.focus();
      log("Launched Lyricopedia");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q31.test(q)) {
    let curConvApps = ["./Currency-Converter-JS-master/", "./exchange-rate/", "https://cryptocurrency-converter.netlify.app/"];
    let curConvAppsWin = window.open(
      curConvApps[Math.floor(Math.random() * curConvApps.length)],
      "_blank",
      "width=600,height=800,resizable=no,toolbar=no,menubar=no"
    );
      
    if (curConvAppsWin) {
      window.focus();
      log("Launched Currency Converter");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q32.test(q)) {
    $("#message").slideFadeToggle(800);
    msg =
      "Today is day " +
      dayOfYear(new Date()) +
      " of year " +
      new Date().getFullYear();
    console.log(msg);
    $output.html(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q33.test(q)) {
    $("#message").slideFadeToggle(800);
    if (isWeekday()) {
      msg = "Yes. Of course, it is!";
    } else {
      msg = "According to my intelligence, no, it's not.";
    }
    console.log(msg);
    $output.html(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q34.test(q)) {
    $("#message").slideFadeToggle(800);
    if (isWeekend()) {
      msg =
        "Yes. Of course, it is! Why don't you go for an adventure or something?";
    } else {
      msg = "According to my intelligence, no, it's not.";
    }
    console.log(msg);
    $output.html(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q35.test(q)) {
    $("#message").slideFadeToggle(800);
    let p = prompt("Enter number you want me to convert to Roman numeral");
    let conv = toRomanNumeral(p);
    if (/^[0-9]*$/g.test(p) && p != null && p != "" && p != 0) {
      msg = `Roman numeral for ${p} is ${conv}`;
    } else {
      msg = "Values other than integers cannot be converted!";
    }
    console.log(msg);
    $output.html(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q36.test(q)) {
    $("#message").slideFadeToggle(800);
    let p = prompt("Enter miles you want me to convert to Km");
    let conv = milesToKm(p);
    if (/^[0-9(.)]*$/g.test(p) && p != null && p != "" && p != 0) {
      msg = `${p} miles are equal to ${conv} kilometers`;
    } else {
      msg = "Values other than numbers cannot be converted!";
    }
    console.log(msg);
    $output.html(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q37.test(q)) {
    $("#message").slideFadeToggle(800);
    let p = prompt("Enter Kilometers you want me to convert to miles");
    let conv = kmToMiles(p);
    if (/^[0-9(.)]*$/g.test(p) && p != null && p != "" && p != 0) {
      msg = `${p} Kilometers are equal to ${conv} miles`;
    } else {
      msg = "Values other than numbers cannot be converted!";
    }
    console.log(msg);
    $output.html(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q38.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = yesterday();
    $output.html(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q39.test(q)) {
    $("#message").slideFadeToggle(800);
    msg = tomorrow();
    $output.html(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  } else if (q40.test(q)) {
    let monopolyWin = window.open("./Monopoly-master/", "_blank");
    if (monopolyWin) {
      window.focus();
      log("Launched Monopoly");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q41.test(q)) {
    let canvasWin = window.open("./canvas-drawing-app-master/", "_blank");
    if (canvasWin) {
      window.focus();
      log("Launched Canvas");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q42.test(q)) {
    let audioPlayerWin = window.open(
      "./audio-player-visualizer-master/",
      "_blank"
    );
    if (audioPlayerWin) {
      window.focus();
      log("Launched AudioPlayer");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q43.test(q)) {
    let bBadCastWin = window.open("../Breaking-Bad-Cast/", "_blank");
    if (bBadCastWin) {
      window.focus();
      log("Launched BBad Cast app");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q44.test(q)) {
    let bmiCalcWin = window.open("../bmi-calculator/", "_blank");
    if (bmiCalcWin) {
      window.focus();
      log("Launched BMI Calculator");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q45.test(q)) {
    let theMazeWin = window.open(
      "https://alexs-maze-game.netlify.app/",
      "_blank"
    );
    if (theMazeWin) {
      window.focus();
      log("Launched The Maze");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q46.test(q)) {
      let calendarWin = window.open("./calendar-mobile/", "_blank");
      if (calendarWin) {
        window.focus();
        log("Launched the mobile-friendly Calendar");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
  } else if (q47.test(q)) {
    let recipeAppWin = window.open("../recipe-app/", "_blank");
    if (recipeAppWin) {
      window.focus();
      log("Launched Recipe App");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q48.test(q)) {
    let spInvadersWin = window.open("./space-invaders/", "_blank");
    if (spInvadersWin) {
      window.focus();
      log("Launched Space Invaders");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q49.test(q)) {
    let voiceNotesAppWin = window.open("./speech-to-text-js-master/", "_blank");
    if (voiceNotesAppWin) {
      window.focus();
      log("Launched Voicenotes App");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q50.test(q)) {
    let gdoodlesWin = window.open("./today-in-google-doodles-history/", "_blank");
    if (gdoodlesWin) {
      window.focus();
      log("Launched Today In Google Doodles History");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q51.test(q)) {
    let percentCalcWin = window.open("./percentage-calc/", "_blank");
    if (percentCalcWin) {
      window.focus();
      log("Launched %age calculator");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q52.test(q)) {
    let tempConvWin = window.open("./temp-conv/", "_blank");
    if (tempConvWin) {
      window.focus();
      log("Launched Temperature Converter");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q53.test(q)) {
    let findMealsWin = window.open("./meal-finder/", "_blank");
    if (findMealsWin) {
      window.focus();
      log("Launched Meal Finder");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q54.test(q)) {
  	msg = "";
    $output.text(msg);
    let relaxerAppWin = window.open("./relaxer-app/", "_blank");
    if (relaxerAppWin) {
      window.focus();
      if (detectDeviceType() == "Desktop" || detectDeviceType() != "Mobile") {
      msg = "Take a deep breath, ";
      playText(msg);
      setTimeout(() => {
        msg = "breathe in, hold, ";
        playText(msg);
        setTimeout(() => {
          msg = "breathe out";
          playText(msg);
        }, 2005);
      }, 1650);
    }
      log("Launched Relaxer");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q55.test(q)) {
    let newYearCountdownWin = window.open("./new-year-countdown/", "_blank");
    if (newYearCountdownWin) {
      window.focus();
      log("Launched New Year Countdown app");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q56.test(q)) {
  	msg = "";
    $output.text(msg);
    let typingGameWin = window.open("./typing-game/", "_blank");
    if (typingGameWin) {
      window.focus();
      msg = "How fast do you type? Let's test!";
      playText(msg);
      log("Launched Speed Typer");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q57.test(q)) {
  	msg = "";
    $output.text(msg);
    let expenseTrackerWin = window.open("./expense-tracker/", "_blank");
    if (expenseTrackerWin) {
      window.focus();
      msg = "Worried about keeping track of your expenses? Don't be. I can help you track them";
      playText(msg);
      log("Launched Expense Tracker");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q58.test(q)) {
    let timerAppWin = window.open("./timer/", "_blank");
    if (timerAppWin) {
      window.focus();
      log("Launched Timer");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q59.test(q)) {
    let lavaGameWin = window.open("./miner-of-lava/", "_blank");
    if (lavaGameWin) {
      window.focus();
      log("Launched Miner of Lava");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q60.test(q)) {
  	msg = "";
    $output.text(msg);
    let loanCalcWin = window.open("./loan-calc/", "_blank");
    if (loanCalcWin) {
      window.focus();
      msg = "Calculate what your mortgage payment could be";
      playText(msg);
      log("Launched Loan Calculator");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q61.test(q)) {
  	msg = "";
    $output.text(msg);
    let randomQuoteWin = window.open("./random-quote-gen/", "_blank");
    if (randomQuoteWin) {
      window.focus();
      msg = "Here's a random quote of the day";
      playText(msg);
      log("Launched Quotes app");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q62.test(q)) {
  	msg = "";
    $output.text(msg);
    let memoryGameWin = window.open("./mem-game/", "_blank");
    if (memoryGameWin) {
      window.focus();
      msg = "Let's test if your memory is weak";
      playText(msg);
      log("Launched Memory Game");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q63.test(q)) {
  	msg = "";
    $output.text(msg);
    let caloTrackerWin = window.open("./calotracker/", "_blank");
    if (caloTrackerWin) {
      window.focus();
      msg = "Worried about your diet? Don't be. I can help you track calories";
      playText(msg);
      log("Launched CaloTracker");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q64.test(q)) {
    let dungeonCrawlerGameWin = window.open("../dungeon-crawler/", "_blank");
    if (dungeonCrawlerGameWin) {
      window.focus();
      log("Launched Roguelife");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q65.test(q)) {
    let fotoflickWin = window.open("../foto-flick/", "_blank");
    if (fotoflickWin) {
      window.focus();
      log("Launched Fotoflick");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
  } else if (q66.test(q)) {
    msg = "";
    $output.html(msg);
    let motivQuotesAppWin = window.open("../motivational-quote-generator/", "_blank");
    if (motivQuotesAppWin) {
      window.focus();
      msg = "Demotivated? Don't be because I'm here to motivate you";
      playText(msg);
      log("Launched Motivational Quotes app");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q67.test(q)) {
    msg = "";
    $output.html(msg);
    let spaceDataAppWin = window.open("../live-spacestation-data/", "_blank");
    if (spaceDataAppWin) {
      window.focus();
      msg = "Let discover what's above us, in the space. Search for stuff like blackholes, wormholes, Apollo 8, or 12 mission";
      playText(msg);
      log("Launched Space_data app");
    } else {
      alert("Please enable popups for this site!");
    }
  } else if (q68.test(q)) {
    let randImgsGeneratingAppWin = window.open("../SnapShots/", "_blank");
    if (randImgsGeneratingAppWin) {
      window.focus();
      log("Launched SnapShots");
    } else {
      alert("Please enable popups for this site!");
    }
    stopText();
    msg = "";
    $output.html(msg);
    } else if (q69.test(q)) {
    	msg = "";
	    $output.text(msg);
      showFeatures();
    } else if (q70.test(q)) {
      let quizGameWin = window.open("../Trivia-Db/", "_blank");
      if (quizGameWin) {
        window.focus();
        log("Launched Trivia_Db");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q71.test(q)) {
      msg = "";
      $output.html(msg);
      let tvSeriesAppWin = window.open("../tv-series-app/", "_blank");
      if (tvSeriesAppWin) {
        window.focus();
        msg = "Here you can find all of your most loved series";
        playText(msg);
        log("Launched Launched an app for TV Series data");
      } else {
        alert("Please enable popups for this site!");
      }
    } else if (q72.test(q)) {
      let moviesAppWin = window.open("../yoMovies/", "_blank");
      if (moviesAppWin) {
        window.focus();
        log("Launched Movies app");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q73.test(q)) {
      msg = "";
      $output.html(msg);
      let daySchedulerAppWin = window.open("./day_scheduler/", "_blank");
      if (daySchedulerAppWin) {
        window.focus();
        msg = "Time is a precious resource—you can’t stop using it and you can’t find more of it, but you need it to do absolutely everything. From scheduling meetings to fulfilling orders, time is behind every aspect of running a business and you can’t afford to manage it poorly. So, I think you might want to develop a better routine. If you do, use our built-in application as your scheduler and never miss any of your scheduled work";
        playText(msg);
        log("Launched Day Scheduler");
      } else {
        alert("Please enable popups for this site!");
      }
    } else if (q74.test(q)) {
      let boxChaserGameWin = window.open("./box-chaser/", "_blank");
      if (boxChaserGameWin) {
        window.focus();
        log("Launched Chase-The-Box");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q75.test(q)) {
      let giphyAppWin = window.open("./giphy/", "_blank");
      if (giphyAppWin) {
        window.focus();
        log("Launched Giphy");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q76.test(q)) {
      let pwGenAppWin = window.open("./Passwordgen/", "_blank");
      if (pwGenAppWin) {
        window.focus();
        log("Launched Password Generator");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q77.test(q)) {
      let theConstructorWin = window.open("./The Constructor/", "_blank");
      if (theConstructorWin) {
        window.focus();
        log("Launched The Constructor");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
      } else if (q78.test(q)) {
      let fisaveWin = window.open("../fisave-networth-tracking-app/", "_blank");
      if (fisaveWin) {
        window.focus();
        log("Launched Fisave");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q79.test(q)) {
      let habitTrackingAppWin = window.open("../habit-tracker/", "_blank");
      if (habitTrackingAppWin) {
        window.focus();
        log("Launched Habit_Tracker");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q80.test(q)) {
      let habitBuildingAppWin = window.open("../habit-builder/", "_blank");
      if (habitBuildingAppWin) {
        window.focus();
        log("Launched Habit_Builder");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q81.test(q)) {
      let unitConvAppWin = window.open("./unit-conv/", "_blank");
      if (unitConvAppWin) {
        window.focus();
        log("Launched Unit_Converter");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q82.test(q)) {
      let rpgGameWin = window.open("./RPG-game/", "_blank");
      if (rpgGameWin) {
        window.focus();
        log("Launched Game_Of_Games");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q83.test(q)) {
      let bookListAppWin = window.open("./Mybooklist/", "_blank");
      if (bookListAppWin) {
        window.focus();
        log("Launched MyBookList");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q84.test(q)) {
      let mathGameWin = window.open("../math-flash-cards/", "_blank");
      if (mathGameWin) {
        window.focus();
        log("Launched Math flashcards game");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q85.test(q)) {
      let simonGameWin = window.open("https://alexs-simon-says.netlify.app/", "_blank");
      if (simonGameWin) {
        window.focus();
        log("Launched Simon");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q86.test(q)) {
      let lightMazeWin = window.open("./light-maze/", "_blank");
      if (lightMazeWin) {
        window.focus();
        log("Launched Light Maze");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q87.test(q)) {
      let pdfReaderWin = window.open("./voice-pdf-viewer/", "_blank");
      if (pdfReaderWin) {
        window.focus();
        log("Launched PDF Books Reader");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q88.test(q)) {
      let travelPlansWin = window.open("../travel-planner/", "_blank");
      if (travelPlansWin) {
        window.focus();
        log("Launched Travels app");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q89.test(q)) {
      let truthOrDareWin = window.open("https://truth-or-dare-by-alex.netlify.app", "_blank");
      if (truthOrDareWin) {
        window.focus();
        log("Launched Truth_or_Dare");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
    } else if (q90.test(q)) {
      let metronomeWin = window.open("https://abbaskhurram255.github.io/metronome/", "_blank");
      if (metronomeWin) {
        window.focus();
        log("Launched Metronome");
      } else {
        alert("Please enable popups for this site!");
      }
      stopText();
      msg = "";
      $output.html(msg);
  } else {
    $("#message").slideFadeToggle(800);
    msg = "Sorry, the program is still under development.";
    $output.html(msg);
    console.log(msg);
    $("#message").delay(10000).slideFadeToggle(800);
  }
}

/* A function that capitalizes first letter of a string, but not each
      function capFirstletter(
      string) {
       return string[0]
       .toUpperCase() + string.slice(
         1);
      }
      */

/* A function that capitalizes each first letter of a phrase (string actually) */
function toTitleCase(phrase) {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

//age calculator
function calc_age(ag) {
  var diff_ms = Date.now() - ag.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

//Time function:
function startTime() {
  let d = new Date();
  let hr = d.getHours();
  let min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  if (hr < 10) {
    hr = "0" + hr;
  }
  const $time = $("#time");
  msg = hr + ":" + min + ampm;
  $time.html(msg);
  setTimeout(startTime, 1000);
}

// Date function
function dateTime() {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let d = new Date();
  let day = days[d.getDay()];
  let hr = d.getHours();
  let min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let result =
    "Local date & time right now: <br>" +
    day +
    " " +
    hr +
    ":" +
    min +
    ampm +
    " (" +
    seconds_with_leading_zeros(d) +
    ") " +
    month +
    " " +
    date +
    " " +
    year;
  return result;
}

// Theme switcher:
var lTheme, dTheme, islTh, isdTh, snack;
$lTheme = $(".lightTh");
$dTheme = $(".darkTh");
snack = document.querySelector("#snackbar");
/*       initial state of the switcher: 
      islTh = true;
      isdTh = !islTh;
      */
function switchTheme() {
  if (islTh && !isdTh) {
    $lTheme.attr("media", "none");
    $dTheme.attr("media", "");
    islTh = false;
    isdTh = !islTh;
    $("#recIcon").attr("src", "whitemike.png")
    //Show a snackbar every time theme switches to dark Theme
    snack.innerText = "Switched to Dark theme";
    snack.className = "show";
    setTimeout(function () {
      snack.className = snack.className.replace("show", "");
    }, 3000);
    console.log("Switched to Dark Theme");
  } else if (isdTh && !islTh) {
    $lTheme.attr("media", "");
    $dTheme.attr("media", "none");
    isdTh = false;
    islTh = !isdTh;
    $("#recIcon").attr("src", "blackmike.png")
    //Show a snackbar every time the theme switches to light theme
    snack.innerText = "Switched to Light Theme";
    snack.className = "show";
    setTimeout(function () {
      snack.className = snack.className.replace("show", "");
    }, 3000);
    console.log("Switched to Light Theme");
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
  return console.debug(x);
} //end

// Get User's Timezone
function seconds_with_leading_zeros(d) {
  return /\((.*)\)/.exec(new Date().toString())[1];
}

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
      //Show a snackbar every time Speech Synthesis reads the text
      snack.innerText =
        "Speech synthesis is ongoing. You can't enter text in the input field until it finishes reading.";
      snack.className = "show";
      /*optional expression*/
      setTimeout(function () {
        snack.className = snack.className.replace("show", "");
      }, 2300);
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

const modal = document.getElementById("myModal");
let closeBtn = document.getElementsByClassName("close")[0];
closeBtn.onclick = function () {
  modal.style.display = "none";
  stopText();
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    stopText();
  }
};

const showFeatures = () => {
  modal.style.display = "block";
  stopText();
  msg = "Don't underestimate me, because I can perform logical operations too. For example, if you asked me to inform you whether 2020 or 2021 is a leap year, I'd let you know. And if you asked me to inform you of the date it'll be tomorrow or the date it was yesterday, I'd let you know. What's more, if you asked me to inform you whether it is a weekday today or weekend yet, I'd let you know.";
  playText(msg);
}
//end block of modal fn

const showLicense = () => {
  let showLicWin = window.open("./License/", "_blank");
  if (showLicWin) {
    window.focus();
    log("Revealed the license");
  } else {
    alert("Please enable popups for this site!");
  }
  stopText();
}

const showPortfolio = () => {
  let showPortfolioWin = window.open("../", "_blank");
  if (showPortfolioWin) {
    window.focus();
    log("Sent user to the portfolio");
  } else {
    alert("Please enable popups for this site!");
  }
  stopText();
}

$(document).bind("mouseleave", function(e) {
  if (e.pageY - $(window).scrollTop() <= 1) {    
      stopText();
  }
});

/*
window.onbeforeunload = confirmExit;
function confirmExit()
{
  return "You have attempted to leave this page.  If you have made any changes to the fields without clicking the Save button, your changes will be lost.  Are you sure you want to exit this page?";
}
*/
