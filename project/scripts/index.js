import { moths } from '../data/moths.mjs'

// The Modified Dates
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;


// The Hamburger
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
    document.querySelector('header').classList.toggle('open');
});

//Dialog Trigger
function showcardDetails(moths) {

    const cardDetails = document.getElementById('card-details');
    cardDetails.innerHTML = '';
    cardDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${moths.commonName}</h2>
      <p>${moths.description}</p>
    `;
    cardDetails.showModal();

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener("click", () => {
        cardDetails.close();
    });
}

// The Moth Cards
function mothCard(mothList) {
    const mothCardsContainer = document.querySelector('#moth-cards');
    mothCardsContainer.innerHTML = '';

    mothList.forEach(moths => {

        const mothCard = document.createElement('section');
        mothCard.classList.add('moth-card-css');

        const mothImage = document.createElement('img');
        mothImage.setAttribute('src', moths.image);
        mothImage.setAttribute('alt', moths.name);
        mothImage.setAttribute('loading', 'lazy');
        mothCard.appendChild(mothImage);

        const mothName = document.createElement('h2');
        mothName.textContent = `${moths.commonName} (${moths.scientificName})`;
        mothCard.appendChild(mothName);

        const mothDesc = document.createElement('p');
        mothDesc.textContent = `${moths.description}`;
        mothCard.appendChild(mothDesc);

        const mothLocation = document.createElement('p');
        mothLocation.textContent = `${moths.location}`;
        mothCard.appendChild(mothLocation);

        const mothLife = document.createElement('p');
        mothLife.textContent = `${moths.lifeExpectancy}`;
        mothCard.appendChild(mothLife);

        const mothDiet = document.createElement('p');
        mothDiet.textContent = `${moths.diet}`;
        mothCard.appendChild(mothDiet);

        const mothThreats = document.createElement('p');
        mothThreats.textContent = `${moths.threats}`;
        mothCard.appendChild(mothThreats);

        const mothButton = document.createElement('button');
        mothButton.textContent = `Learn more`;
        mothButton.addEventListener('click', () => {
            showcardDetails(moths);
        });
        mothCard.appendChild(mothButton);

        mothCardsContainer.appendChild(mothCard);
    });
}


//Calling Functions
if (window.location.pathname.includes('browse.html')) {
    mothCard(moths);
}