const input = document.getElementsByClassName('input')[0];

let inputValue = '';
input.value = 0;

const numbersAndOperators = document.getElementsByClassName('js-number');
for (let i = 0; i < numbersAndOperators.length; i++) {
  numbersAndOperators[i].addEventListener('click', function (evt) {
    const n = evt.target.getAttribute('data-number');
    input.value = inputValue + n;
    inputValue = inputValue + n;
    if (input.value.length >= 24) {
      alert('Digit limit reached');
      input.value = input.value.slice(0, input.value.length - 1);
      inputValue = inputValue.slice(0, inputValue.length - 1);
      if (
        input.value.endsWith('*') ||
        input.value.endsWith('+') ||
        input.value.endsWith('-') ||
        input.value.endsWith('/')
      ) {
        input.value = input.value.slice(0, input.value.length - 2);
        inputValue = inputValue.slice(0, inputValue.length - 2);
      }
    }
  });
}

const result = document.getElementsByClassName('result')[0];
result.addEventListener('click', function () {
  input.value = calculateExpressions(input.value);
  if (inputValue.includes('.')) {
    inputValue = 5;
  }

  inputValue = '';

  if (input.value == 'Infinity' || input.value == '-Infinity') {
    input.value = 'Error';
  }
});
// по нажатию на Clear - очищать инпут и realInputValue

const clearButton = document.getElementsByClassName('js-clear')[0];
clearButton.addEventListener('click', function () {
  input.value = 0;
  inputValue = '';
});

// Пo нажатию на backspace очищать одну цифру
const backspaceButton = document.getElementsByClassName('js-backspace')[0];
backspaceButton.addEventListener('click', function () {
  input.value = input.value.slice(0, input.value.length - 1);
  inputValue = inputValue.slice(0, inputValue.length - 1);
  if (
    input.value.endsWith('*') ||
    input.value.endsWith('+') ||
    input.value.endsWith('-') ||
    input.value.endsWith('/')
  ) {
    input.value = input.value.slice(0, input.value.length - 2);
    inputValue = inputValue.slice(0, inputValue.length - 2);
  }
});

// Operations

function sum(a, b) {
  return a + b;
}
function reduce(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function calculate(a, b, operation) {
  const operationToFunction = {
    '+': sum,
    '-': reduce,
    '*': multiply,
    '/': divide,
  };
  return operationToFunction[operation](a, b);
}

function calculateExpressions(str) {
  let arr = str.split(' ');
  while (arr.length !== 1) {
    const indexMultOrDivide = arr.findIndex(item => {
      return item === '*' || item === '/';
    });
    if (indexMultOrDivide !== -1) {
      const threeItems = arr.slice(
        indexMultOrDivide - 1,
        indexMultOrDivide + 2
      );
      const a = +threeItems[0];
      const b = +threeItems[2];
      const operation = threeItems[1];
      const result = calculate(a, b, operation);
      arr = [
        ...arr.slice(0, indexMultOrDivide - 1),
        result,
        ...arr.slice(indexMultOrDivide + 2),
      ];
    } else {
      const threeItems = arr.slice(0, 3);
      const a = +threeItems[0];
      const b = +threeItems[2];
      const operation = threeItems[1];
      const result = calculate(a, b, operation);
      arr = [result, ...arr.slice(3)];
    }
  }
  return arr[0];
}
