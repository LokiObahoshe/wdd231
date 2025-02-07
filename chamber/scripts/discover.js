import { places } from '../data/places.mjs'

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

// Display Places
function placeCard(placeList) {
    const displayplaces = document.getElementById('displayplaces');
    displayplaces.innerHTML = '';

    placeList.forEach((place, index) => {
        const placeCard = document.createElement('div');

        const placeFigure = document.createElement('figure');

        const placeImage = document.createElement('img');
        placeImage.setAttribute('src', place.image);
        placeImage.setAttribute('alt', place.name);
        // This conditional statement was added to
        // reduce Largest Contentful Paint (LCP) that
        // was removing points in performance
        if (index === 0) {
            placeImage.removeAttribute('loading');
        } else {
            placeImage.setAttribute('loading', 'lazy');
        }
        placeImage.setAttribute('width', '100%');
        placeImage.setAttribute('height', 'auto');

        placeFigure.appendChild(placeImage);
        placeCard.appendChild(placeFigure);

        const placeName = document.createElement('h2');
        placeName.textContent = place.name;
        placeCard.appendChild(placeName);

        const placeAddress = document.createElement('address');
        placeAddress.textContent = place.address;
        placeCard.appendChild(placeAddress);

        const placeDesc = document.createElement('p');
        placeDesc.textContent = place.description;
        placeCard.appendChild(placeDesc);

        const placeButton = document.createElement('button');
        placeButton.textContent = `Learn more`;
        placeButton.addEventListener('click', () => {
            showcardDetails(place);
        });
        placeCard.appendChild(placeButton);

        displayplaces.appendChild(placeCard);
    });
}

// Set LocalStorage for Last Visits
const visitsMessage = document.getElementById('visitsmessage');
const banner = document.getElementById('banner');
const closeBanner = document.getElementById('closeBanner');

const lastVisitDate = localStorage.getItem('lastVisitDate');
const currentDate = new Date();
let message = '';

if (!lastVisitDate) {
    message = 'Welcome! Let us know if you have any questions.';
} else {
    const lastVisit = new Date(lastVisitDate);
    const timeDifference = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));

    if (timeDifference < 1) {
        message = 'Back so soon! Awesome!';
    } else {
        message = `You last visited ${timeDifference} ${timeDifference === 1 ? 'day' : 'days'} ago.`;
    }
}

visitsMessage.textContent = message;

localStorage.setItem('lastVisitDate', currentDate.toISOString());

//Dialog Trigger
function showcardDetails(place) {

    const cardDetails = document.getElementById('card-details');
    cardDetails.innerHTML = '';
    cardDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${place.name}</h2>
      <p>${place.description}</p>
    `;
    cardDetails.showModal();

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener("click", () => {
        cardDetails.close();
    });
}

// Display Visits Message
visitsMessage.textContent = message;

banner.style.display = 'block';

closeBanner.addEventListener('click', () => {
    banner.style.display = 'none';
});

placeCard(places);