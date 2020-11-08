$(document).ready(function() {
  var $currentDay = $("#currentDay");
  var notes = getNotes();
  // setting interval to reload every second
  var interval = setInterval(setTime, 1000);


  updateBackground();
  renderNotes();


  // sets date and displays in header
  function setTime() {
    var date = moment().format("dddd, MMMM Do YYYY");
    $currentDay.innerHTML = date;
    $("#currentDay").text(date);
  }

  // when save button is clicked input converted to string and saved in local storage
  // targeting the sibling element with the class of description to get its value as well as targeting the sibling with the id attribute to link to specific hour
  $(".saveBtn").on("click", function(e) {
    e.preventDefault();
    var val = $(this)
      .siblings(".description")
      .val();
    var hour = $(this)
      .siblings(".description")
      .attr("id");
    notes[hour] = val;

    localStorage.setItem("notes", JSON.stringify(notes));
  });

  $(".clear").on("click", function(e) {
    e.preventDefault();
    $(".description").val(" ");
    var notes = {}
    localStorage.setItem("notes", JSON.stringify(notes));
  });

// retrieving from local storage and converting any note from string to object
  function getNotes() {
    var notes = localStorage.getItem("notes");
    if (notes) {
      notes = JSON.parse(notes);
    } else {
      notes = {};
    }
    return notes;
  }

  // looping over keys in object
  function renderNotes() {
    for (var key in notes) {
      $("#" + key).val(notes[key]);
    }
  }

  // updating color blocks based on if that block is in past, present or future
  function updateBackground() {
    var currentHour = moment().hour();
    console.log(currentHour);

    $(".time-block").each(function() {
      var blockHour = parseInt($(this).children(".description").attr("id"));
      $(this)
      // remove any classes
      .removeClass("present")
      .removeClass("past")
      .removeClass("future");
      //compare with if statements
      //add class("present")
      if (blockHour === currentHour) {
        $(this).addClass("present");
      };
      if (blockHour < currentHour){
        $(this).addClass("past");
      };
      if (blockHour > currentHour){
        $(this).addClass("future");
      };
    });
  }
});
