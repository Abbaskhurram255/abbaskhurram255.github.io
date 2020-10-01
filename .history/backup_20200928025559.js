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
 tippy('#searchInput', {
  content: 'Try asking for your name, age, or bday. Click me to dismiss the popup.',
  animation: 'scale',
  duration: 1200,
 });

 //optional* $(document).ready(function(){
 	$('#message').animate({height:'toggle', opacity: 'toggle'}, 5);
/* (referred to the animation:) or you could use this instead: $('#message').slideToggle(); */
 //optional* });
};
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
  if ((userName != null ||
    userName !== 'undefined') && (
    userName.length != 0 ||
    userName != '')) {
   alert(`Welcome ${userName}. I'm your virtual assistant.`);
   console.log("Welcome " + userName);
  } else {
   alert("Welcome, user!");
   console.log("Welcome, user!");
  }

  /* regular expressions/ questions to be answered: */
  var q1 =
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
   /(call me by another name)|(change my name)/gi,
   q11 =
   /(change my (dob|bday|day|birthday))/gi,
   q12 = /am I nice[?]?/gi,
   q13 =
   /(date)|(time)|(day)/gi,
   q14 =
   /(hi)|(hello)|(hey)|(hola)|(howdy)/gi,
   q15 = /(tic tac toe)/gi,
   q16 = /(weather)|(temperature)|(wind pressure)|((hot|rainy|cloudy) day)/gi
   1;

  function ask() {
   var q = document.querySelector(
     "#searchInput")
    .value; /* var that will be storing the value of question asked by the user */
   var $output = $(
    "#message"
    ); /* var for output message */
   if (q1.test(q)) {
   	$('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
   	/* or you could use this instead: $('#message').delay(10000).slideToggle(800); */
    msg = "Nothing much";
    if ((userName != null ||
      userName !== 'undefined') && (
      userName.length != 0 ||
      userName != '')) {
     msg += " " + userName +
      ", sup with you?";
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
     "Hey &#128075 <br>I'm Chatterbox, an assistant of yours. What can I assist you with?";
    $output.html(msg);
    console.log(msg);
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q3.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
    let age = calc_age(new Date(
     bday));
     let b = detect.parse(navigator.userAgent);
    msg =
     "<em style='font-weight:600;'>";
    msg +=
     "Here&#39s what I know about you:";
    msg += "<ul><li>Your name: " +
     userName +
     '</li>' +
     "<li>Your birthday: " +
     bday + '</li>' +
     "<li>Your age: " +
     age + "</li></ul></em>";
     msg += 
    $output.html(msg);
    console.log(msg);
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q4.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
    msg = "Not bad, and you?";
    $output.html(msg);
    console.log(msg);
    $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
   } else if (q5.test(q)) {
    $('#message').animate({height:'toggle', opacity: 'toggle'}, 800);
     msg = "Your name is " +
      userName + ".";
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
     msg = "You day is " + bday;
     log(msg);
    } else {
     bday = prompt(
      "Your bday isn't saved yet. Would you mind (re-)listing it?\nAccepted format: YYYY(separator)m(separator)d\nNote: We ask for your birthday only for statistical purposes.");
      msg =
      "Date set. Your new bday is " +
      bday;
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
      msg = 'You are ' + age;
      if (age <= 18) {
       msg +=
        ". Too young, pal &#128526";
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
         ". Too young, pal &#128526";
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
      if (cfm == true) {
       userName = prompt(
        'What do you want me to call you?',
        userName);
       console.log(userName);
       if ((userName != null ||
         userName !== 'undefined') &&
        (userName.length != 0 ||
         userName != '')) {
        msg =
         "&#128077 Sucess. I'll call you " +
         userName +
         " from now on ;)";
        console.log(msg);
       } else {
        userName = prompt(
         "Couldn't change your name. Try resubmitting it."
        );
        msg =
         "&#128077 Sucess. I'll call you " +
         userName +
         " from now on ;)";
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
      if (cfm == true) {
       bday = prompt(
        "Reset your bday. The format should be: YYYY(separator)m(separator)d\nNote: We ask for your birthday only for statistical proposes.");
        if ((bday != null ||
          bday !==
          'undefined') && (bday
          .length != 0 || bday != ''
         )) {
         msg =
          "&#128077 Success. Your new bday is " +
          bday;
         console.log(msg);
        } else {
         bday = prompt(
          "Couldn't change your bday. Try resubmitting it.\nNote: We ask for your birthday only for statistical purposes.");
          msg =
          "&#128077 Success. Your new bday is " +
          bday;
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
         "You are! Actually I think you are even way too nicer than me &#128524";
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
        msg = "Hey there &#128075, want some assistance? Try asking me for <a onclick='$(\"#searchInput\").val($(this).html());' style='font-weight:500;font-style:italic;color:rgba(0,0,255,0.9);text-decoration:underline;'>current date and time</a>";
        $output.html(msg);
        console.log(msg);
        $('#message').delay(10000).animate({height:'toggle', opacity: 'toggle'}, 800);
       } else if (q15.test(q)) {
        let gameWin = window.open('./tic-tac-toe-master/index.html', '_blank', "width=500,height=500,resizable=yes,toolbar=no,menubar=no");
        if (gameWin) { window.focus(); } else { alert('Please turn on popups on this site.'); }
      } else if (q16.test(q)) {
        let weatherWin = window.open('./weather/index.html', '_blank');
        if (weatherWin) { window.focus(); } else { alert('Please turn on popups on this site.'); }
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
        ampm + " " + month + " " +
        date + " " + year;
       return result;
      }

      // Theme switcher:
      var lTheme, dTheme, islTh,
       isdTh;
      $lTheme = $('.lightTh');
      $dTheme = $('.darkTh');
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
        console.log(
         "Switched to dark theme");
       } else if (isdTh && !islTh) {
        $lTheme.attr('media', '');
        $dTheme.attr('media',
        'none');
        isdTh = false;
        islTh = !isdTh;
        console.log(
         "Switched to light theme");
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
      function log(x) {
       return console.log(x);
      }

      function debug(x) {
       return console.log(x);
      }