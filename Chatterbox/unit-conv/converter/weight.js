/*
ADD COMMENTS AND CREATE A CHEMICAL ENGINEERING CONVERTER
LIKE VESSEL THICKNESS CALCULATIONS.
*/
// REMEMBER YOU ARE IN A BRANCH
// Variables -- Grabbing DOM elements.
let outputView = document.getElementById("output");
let formula = document.getElementById("formula");
let scale = document.getElementById("scale");
let option1 = scale.querySelectorAll("option");
let choice = document.getElementById("choice");
let option2 = choice.querySelectorAll("option");
let calc = document.getElementById("pCalculations");
let toCalculate = document.querySelector("#calculate");
outputView.style.display = "none";
let cl = document.querySelector(".cl");
let ch = document.querySelectorAll(".ch");
let arr = ["placeholder"];

// Functions/Actions
// Calculation when area is choosen in the scale
function calculate() {
  //Get input
  let inputs = parseFloat(document.getElementById("lbsInput").value);
  let out1 = document.getElementById("output1");
  let out2 = document.getElementById("output2");
  let out3 = document.getElementById("output3");
  let out4 = document.getElementById("output4");
  outputView.style.display = "block";
  if (scale.value == "mass") {
    // Calculation when mass is choosen in the scale
    if (choice.value == "pounds") {
      out1.innerHTML = inputs;
      out2.innerHTML = inputs / 0.0022046;
      out3.innerHTML = inputs / 2.2046;
      out4.innerHTML = inputs * 16;
    } else if (choice.value == "grams") {
      out1.innerHTML = inputs / 453.592;
      out2.innerHTML = inputs;
      out3.innerHTML = inputs / 1000;
      out4.innerHTML = inputs / 28.35;
    } else if (choice.value == "kilograms") {
      out1.innerHTML = inputs * 2.20462;
      out2.innerHTML = inputs * 1000;
      out3.innerHTML = inputs;
      out4.innerHTML = inputs * 35.274;
    } else {
      out1.innerHTML = inputs / 16;
      out2.innerHTML = inputs * 28.35;
      out3.innerHTML = inputs / 35.274;
      out4.innerHTML = inputs;
    }
  } else if (scale.value == "temperature") {
    // Calculation when temperature is choosen in the scale
    //Get input
    if (choice.value == "celsius") {
      out1.innerHTML = inputs;
      out2.innerHTML = +inputs + 273.15;
      out3.innerHTML = +inputs * (9 / 5) + 32;
    } else if (choice.value == "kelvin") {
      out1.innerHTML = inputs - 273.15;
      out2.innerHTML = inputs;
      out3.innerHTML = ((inputs - 273.15) * 9) / 5 + 32;
    } else {
      out1.innerHTML = ((inputs - 32) * 5) / 9;
      out2.innerHTML = ((inputs - 32) * 5) / 9 + 273.15;
      out3.innerHTML = inputs;
    }
  } else if (scale.value == "time") {
    // Calculation when time is choosen in the scale
    if (choice.value == "hours") {
      out1.innerHTML = inputs;
      out2.innerHTML = inputs * 60;
      out3.innerHTML = inputs * 3600;
    } else if (choice.value == "minutes") {
      out1.innerHTML = inputs / 60;
      out2.innerHTML = inputs;
      out3.innerHTML = inputs * 60;
    } else {
      out1.innerHTML = inputs / 3600;
      out2.innerHTML = inputs / 60;
      out3.innerHTML = inputs;
    }
  } else {
    // Calculation when area is choosen in the scale
    if (choice.value == "squaremeter") {
      out1.innerHTML = inputs;
      out2.innerHTML = inputs / (2.59 * 10 ** 6);
      out3.innerHTML = inputs / 10.764;
    } else if (choice.value == "squaremile") {
      out1.innerHTML = inputs * (2.59 * 10 ** 6);
      out2.innerHTML = inputs;
      out3.innerHTML = inputs * (2.788 * 10 ** 7);
    } else {
      out1.innerHTML = inputs / 10.764;
      out2.innerHTML = inputs / (2.788 * 10 ** 7);
      out3.innerHTML = inputs;
    }
  }
  // Output Previous Calculations
  if (true) {
    if (scale.value == "mass") {
      arr.push(
        `Scale: ${scale.value.toUpperCase()}, Unit: ${choice.value.toUpperCase()} and outputted values: ${
          ch[0].textContent
        } = ${Number(out1.textContent).toFixed(2)}, ${
          ch[1].textContent
        } = ${Number(out2.textContent).toFixed(2)}, ${
          ch[2].textContent
        } = ${Number(out3.textContent).toFixed(2)}, ${
          ch[3].textContent
        } = ${Number(out4.textContent).toFixed(2)}`
      );
    } else {
      arr.push(
        `Scale: ${scale.value.toUpperCase()}, Unit: ${choice.value.toUpperCase()} and outputted values: ${
          ch[0].textContent
        } = ${Number(out1.textContent).toFixed(2)}, ${
          ch[1].textContent
        } = ${Number(out2.textContent).toFixed(2)}, ${
          ch[2].textContent
        } = ${Number(out3.textContent).toFixed(2)}`
      );
    }
  }
  arr.shift();
  arr.forEach(x => {
    document.getElementById(
      "pCalculations"
    ).innerHTML += ` <div><div class="disp">${x}</div> </div>`;
  });
}
function scaleSelect() {
  outputView.style.display = "none";
  choice.value = option2[0].value;
  outputView.style.visibility = "visible";
  document.getElementById("lbsInput").value = "";
  if (scale.value == "mass") {
    cl.style.display = "block";
    formula.innerHTML = `<button type="button" class="btn btn-md btn-warning" data-toggle="popover" data-placement="left" title="Mass Conversion Formula:" data-trigger="focus" data-content="1lb = 453.592grams, 0.453592kg, 16oz | 1gram = 0.00220462lbs, 0.001kg, 0.035274oz | 1kg = 2.205lbs, 1000gram, 35.274oz | 1oz = 0.0625lbs, 28.3495grams, 0.02835kg">Formula</button>
                   <p id="formulaOutput"> </p>`;
    ch[0].textContent = "Pound(s):";
    ch[1].textContent = "Gram(s):";
    ch[2].textContent = "Kilogram(s):";
    ch[3].textContent = "Oz:";
    option2[1].innerHTML = "Pounds";
    option2[2].innerHTML = "Grams";
    option2[3].innerHTML = "Kilograms";
    option2[4].style.display = "block";
    option2[4].innerHTML = "Ounce";
    option2[1].value = "pounds";
    option2[2].value = "grams";
    option2[3].value = "kilograms";
    option2[4].value = "ounce";
    toCalculate.addEventListener("click", calculate)
  } else if (scale.value == "temperature") {
    if (cl) {
      cl.style.display = "none";
    }
    formula.innerHTML = `<button type="button" class="btn btn-md btn-warning" data-toggle="popover" data-placement="left" data-trigger="focus" title="Temperature Conversion Formula:" 
        data-content="0°C + 273.15 = 273.15K | (0°C × 9/5) + 32 = 32°F">
        Formula</button>
                    <p id="formulaOutput"> </p>`;
    ch[0].textContent = "Celsius";
    ch[1].textContent = "Kelvin";
    ch[2].textContent = "Fahrenheit";
    option2[1].innerHTML = "Celsius";
    option2[2].innerHTML = "Kelvin";
    option2[3].innerHTML = "Fahrenheit";
    option2[4].style.display = "none";
    option2[1].value = "celsius";
    option2[2].value = "kelvin";
    option2[3].value = "fahrenheit";
    toCalculate.addEventListener("click", calculate);
  } else if (scale.value == "time") {
    if (cl) {
      cl.style.display = "none";
    }
    formula.innerHTML = `<button type="button" class="btn btn-md btn-warning" data-toggle="popover" title="Time Conversion Formula:" data-placement="left" data-trigger="focus" 
        data-content="1 hr = 60mins, 3600secs | 1 min = 0.0166667hrs, 60secs | 1 sec = 0.0166667mins, 0.000277778hrs">Formula</button>
                    <p id="formulaOutput"> </p>`;
    ch[0].textContent = "Hour(s)";
    ch[1].textContent = "Minute(s)";
    ch[2].textContent = "Second(s)";
    option2[1].innerHTML = "Hours";
    option2[2].innerHTML = "Minutes";
    option2[3].innerHTML = "Seconds";
    option2[4].style.display = "none";
    option2[1].value = "hours";
    option2[2].value = "minutes";
    option2[3].value = "seconds";
    toCalculate.addEventListener("click", calculate);
  } else {
    if (cl) {
      cl.style.display = "none";
    }
    formula.innerHTML = `<button type="button" class="btn btn-md btn-warning" data-toggle="popover" title="Area Conversion Formula:" data-trigger="focus" data-placement="left" data-content="1 square meter = 1e-6 square kilometer, 3.861e-7 square mile | 1 square mile = 2.59e+6 square meter, 2.59 square kilometer | 1 square kilometer = 0.386102 square mile, 1e+6 square meter">Formula</button>
                    <p id="formulaOutput"> </p>`;
    ch[0].textContent = "Square meter";
    ch[1].textContent = "Square Mile";
    ch[2].textContent = "Square Foot";
    option2[1].innerHTML = "Square meter";
    option2[2].innerHTML = "Square Mile";
    option2[3].innerHTML = "Square Foot";
    option2[4].style.display = "none";
    option2[1].value = "squaremeter";
    option2[2].value = "squaremile";
    option2[3].value = "squarefoot";
    toCalculate.addEventListener("click", calculate);
  }
// Listen for event

$(document).ready(function() {
    $("[data-toggle=popover]").popover();
  });
}
choice.addEventListener("change", () => {
  document.getElementById("lbsInput").value = "";
});

scale.addEventListener("change", scaleSelect);
document.getElementById("calc").addEventListener("click", function display() {
  calc.classList.toggle("hide");
});



