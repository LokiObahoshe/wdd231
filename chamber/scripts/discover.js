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
        placeCard.appendChild(placeButton);

        displayplaces.appendChild(placeCard);
    });
}

placeCard(places);