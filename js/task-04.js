let counterValue = 0
const text = document.querySelector('[data-action="increment"]');
text.addEventListener("focus", () => {
    counterValue = counterValue += 1
});
console.log(counterValue)