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

// Dialog Trigger
function showcardDetails(moths) {

    const cardDetails = document.getElementById('card-details');
    cardDetails.innerHTML = '';
    cardDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${moths.commonName}</h2>
      <p>${moths.dialogDesc}</p>
    `;
    cardDetails.showModal();

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener("click", () => {
        cardDetails.close();
    });
}

// Async Call Moth Data
async function fetchMothData() {
    try {
        const response = await fetch('data/moths.json');
        const mothData = await response.json();
        mothCard(mothData);
    } catch (error) {
        console.error('Error fetching moth data:', error);
    }
}

// The Moth Cards
function mothCard(mothList) {
    const mothCardsContainer = document.querySelector('#moth-cards');
    mothCardsContainer.innerHTML = '';

    mothList.forEach((moths, index) => {

        const mothCard = document.createElement('section');
        mothCard.classList.add('moth-card-css');

        const mothImage = document.createElement('img');
        mothImage.setAttribute('src', moths.image);
        mothImage.setAttribute('alt', moths.commonName);
        // This conditional statement was added to
        // reduce Largest Contentful Paint (LCP) that
        // was removing points in performance
        if (index === 0) {
            const preloadLink = document.createElement('link');
            preloadLink.setAttribute('rel', 'preload');
            preloadLink.setAttribute('href', moths.image);
            preloadLink.setAttribute('as', 'image');
            document.head.appendChild(preloadLink);
            mothImage.removeAttribute('loading');
        } else {
            mothImage.setAttribute('loading', 'lazy');
        }
        mothImage.setAttribute('width', '100%');
        mothImage.setAttribute('height', 'auto');

        mothCard.appendChild(mothImage);

        const mothName = document.createElement('h2');
        mothName.textContent = `${moths.commonName} (${moths.scientificName})`;
        mothCard.appendChild(mothName);

        const mothDesc = document.createElement('p');
        mothDesc.textContent = `${moths.description}`;
        mothCard.appendChild(mothDesc);

        const mothLocation = document.createElement('p');
        mothLocation.textContent = `Location: ${moths.location}`;
        mothCard.appendChild(mothLocation);

        const mothLife = document.createElement('p');
        mothLife.textContent = `Life Expectancy: ${moths.lifeExpectancy}`;
        mothCard.appendChild(mothLife);

        const mothDiet = document.createElement('p');
        mothDiet.textContent = `Diet: ${moths.diet}`;
        mothCard.appendChild(mothDiet);

        const mothThreats = document.createElement('p');
        mothThreats.textContent = `Threats: ${moths.threats}`;
        mothCard.appendChild(mothThreats);

        const mothButton = document.createElement('button');
        mothButton.textContent = `Learn more`;
        mothButton.addEventListener('click', () => {
            showcardDetails(moths);
        });
        mothCard.appendChild(mothButton);

        // This creates the star button so users can
        // save moths to their bookmark list
        const star = document.createElement('span');
        star.classList.add('favoritecss');
        star.textContent = '☆';
        star.classList.add('favorite-star');
        mothCard.appendChild(star);

        if (isMothInFavorites(moths)) {
            star.textContent = '★';
            star.style.color = 'yellow';
        }

        star.addEventListener('click', () => {
            toggleFavorite(moths, star);
        });

        mothCardsContainer.appendChild(mothCard);
    });
}

// Bookmarked Moths
function isMothInFavorites(moths) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(favMoth => favMoth.commonName === moths.commonName);
}

function toggleFavorite(moths, star) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const mothIndex = favorites.findIndex(favMoth => favMoth.commonName === moths.commonName);

    if (mothIndex === -1) {
        favorites.push(moths);
        star.textContent = '★';
        star.classList.add('activestar');
        star.style.color = 'yellow';
    } else {
        favorites.splice(mothIndex, 1);
        star.textContent = '☆';
        star.style.color = '#F3FFEE';
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function renderFavorites() {
    const mothCardsFavContainer = document.querySelector('#moth-cards-book');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    mothCardsFavContainer.innerHTML = '';

    if (favorites.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('emptymessagecss');
        emptyMessage.textContent = 'Your library is empty. Add some moths to your library!';
        mothCardsFavContainer.appendChild(emptyMessage);
    } else {
        favorites.forEach((moths, index) => {
            const mothFavCard = document.createElement('section');
            mothFavCard.classList.add('moth-card-css');

            const mothImage = document.createElement('img');
            mothImage.setAttribute('src', moths.image);
            mothImage.setAttribute('alt', moths.commonName);
            // This conditional statement was added to
            // reduce Largest Contentful Paint (LCP) that
            // was removing points in performance
            if (index === 0) {
                const preloadLink = document.createElement('link');
                preloadLink.setAttribute('rel', 'preload');
                preloadLink.setAttribute('href', moths.image);
                preloadLink.setAttribute('as', 'image');
                document.head.appendChild(preloadLink);
                mothImage.removeAttribute('loading');
            } else {
                mothImage.setAttribute('loading', 'lazy');
            }
            mothImage.setAttribute('width', '100%');
            mothImage.setAttribute('height', 'auto');

            mothFavCard.appendChild(mothImage);

            const mothName = document.createElement('h2');
            mothName.textContent = `${moths.commonName} (${moths.scientificName})`;
            mothFavCard.appendChild(mothName);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove from Bookmark';
            mothFavCard.appendChild(removeButton);

            removeButton.addEventListener('click', () => {
                removeFavorite(moths, mothFavCard);
            });

            mothCardsFavContainer.appendChild(mothFavCard);
        });
    }
}

// Remove Bookmarked Moths
function removeFavorite(moths, mothCard) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const mothIndex = favorites.findIndex(favMoth => favMoth.commonName === moths.commonName);

    if (mothIndex !== -1) {
        favorites.splice(mothIndex, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        mothCard.remove();

        renderFavorites();
    }
}

// Recurring Donation Options Disabled/Enabled
function recurringDonation() {
    document.addEventListener("DOMContentLoaded", function () {
        const oneTimeRadio = document.getElementById("oneTime");
        const recurringRadio = document.getElementById("recurring");

        const monthlyRadio = document.getElementById("monthly");
        const quarterlyRadio = document.getElementById("quarterly");
        const annuallyRadio = document.getElementById("annually");

        function disableRecurringOptions() {
            monthlyRadio.disabled = true;
            quarterlyRadio.disabled = true;
            annuallyRadio.disabled = true;
        }

        function enableRecurringOptions() {
            monthlyRadio.disabled = false;
            quarterlyRadio.disabled = false;
            annuallyRadio.disabled = false;
        }

        oneTimeRadio.addEventListener("change", function () {
            if (oneTimeRadio.checked) {
                disableRecurringOptions();
            }
        });

        recurringRadio.addEventListener("change", function () {
            if (recurringRadio.checked) {
                enableRecurringOptions();
            }
        });

        if (oneTimeRadio.checked) {
            disableRecurringOptions();
        }
    });
}

//review.html Thank You Message
function anonymousDonation() {
    const queryParams = new URLSearchParams(window.location.search);

    const fullName = queryParams.get('fullname');
    const donationFee = queryParams.get('donationfee');
    const isAnonymous = queryParams.get('anonymous');

    const showInfo = document.querySelector('#results');

    let thankYouMessage;

    if (isAnonymous) {
        thankYouMessage = `<p>Thank you for your generous donation, Anonymous!</p>`;
    } else {
        thankYouMessage = `<p>Thank you for your generous donation, ${fullName}!</p>`;
    }

    showInfo.innerHTML = `${thankYouMessage}
<p>Donated: $${donationFee}</p>`;
}



//Calling Functions
if (window.location.pathname.includes('browse.html')) {
    fetchMothData()
} else if (window.location.pathname.includes('donate.html')) {
    recurringDonation();
} else if (window.location.pathname.includes('review.html')) {
    anonymousDonation();
} else if (window.location.pathname.includes('bookmark.html')) {
    renderFavorites();
}