function appendToInput(value) {
    const input = document.getElementById('operando')
    input.readOnly = false;
    const lastValue = input.value.slice(-1)
    const startPos = input.selectionStart;
    if (['+', '-', '*', '/', '%'].includes(lastValue) && ['+', '-', '*', '/', '%'].includes(value)) {
        input.value = input.value.slice(0, -1) + value;
        input.setSelectionRange(input.value.length, input.value.length);
    } else {
        input.value = input.value.slice(0, startPos) + value + input.value.slice(startPos);
        const newPos = startPos + value.length;
        input.setSelectionRange(newPos, newPos);
    }
    input.readOnly = true;
    focusInput()
}

function calculateResult() {
    const input = document.getElementById('operando');
    input.readOnly = false;
    let expression = input.value;
    expression = expression.replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)');
    try {
        const result = eval(expression); 
        input.value = result; 
    } catch (error) {
        input.value = "Error"
    }
    input.readOnly = true;
    focusInput()
}

function deleteLastChar() {
    const input = document.getElementById('operando');
    input.readOnly = false;
    const startPos = input.selectionStart;
    if (startPos > 0) {
        input.value = input.value.slice(0, startPos - 1) + input.value.slice(startPos);
        input.setSelectionRange(startPos - 1, startPos - 1);
    }
    input.readOnly = true;
    focusInput()
}

function clearInput() {
    const input = document.getElementById('operando');
    input.readOnly = false;
    input.value = '';
    input.readOnly = true;
    focusInput()
}

function moveCaretForward() {
    const input = document.getElementById('operando')
    input.readOnly = false;
    const currentPosition = input.selectionStart
    if (currentPosition < input.value.length) {
        input.setSelectionRange(currentPosition + 1, currentPosition + 1)
        input.readOnly = true;
        focusInput()
    }
}

function moveCaretBackward() {
    const input = document.getElementById('operando')
    input.readOnly = false;
    const currentPosition = input.selectionStart
    if (currentPosition > 0) {
        input.setSelectionRange(currentPosition - 1, currentPosition - 1)
        input.readOnly = true;
        focusInput()
    }
}

function focusInput() {
    document.getElementById('operando').focus();
}

document.getElementById('operando').addEventListener('focus', (event) => {
    event.target.removeAttribute('readonly');
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        focusInput();
    });
});

document.getElementById('operando').addEventListener('keydown', (event) => {
    event.preventDefault();
});

window.onload = function() {
    focusInput()
};

