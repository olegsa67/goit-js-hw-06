const input = document.querySelector('#validation-input');
input.addEventListener("blur", onValidInput);

function onValidInput() {
    if (input.value.length === Number(input.dataset.length)) {
        input.classList.add('valid');
    } else {
        input.classList.add('invalid');
    }
    console.log(currentTarget.value.length);
    console.log(input.dataset.length);
}