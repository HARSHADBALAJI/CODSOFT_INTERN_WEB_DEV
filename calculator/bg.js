// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '', operator = null, previousInput = '', resultDisplayed = false;

    buttons.forEach(button => button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.id === 'clear') {
            currentInput = operator = previousInput = '';
            display.textContent = '0';
        } else if (button.id === 'equals') {
            if (currentInput && previousInput && operator) {
                const result = evaluate(previousInput, currentInput, operator);
                display.textContent = `${previousInput} ${operator} ${currentInput} = ${result}`;
                previousInput = result;
                currentInput = operator = '';
                resultDisplayed = true;
            }
        } else if (button.classList.contains('operator')) {
            if (currentInput) {
                if (previousInput && operator) {
                    const result = evaluate(previousInput, currentInput, operator);
                    display.textContent = `${result} ${value}`;
                    previousInput = result;
                } else {
                    previousInput = currentInput;
                    display.textContent = `${previousInput} ${value}`;
                }
                currentInput = '';
                operator = value;
            }
        } else {
            currentInput = resultDisplayed ? value : currentInput + value;
            resultDisplayed = false;
            display.textContent = currentInput;
        }
    }));

    const evaluate = (a, b, op) => {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
        }
    };
});
