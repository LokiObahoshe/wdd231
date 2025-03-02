// Display Businesses
function businessCard(businessList) {
    const displayBusinesses = document.getElementById('displaybusinesses');
    displayBusinesses.innerHTML = '';

    businessList.forEach((business, index) => {
        const businessCard = document.createElement('section');
        businessCard.classList.add('businesscardcss');

        const businessImage = document.createElement('img');
        businessImage.setAttribute('src', business.image);
        businessImage.setAttribute('alt', business.name);
        // This conditional statement was added to
        // reduce Largest Contentful Paint (LCP) that
        // was removing points in performance
        if (index === 0) {
            businessImage.removeAttribute('loading');
        } else {
            businessImage.setAttribute('loading', 'lazy');
        }
        businessImage.setAttribute('width', '100%');
        businessImage.setAttribute('height', 'auto');

        businessCard.appendChild(businessImage);

        const businessName = document.createElement('h2');
        businessName.textContent = business.name;
        businessCard.appendChild(businessName);

        const businessAddress = document.createElement('p');
        businessAddress.textContent = business.address;
        businessCard.appendChild(businessAddress);

        const businessPhone = document.createElement('p');
        businessPhone.textContent = business.phonenumber;
        businessCard.appendChild(businessPhone);

        const businessUrl = document.createElement('a');
        const link = document.createTextNode(business.websiteURL);
        businessUrl.appendChild(link)
        businessUrl.title = business.websiteURL;
        businessUrl.href = business.websiteURL;
        businessCard.appendChild(businessUrl);

        displayBusinesses.appendChild(businessCard);
    });
}

async function loadBusinesses() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        businessCard(data);
    } catch (error) {
        console.error('Error loading members.json:', error);
    }
}

loadBusinesses();

// Grid/List
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#displaybusinesses");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
    gridbutton.classList.add("active");
    listbutton.classList.remove("active");
});

listbutton.addEventListener("click", showList);

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
    listbutton.classList.add("active");
    gridbutton.classList.remove("active");
}

window.addEventListener("load", () => {
    gridbutton.classList.add("active");
    listbutton.classList.remove("active");
});
