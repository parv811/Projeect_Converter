let main = document.getElementById('main');
let menuButton = document.getElementById('menuButton'); //get id of menu button
let themeButton = document.getElementById('themeButton'); //get id of theme/moon type button
var menuButtonState = 0;  //No display menu default
var themeButtonState = 0; //Default light mode
let root = document.querySelector(':root'); // selects html root element
let clearButton = document.querySelectorAll('[id^="clear"]'); //get all clear buttons' id
let inputFirst = document.querySelectorAll('#Dec-Bin,#Dec-hex,#Dec-oct,#Bin-hex,#Bin-oct,#oct-hex'); //source input
let inputSecond = document.querySelectorAll('#Dec-Bin1,#Dec-hex1,#Dec-oct1,#Bin-hex1,#Bin-oct1,#oct-hex1'); //destination output
let inputLabel = document.querySelectorAll('#Dec,#Dec1,#Dec2,#Bin1,#Bin2,#Oct2'); //source label
let outputLabel = document.querySelectorAll('#Bin,#Hex,#Oct,#Hex1,#Oct1,#Hex2'); //destination label
let decimalInput = document.querySelectorAll('#Dec-Bin,#Dec-hex,#Dec-oct'); // decimal i/o
let binaryInput = document.querySelectorAll('#Dec-Bin1,#Bin-hex,#Bin-oct'); // binary i/o
let octalInput = document.querySelectorAll('#oct-hex,#Bin-oct1,#Dec-oct1'); //octal i/o
let hexInput = document.querySelectorAll('#Dec-hex1,#Bin-hex1,#oct-hex1');//hexadecimal i/o
let convertButton = document.querySelectorAll('[id^="convert"]'); //get ids of convert button
let swapButton = document.querySelectorAll('[id^="swap"]'); //get ids of swap button
let swapButtonState = [0, 0, 0, 0, 0, 0]; //record swap button states in an array

changeMenuIcon = (icon2) => icon2.classList.toggle('fa-xmark');

//Set Input and output size limits 
hexInput.forEach(element => {
    element.setAttribute('maxlength', "5");
})
octalInput.forEach(element => {
    element.setAttribute('maxlength', "7");
})
decimalInput.forEach(element => {
    element.setAttribute('maxlength', "8");
})
binaryInput.forEach(element => {
    element.setAttribute('maxlength', "20");
})

//To hide and display the menu
menuButton.addEventListener('click', () => {
    if (menuButtonState == 0) {
        menu.style.display = "block";
        menuButtonState = 1;
    }
    else {
        menu.style.display = "none";
        menuButtonState = 0;
    }
})

//To change the page theme to light or dark mode
themeButton.addEventListener('click', () => {
    if (themeButtonState == 0) {
        root.style.setProperty('--fontcolorblack', 'white');
        root.style.setProperty('--fontcolorwhite', 'black');
        root.style.setProperty('--fontcolorbluish', 'grey');
        root.style.setProperty('--bgcolorwhite', 'black');
        root.style.setProperty('--bgcolorbluish', 'grey');
        root.style.setProperty('--bgcolorf0f0f0', '#CBC8C8');
        root.style.setProperty('--bgcolorf9f9f9', '#090909');
        root.style.setProperty('--bordercolorwhite', 'black');
        root.style.setProperty('--boxshadowcolorreddish', 'rgba(254, 218, 241, 0.8)');
        root.style.setProperty('--boxshadowcolorblack', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--boxshadowcolorfadeblack', 'rgba(255, 255, 255, 0.1)');

        themeButton.classList.replace('fa-moon', 'fa-sun');
        themeButtonState = 1;
    }
    else {
        root.style.setProperty('--fontcolorblack', 'black');
        root.style.setProperty('--fontcolorwhite', 'white');
        root.style.setProperty('--fontcolorbluish', 'lightsteelblue');
        root.style.setProperty('--bgcolorwhite', 'white');
        root.style.setProperty('--bgcolorbluish', 'lightsteelblue');
        root.style.setProperty('--bgcolorf0f0f0', '#f0f0f0');
        root.style.setProperty('--bgcolorf9f9f9', '#f9f9f9');
        root.style.setProperty('--bordercolorwhite', 'white');
        root.style.setProperty('--boxshadowcolorreddish', 'rgba(255, 0, 0, 0.1)');
        root.style.setProperty('--boxshadowcolorblack', 'rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--boxshadowcolorfadeblack', 'rgba(0, 0, 0, 0.1)');

        themeButton.classList.replace('fa-sun', 'fa-moon');
        themeButtonState = 0;
    }
})

//Clear Display Function
clearButton.forEach((element, index) => {
    element.addEventListener('click', () => {
        inputFirst[index].value = "";
        inputSecond[index].value = "";
    })
});

// Swap (input <-> Output) Function
swapButton.forEach((element, index) => {
    element.addEventListener('click', () => {
        let temp = inputFirst[index].id;
        inputFirst[index].id = inputSecond[index].id;
        inputSecond[index].id = temp;

        let temp2 = inputLabel[index].textContent;
        inputLabel[index].textContent = outputLabel[index].textContent;
        outputLabel[index].textContent = temp2;
        inputFirst[index].readOnly = false;
        inputSecond[index].readOnly = true;
        inputFirst[index].value = "";
        inputSecond[index].value = "";

        swapButtonState[index] = swapButtonState[index] ? 0 : 1;
        
    })
});

/*Important Note : Here, The approx precision according to me is 8-10 digits(integer part precision).
And it does not handle fractional part. So, the fractional part entered is truncated and only integer part is evaluated !*/

//Decimal <-> Binary Conversion Code

function convert1() {
    let decimalString = document.getElementById('Dec-Bin');
    let binaryString = document.getElementById('Dec-Bin1');
    // Decimal -> Binary Conversion
    if (swapButtonState[0] == 0) {
        let decimal = BigInt(decimalString.value);
        let binary = "";

        //Seperate integer part and mantissa part
        let integer = Math.floor(Number(decimal));

        if (integer == 0) binary = "0";

        //Conversion Logic - Integer Part
        for (let i = integer; i != 0; i = Math.floor(i / 2)) {
            let rem = i % 2;
            binary = rem + binary;
        }
        binaryString.value = binary;
    }
    //Binary -> Decimal Conversion
    else {
        let binary = BigInt(binaryString.value);
        let decimal = 0;

        //Seperate integer part and mantissa part
        let integer = Math.floor(Number(binary));

        //Conversion Logic - Integer Part
        let multiplier = 1;
        for (let i = integer; i != 0; i = Math.floor(i / 10)) {
            let rem = i % 10;
            decimal += (rem * multiplier);
            multiplier *= 2;
        }
        decimalString.value = decimal;
    }
}