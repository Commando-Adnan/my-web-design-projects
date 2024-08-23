let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

const elements = {
  numberButtons: document.querySelectorAll('[data-number]'),
  operatorButtons: document.querySelectorAll('[data-operator]'),
  equalsButton: document.getElementById('equalsBtn'),
  clearButton: document.getElementById('clearBtn'),
  deleteButton: document.getElementById('deleteBtn'),
  pointButton: document.getElementById('pointBtn'),
  lastOperationScreen: document.getElementById('lastOperationScreen'),
  currentOperationScreen: document.getElementById('currentOperationScreen')
};

window.addEventListener('keydown', handleKeyboardInput);
elements.equalsButton.addEventListener('click', evaluate);
elements.clearButton.addEventListener('click', clear);
elements.deleteButton.addEventListener('click', deleteNumber);
elements.pointButton.addEventListener('click', appendPoint);

elements.numberButtons.forEach(button => 
  button.addEventListener('click', () => appendNumber(button.textContent))
);

elements.operatorButtons.forEach(button => 
  button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (shouldResetScreen || elements.currentOperationScreen.textContent === '0') {
    resetScreen();
  }
  elements.currentOperationScreen.textContent += number;
}

function resetScreen() {
  elements.currentOperationScreen.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  elements.currentOperationScreen.textContent = '0';
  elements.lastOperationScreen.textContent = '';
  firstOperand = secondOperand = currentOperation = '';
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (!elements.currentOperationScreen.textContent.includes('.')) {
    elements.currentOperationScreen.textContent += elements.currentOperationScreen.textContent ? '.' : '0.';
  }
}

function deleteNumber() {
  elements.currentOperationScreen.textContent = elements.currentOperationScreen.textContent.slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation) evaluate();
  firstOperand = elements.currentOperationScreen.textContent;
  currentOperation = operator;
  elements.lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (!currentOperation || shouldResetScreen) return;

  secondOperand = elements.currentOperationScreen.textContent;
  if (currentOperation === '÷' && secondOperand === '0') {
    alert("You can't divide by 0!");
    return;
  }

  const result = roundResult(operate(currentOperation, firstOperand, secondOperand));
  elements.currentOperationScreen.textContent = result;
  elements.lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
  const { key } = e;
  if (key >= 0 && key <= 9) appendNumber(key);
  if (key === '.') appendPoint();
  if (key === '=' || key === 'Enter') evaluate();
  if (key === 'Backspace') deleteNumber();
  if (key === 'Escape') clear();
  if ('+-*/'.includes(key)) setOperation(convertOperator(key));
}

function convertOperator(keyboardOperator) {
  const operators = {
    '/': '÷',
    '*': '×',
    '-': '−',
    '+': '+'
  };
  return operators[keyboardOperator] || null;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  const operations = {
    '+': add,
    '−': subtract,
    '×': multiply,
    '÷': divide
  };
  return operations[operator] ? operations[operator](a, b) : null;
}