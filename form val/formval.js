const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const pass2 = document.getElementById('pass2');

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isValidEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function getName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getName(input)} should be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getName(input)} should be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, pass, pass2]);
    checkLength(username, 3, 15);
    checkLength(pass, 5, 20);
    checkPasswordMatch(pass, pass2);
    isValidEmail(email);
})
