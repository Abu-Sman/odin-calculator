"use strict";

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num2 === 0 ? `Can't divide by zero!` : num1 / num2;
}

let firstNumber = "";
let operator = null;
let secondNumber = "";
let resultDisplayed = false;

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
  }
}

function roundResult(number) {
  if (typeof number === "string") return;
  return Math.round(number * 1000) / 1000;
}

const buttonEls = document.querySelectorAll(".btn");
const display = document.querySelector("input");

function updateDisplay(value) {
  display.value = value || 0;
}

function handleDigits(digit) {
  //  Start fresh if result is displayed on screen
  if (resultDisplayed) {
    firstNumber = "";
    operator = null;
    secondNumber = "";
    resultDisplayed = false;
  }

  if (!operator) {
    firstNumber += digit;
    updateDisplay(firstNumber);
  } else {
    secondNumber += digit;
    updateDisplay(secondNumber);
  }
}

function calculateResult() {
  let result = operate(operator, +firstNumber, +secondNumber);
  result = roundResult(result);
  updateDisplay(result);

  // Prepare for next calculation
  firstNumber = result.toString();
  secondNumber = "";
  operator = null;
}

function handleOperator(char) {
  if (!firstNumber) return;
  if (operator && secondNumber) {
    calculateResult();
  }
  operator = char;
  resultDisplayed = false;
}

function handleEquals() {
  if (!firstNumber || !operator || !secondNumber) return;
  calculateResult();
  resultDisplayed = true;
}

function handleClear() {
  firstNumber = "";
  operator = null;
  secondNumber = "";
  resultDisplayed = false;
  updateDisplay();
}

buttonEls.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.textContent;

    if (!isNaN(value)) {
      handleDigits(value);
    } else if (value === "=") {
      handleEquals();
    } else if (value === "C") {
      handleClear();
    } else {
      handleOperator(value);
    }
  });
});

document.addEventListener("keydown", (e) => {
  const btn = e.key;
  const operators = ["+", "-", "*", "/"];

  if (!isNaN(btn)) {
    handleDigits(btn);
  } else if (operators.includes(btn)) {
    handleOperator(btn);
  } else if (btn === "Enter") {
    handleEquals();
  } else if (btn === "Escape") {
    handleClear();
  }
});
