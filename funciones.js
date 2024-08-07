function appendToInput(value) {
    const input = document.getElementById('operando')
    const lastValue = input.value.slice(-1)
    const startPos = input.selectionStart;
    if (['+', '-', '*', '/', '%'].includes(lastValue) && ['+', '-', '*', '/', '%'].includes(value)) {
        input.value = input.value.slice(0, -1) + value;
    } else {
        input.value = input.value.slice(0, startPos) + value + input.value.slice(startPos);
        const newPos = startPos + value.length;
        input.setSelectionRange(newPos, newPos);
    }
    focusInput()
}

function calculateResult() {
    const input = document.getElementById('operando');
    let expression = input.value;
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
    try {
        const result = eval(expression); 
        input.value = result; 
    } catch (error) {
        input.value = "Error"
    }
}

function deleteLastChar() {
    const input = document.getElementById('operando');
    const startPos = input.selectionStart;
    if (startPos > 0) {
        input.value = input.value.slice(0, startPos - 1) + input.value.slice(startPos);
        input.setSelectionRange(startPos - 1, startPos - 1);
    }
    focusInput()
}

function clearInput() {
    const input = document.getElementById('operando');
    input.value = '';
    focusInput()
}

function moveCaretForward() {
    const input = document.getElementById('operando')
    const currentPosition = input.selectionStart
    if (currentPosition < input.value.length) {
        input.setSelectionRange(currentPosition + 1, currentPosition + 1)
        focusInput()
    }
}

function moveCaretBackward() {
    const input = document.getElementById('operando')
    const currentPosition = input.selectionStart
    if (currentPosition > 0) {
        input.setSelectionRange(currentPosition - 1, currentPosition - 1)
        focusInput()
    }
}

function focusInput() {
    document.getElementById('operando').focus();
}

document.getElementById('operando').addEventListener('focus', (event) => {
    event.target.removeAttribute('readonly');
});

document.getElementById('operando').addEventListener('blur', (event) => {
    event.target.setAttribute('readonly', true);
});

document.getElementById('operando').addEventListener('keydown', (event) => {
    event.preventDefault();
});

window.onload = function() {
    document.getElementById('operando').focus();
};
