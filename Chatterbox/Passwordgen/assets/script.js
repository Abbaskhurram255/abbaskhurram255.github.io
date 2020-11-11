//Global Variables
const generateBtn = document.getElementById("generate");
const display = document.getElementById("password");
const stringLength = document.getElementById("slider");
const lowerCase = document.getElementById("lowercase");
const upperCase = document.getElementById("uppercase");
const specialCase = document.getElementById("special");
const numberCase = document.getElementById("numbers");

//Characters possible
var lowerChars="abcdefghijklmnopqrstuvwxyz";
var upperChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numberChars="0123456789";
var specialChars="!@#$%^&*";

//Inputs value amount on page
function rangeValue() {
  var newValue = slider.value;
  var target = document.getElementById("range-value");
  target.innerHTML = newValue;
}

slider.addEventListener("input", rangeValue);

//creats the array
function makeArray() {
  let input = [];
  let userArray = [];

  if (lowercase.checked) {
    AddArray(lowerChars, input);
  };

  if (uppercase.checked) {
    AddArray(upperChars, input);
  };

  if (numbers.checked) {
    AddArray(numberChars, input);
  };

  if (special.checked) {
    AddArray(specialChars, input);
  };

  randomizer(input, userArray, slider.value);

  display.innerHTML = userArray.join('').toString();
};

generateBtn.addEventListener("click", makeArray); 

function AddArray (str,arr) {
  for (var i = 0; i < str.length; i++) {
      arr.push(str.charAt(i));
  };
};

function randomizer (arr, arr2, num) {
  for (var i = 0; i < num; i++) {
      let val = Math.floor(Math.random() * arr.length) + 1;
      arr2.push(arr[val])
  };
};


 