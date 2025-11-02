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

// Menu functionality
const menuBackdrop = document.getElementById('menuBackdrop');
const body = document.body;

const toggleMenu = () => {
    const menu = document.getElementById('menu');
    const menuButton = document.getElementById('menuButton');
    
    menu.classList.toggle('active');
    menuBackdrop.classList.toggle('active');
    menuButton.classList.toggle('fa-bars');
    menuButton.classList.toggle('fa-xmark');
    
    // Prevent body scroll when menu is open
    body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
};

// Menu button click handler
menuButton.addEventListener('click', toggleMenu);

// Close menu when clicking outside
menuBackdrop.addEventListener('click', toggleMenu);

// Close menu when clicking on a menu item
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
        
        // Remove active class from all links
        document.querySelectorAll('.menu a').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// Handle escape key to close menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
        toggleMenu();
    }
});





//Theme toggle functionality with persistent state
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
        themeButton.classList.replace('fa-moon', 'fa-sun');
        themeButtonState = 1;
    } else {
        themeButton.classList.replace('fa-sun', 'fa-moon');
        themeButtonState = 0;
    }
};

//Initialize theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

//Theme toggle event listener
themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

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

// Function to validate if the value is a valid decimal number
const isValidDecimal = (value) => {
    return /^[0-9]+$/.test(value) && Number(value) >= 0;
};

// Function to validate if the value is a valid binary number
const isValidBinary = (value) => {
    return /^[01]+$/.test(value);
};

// Function to validate if the value is a valid octal number
const isValidOctal = (value) => {
    return /^[0-7]+$/.test(value);
};

// Function to validate if the value is a valid hexadecimal number
const isValidHex = (value) => {
    return /^[0-9A-Fa-f]+$/.test(value);
};

/*Important Note : Here, The approx precision according to me is 8-10 digits(integer part precision).
And it does not handle fractional part. So, the fractional part entered is truncated and only integer part is evaluated !*/

//Decimal <-> Binary Conversion Code

