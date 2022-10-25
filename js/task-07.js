const inpputRrange = document.querySelector('#font-size-control');
const spanText = document.querySelector('#text');
spanText.style.fontSize = '${Number(inputRange.value)}px';
console.log(spanText.style);