const topDisplay = document.querySelector('.top');
const bottomDisplay = document.querySelector('.bottom');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal')
const backspace = document.querySelector('.backspace');
const clear = document.querySelector('.all-clear');
const equals = document.querySelector('.equals');
let errors = document.querySelector('.errors');

let topNumber = '';
let bottomNumber = '';
let total = null;
let runningTotal = '';
let lastOperation = '';
let memOperation = '';
let operator = '';
let tempOne;
let tempTwo;


function checkLength() {
  if(bottomNumber.length > 15) {
    errors.textContent = 'Display Limit Reached';
    bottomDisplay.textContent = bottomNumber.substring(0, 14)
    } else if (bottomNumber.length < 15) {
        errors.textContent = ''
    }
}
    
numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        bottomNumber += e.target.textContent;
        bottomDisplay.textContent = bottomNumber;
        tempTwo = bottomNumber.substring(0, 14)
        checkLength();
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        lastOperation = e.target.textContent;
        topNumber += bottomDisplay.textContent;
        topDisplay.textContent = topNumber;
        tempOne = topNumber.substring(0, 14);
        bottomNumber = '';
        bottomDisplay.textContent = '';
        if (topDisplay.textContent !== '') {
            //work out logic to chain operations here
        }
    })
})

backspace.addEventListener('click', () => {
    bottomNumber = bottomNumber.slice(0, -1);
    bottomDisplay.textContent = bottomNumber;
});

clear.addEventListener('click', () => {
    clearDisplay();
});

equals.addEventListener('click', () => {
    performOperation(tempOne, tempTwo, lastOperation);
});

if (bottomDisplay.length == 15) {
    errors.textContent = 'Display Limit Reached';
}

function clearDisplay() { 
    topNumber = '';
    bottomNumber = '';
    newDisplay = '';
    total = null;
    lastOperation = '';
    memOperation = '';
    topDisplay.textContent = '';
    bottomDisplay.textContent = '';
}

function performOperation (tempOne, tempTwo, lastOperation) {
    if(lastOperation === '+') {
        total = parseFloat(tempOne.substring(0,14)) + parseFloat(tempTwo.substring(0,14));
        operationUpdates();
    } else if (lastOperation === '-') {
        total = parseFloat(tempOne.substring(0,14)) - parseFloat(tempTwo.substring(0,14));
        operationUpdates();
    } else if (lastOperation === '*') {
        total = parseFloat(tempOne.substring(0,14)) * parseFloat(tempTwo.substring(0,14));
        operationUpdates();
    } else if (lastOperation === '/') {
        total = parseFloat(tempOne.substring(0,14)) / parseFloat(tempTwo.substring(0,14));
        operationUpdates();
    } else if (lastOperation === '%') {
        total = parseFloat(tempOne.substring(0,14)) % parseFloat(tempTwo.substring(0,14));
        operationUpdates();
    }
}

function operationUpdates () {
    total = String(total).substring(0,14);
    bottomDisplay.textContent = total
    bottomNumber = total;
    topNumber = '';
    topDisplay.textContent = '';
}


//Need to fix so you can chain operations together without clicking on the equals button every time
//Need to work the decimal point logic
//Write other changes here