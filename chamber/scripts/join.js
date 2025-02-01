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

// Setting dates for timestamp
if (document.querySelector('form')) {
    document.querySelector('form').addEventListener('submit', function (event) {
        const timestampInput = document.querySelector('#timestamp');
        const currentDate = new Date().toISOString();
        timestampInput.value = currentDate;
    });
}

if (window.location.href.includes('thankyou.html')) {
    const currentUrl = window.location.href;
    //console.log(currentUrl);

    // Replace and split methods used for URL string
    const everything = currentUrl.split('?');
    if (everything.length > 1) {
        let formData = everything[1].split('&');
        console.log(formData);

        function show(info) {
            let result = '';
            formData.forEach((element) => {
                if (element.startsWith(info)) {
                    result = decodeURIComponent(element.split('=')[1]);
                    result = result.replace(/\+/g, ' ');
                }
            });
            return result;
        }

        // Format for timestamp
        const timestamp = new Date(show("timestamp"));
        const formattedTimestamp = timestamp.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        // Display submitted user info
        const showInfo = document.querySelector('#results');
        showInfo.innerHTML = `
            <h2>Submitted User Information:</h2>
            <p>Appointment for ${show("first")} ${show("last")}</p>
            <p>Title: ${show("title")}</p>
            <p>Your Email: <a href="mailto:${show("email")}">${show("email")}</a></p>
            <p>Your Phone: ${show("phone")}</p>
            <p>Organization: ${show("organizationname")}</p>
            <p>Membership Level: ${show("membership")}</p>
            <p>TimeStamp: ${formattedTimestamp}</p>
        `;
    }

}

//Dialog Trigger
const courseDetails = document.getElementById('course-details');

function showMembershipDetails(membershipType, content) {
    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${membershipType} Membership Level</h2>
        ${content}
    `;
    courseDetails.showModal();

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}

// This const is used to organize the membership level dialog pop-ups
// and to make things more "readable" for me
const membershipContent = {
    'Non-Profit': `
    <ul>
        <li>Free For Non-Profit Business and Organizations</li>
        <li>Quarterly Newsletter</li>
        <li>Training Sessions</li>
    </ul>
    <p><b>Free</b></p>
    `,
    'Bronze': `
    <ul>
        <li>Bronze Membership</li>
        <li>Access to Special Events</li>
        <li>Quarterly Newsletter</li>
        <li>Training Sessions</li>
        <li>Discounts on Advertising</li>
    </ul>
        <p><b>$10.00 Monthly</b></p>
    `,
    'Silver': `
    <ul>
        <li>Access to Special Events</li>
        <li>Quarterly Newsletter</li>
        <li>Training Sessions</li>
        <li>Discounts on Advertising</li>
        <li>Priority Tech Support</li>
    </ul>
        <p><b>$15.00 Monthly</b></p>
    `,
    'Gold': `
    <ul>
        <li>Access to Special Events</li>
        <li>Quarterly Newsletter</li>
        <li>Training Sessions</li>
        <li>Discounts on Advertising</li>
        <li>Priority Tech Support</li>
        <li>VIP Tech Support</li>
        <li>Personal Advertising Manager</li>
    </ul>
        <p><b>$20.00 Monthly</b></p>
    `
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('nonprofitmembership').addEventListener('click', () => showMembershipDetails('Non-Profit', membershipContent['Non-Profit']));
    document.getElementById('bronzemembership').addEventListener('click', () => showMembershipDetails('Bronze', membershipContent['Bronze']));
    document.getElementById('silvermembership').addEventListener('click', () => showMembershipDetails('Silver', membershipContent['Silver']));
    document.getElementById('goldmembership').addEventListener('click', () => showMembershipDetails('Gold', membershipContent['Gold']));
});