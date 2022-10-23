const count = document.querySelectorAll('.item').length;
console.log('Number of categories: ', count);

for (let i = 0; i < count; i++) {
    const category = document.querySelectorAll('.item')[i].querySelector('h2').textContent;
    console.log('Category: ', category);
    const counts = document.querySelectorAll('.item')[i].querySelectorAll('li').length;
    console.log('Elements: ', counts);
}