function convert1() {
    let decimalString = document.getElementById('Dec-Bin');
    let binaryString = document.getElementById('Dec-Bin1');

    const errorPara = document.getElementById("error1");
    errorPara.textContent="";

    // Decimal -> Binary Conversion
    if (swapButtonState[0] == 0) {
        if (decimalString.value.trim() === "") {
            errorPara.textContent = '*Decimal input field cannot be empty.';
            return;
        }
        if (!isValidDecimal(decimalString.value)) {
            errorPara.textContent = '*Invalid decimal input. Please enter a non-negative integer.';
            return;
        }
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
        if (binaryString.value.trim() === "") {
            errorPara.textContent = '*Binary input field cannot be empty.';
            return;
        }
        if (!isValidBinary(binaryString.value)) {
            errorPara.textContent = '*Invalid binary input. Please enter a valid binary number.';
            return;
        }
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

//Decimal <-> Hexadecimal Conversion Code
function convert2() {
    let decimalString = document.getElementById('Dec-hex');
    let hexString = document.getElementById('Dec-hex1');
    
    const errorPara = document.getElementById("error2");
    errorPara.textContent="";

    // Decimal -> Hexadecimal Conversion
    if (swapButtonState[1] == 0) {
        if (decimalString.value.trim() === "") {
            errorPara.textContent = '*Decimal input field cannot be empty.';
            return;
        }
        if (!isValidDecimal(decimalString.value)) {
            errorPara.textContent = '*Invalid decimal input. Please enter a non-negative integer.';
            return;
        }
        let decimal =BigInt(decimalString.value);
        let hex = 0;

        // Convert Decimal to hexadecimal string
        hex = decimal.toString(16).toUpperCase();

        // Set the converted hex value in the corresponding input field
        hexString.value = hex;
    } 
    // Hexadecimal -> Decimal Conversion
    else {
        if (hexString.value.trim() === "") {
            errorPara.textContent = '*Hexadecimal input field cannot be empty.';
            return;
        }
        if (!isValidHex(hexString.value)) {
            errorPara.textContent = '*Invalid hexadecimal input. Please enter a valid hexadecimal number.';
            return;
        }
        let hex = BigInt('0x'+hexString.value.toUpperCase());
        let decimal = "";

        // Convert Hexadecimal to decimal string
        decimal = hex.toString(10);
        
        // Set the converted decimal value in the corresponding input field
        decimalString.value = decimal;
    }   
}

//Decimal <-> Octal Conversion Code
function convert3() {
    let decimalString = document.getElementById('Dec-oct');
    let octalString = document.getElementById('Dec-oct1');

    const errorPara = document.getElementById("error3");
    errorPara.textContent="";

    // Decimal -> Octal Conversion
    if (swapButtonState[2] == 0) {
        if (decimalString.value.trim() === "") {
            errorPara.textContent = '*Decimal input field cannot be empty.';
            return;
        }
        if (!isValidDecimal(decimalString.value)) {
            errorPara.textContent = '*Invalid decimal input. Please enter a non-negative integer.';
            return;
        }
        let decimal =BigInt(decimalString.value);
        let octal = 0;

        // Convert Decimal to Octal string
        octal = decimal.toString(8);

        // Set the converted octal value in the corresponding input field
        octalString.value = octal;
    } 
    // Octal -> Decimal Conversion
    else {
        if (octalString.value.trim() === "") {
            errorPara.textContent = '*Octal input field cannot be empty.';
            return;
        }
        if (!isValidOctal(octalString.value)) {
            errorPara.textContent = '*Invalid octal input. Please enter a valid octal number.';
            return;
        }
        let octal = BigInt('0o'+octalString.value);
        let decimal = "";

        // Convert Octal to decimal string
        decimal = octal.toString(10);
        
        // Set the converted decimal value in the corresponding input field
        decimalString.value = decimal;
    }   
}

//Binary <-> Hexadecimal Conversion Code

function convert4() {
    let binaryString = document.getElementById('Bin-hex');
    let hexString = document.getElementById('Bin-hex1');

    const errorPara = document.getElementById("error4");
    errorPara.textContent="";

    // Binary -> Hexadecimal Conversion
    if (swapButtonState[3] == 0) {
        if (binaryString.value.trim() === "") {
            errorPara.textContent = '*Binary input field cannot be empty.';
            return;
        }
        if (!isValidBinary(binaryString.value)) {
            errorPara.textContent = '*Invalid binary input. Please enter a valid binary number.';
            return;
        }
        let binary =BigInt('0b'+binaryString.value);
        let hex = 0;

        // Convert Binary to hexadecimal string
        hex = binary.toString(16).toUpperCase();

        // Set the converted hex value in the corresponding input field
        hexString.value = hex;
    } 
    // Hexadecimal -> Binary Conversion
    else {
        if (hexString.value.trim() === "") {
            errorPara.textContent = '*Hexadecimal input field cannot be empty.';
            return;
        }
        if (!isValidHex(hexString.value)) {
            errorPara.textContent = '*Invalid hexadecimal input. Please enter a valid hexadecimal number.';
            return;
        }
        let hex = BigInt('0x'+hexString.value.toUpperCase());
        let binary = "";

        // Convert Hexadecimal to binary string
        binary = hex.toString(2);
        
        // Set the converted binary value in the corresponding input field
        binaryString.value = binary;
    }   
}

function convert5() {
    let binaryString = document.getElementById('Bin-oct');
    let octalString = document.getElementById('Bin-oct1');

    const errorPara = document.getElementById("error5");
    errorPara.textContent="";

    // Binary -> Octal Conversion
    if (swapButtonState[4] == 0) {
        if (binaryString.value.trim() === "") {
            errorPara.textContent = '*Binary input field cannot be empty.';
            return;
        }
        if (!isValidBinary(binaryString.value)) {
            errorPara.textContent = '*Invalid binary input. Please enter a valid binary number.';
            return;
        }
        let binary =BigInt('0b'+binaryString.value);
        let octal = 0;

        // Convert Binary to octal string
        octal = binary.toString(8);

        // Set the converted octal value in the corresponding input field
        octalString.value = octal;
    } 
    // Octal -> Binary Conversion
    else {
        if (octalString.value.trim() === "") {
            errorPara.textContent = '*Octal input field cannot be empty.';
            return;
        }
        if (!isValidOctal(octalString.value)) {
            errorPara.textContent = '*Invalid octal input. Please enter a valid octal number.';
            return;
        }
        let octal = BigInt('0o'+octalString.value);
        let binary = "";

        // Convert Octal to binary string
        binary = octal.toString(2);
        
        // Set the converted binary value in the corresponding input field
        binaryString.value = binary;
    }   
}

function convert6() {
    let octalString = document.getElementById('oct-hex');
    let hexString = document.getElementById('oct-hex1');

    const errorPara = document.getElementById("error6");
    errorPara.textContent="";

    // Octal -> Hexadecimal Conversion
    if (swapButtonState[5] == 0) {
        if (octalString.value.trim() === "") {
            errorPara.textContent = '*Octal input field cannot be empty.';
            return;
        }
        if (!isValidOctal(octalString.value)) {
            errorPara.textContent = '*Invalid octal input. Please enter a valid octal number.';
            return;
        }
        let octal =BigInt('0o'+octalString.value);
        let hex = 0;

        // Convert Octal to hexadecimal string
        hex = octal.toString(16).toUpperCase();

        hexString.value = hex;
    } 
    // Hexadecimal -> Octal Conversion
    else {
        if (hexString.value.trim() === "") {
            errorPara.textContent = '*Hexadecimal input field cannot be empty.';
            return;
        }
        if (!isValidHex(hexString.value)) {
            errorPara.textContent = '*Invalid hexadecimal input. Please enter a valid hexadecimal number.';
            return;
        }
        let hex = BigInt('0x'+hexString.value.toUpperCase());
        let octal = 0;

        // Convert Hexadecimal to Octal string
        octal = hex.toString(8);
        
        // Set the converted Octal value in the corresponding input field
        octalString.value = octal;
    }   
}