// The Hamburger
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// The Modified Dates
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;