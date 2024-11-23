// const passwordBox = document.getElementById("password");
// const length = 12;

// const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const lowerCase = "abcdefghijklmnopqrstuvwxyz";
// const number = "0123456789";
// const symbol =  "!@#$%^&*()-_=+\|[]{};:/?.><";

// const allChars = upperCase + lowerCase + number + symbol;

// function generatePassword(){
//     let password  ="";
//     password += upperCase[Math.floor(Math.random() * upperCase.length)];
//     password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
//     password += number[Math.floor(Math.random() * number.length)];
//     password += symbol[Math.floor(Math.random() * symbol.length)];

//     while(length > password.length){
//         password += allChars[Math.floor(Math.random() * allChars.length)];
//     }
//     passwordBox.value = password;

// }

// password generation with checkboxes
let passwordBox = document.getElementById("password");
// Create an object that has strings
// for upperCase and lowerCase letters,
// symbols and numbers
const types = {
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

//  One of these types will be randomly selected to match the set password length
//  We have functions to select each one of these types
//  All these functions will be stored in an array, getType
const getType = [
  // Function to randomly select an uppercase letters
  function upperCase() {
    return types.upperCase[Math.floor(Math.random() * types.upperCase.length)];
  },

  // Function to randomly select an lowercase letters
  function lowerCase() {
    return types.lowerCase[Math.floor(Math.random() * types.lowerCase.length)];
  },

  // Function to randomly select a number
  function numbers() {
    return types.numbers[Math.floor(Math.random() * types.numbers.length)];
  },

  // Function to randomly select a symbol
  function symbols() {
    return types.symbols[Math.floor(Math.random() * types.symbols.length)];
  },
];

function generatePassword() {
  let number = document.getElementById("numbers").checked;
  let symbol = document.getElementById("symbols").checked;
  let upper = document.getElementById("upperCase").checked;
  let lower = document.getElementById("lowerCase").checked;

  if (number + symbol + upper + lower === 0) {
    alert("No box chosen. Please select at least one box!");
    return;
  }

  let passwordBox = document.getElementById("password");
  let length = document.getElementById("length");
  let pw = "";

  while (pw.length < length.value) {
    let typeAdder = getType[Math.floor(Math.random() * getType.length)];
    // The name attribute fetches the name of the <input> element
    let isChecked = document.getElementById(typeAdder.name).checked;

    if (isChecked) {
      pw += typeAdder();
    }
  }
  passwordBox.value = pw;
}

function copyPassword() {
  const generatedPassword = passwordBox.value;

  // Return the function, if the password isn't generated.
  if (!generatedPassword) {
    alert("No password generated!");
    return;
  }

  // Select the text field
  passwordBox.select();
  passwordBox.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(passwordBox.value);

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied: " + passwordBox.value;

  // Alert the copied text
  //   alert("Copied the text: " + passwordBox.value);
}
