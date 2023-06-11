let buffer = "0";
let runningTotal = 0;
let perviousmathOperator;
let screenNumber = document.querySelector(".screen");


// listener for button clicks
function eventListener(){
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    })}

eventListener();

// function to handle button clicks
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleOperator(value);
    }
    else {
        handleNumber(value);
    }
    // calling the function to update the screen
    rerender();
}

// function to update the screen
function rerender() {
    screenNumber.innerText = buffer;
}

// function to handle numbers
function handleNumber(number) {
    if (buffer === "0") {
        buffer = number;
    } else { 
        buffer += number;
    }
    console.log(number);
}


// function to handle math
function handleMath(value) {
    console.log(value);
    if (buffer === "0") {
        // no calculation, just exit
        return;
    }
    // converting the string to a number   
    const intbuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intbuffer;
    } else {
        // performing the calculation
        flushOperation(intbuffer);

    }

    perviousmathOperator = value;
    buffer = "0";
}

function flushOperation(intbuffer) {
    if (perviousmathOperator === "+") {
        runningTotal += intbuffer;
    } else if (perviousmathOperator === "-") {  
        runningTotal -= intbuffer;
    }   else if (perviousmathOperator === "×") {            
        runningTotal *= intbuffer;
    }   else if (perviousmathOperator === "÷") {          
        runningTotal /= intbuffer;
    }
   console.log(runningTotal);  
}

// function to handle symbols
function handleOperator(operator) {
    switch (operator) {
       // clearing the screen 
        case "C":
            buffer = "0";
            break;
         // Deleting the last number
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "=":
            if ( perviousmathOperator === null ) {
                // need two number to do so
                return;
            }
            // performing the calculation
            flushOperation(parseInt(buffer));
            // clearing the pervious operator
            perviousmathOperator = null;
            // updating the screen
            buffer = +runningTotal;
            runningTotal = 0;
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(operator);
            break;
        default:
            break;
    }
}

