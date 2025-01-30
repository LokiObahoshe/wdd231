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

function showMembershipDetails(membershipType) {
    courseDetails.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${membershipType} Membership Details</h2>
            <p>Learn about the benefits and features of the ${membershipType} membership level.</p>
        `;
    courseDetails.showModal();

    const closeModal = document.getElementById('closeModal');
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('nonprofitmembership').addEventListener('click', () => showMembershipDetails('Non-Profit'));
    document.getElementById('bronzemembership').addEventListener('click', () => showMembershipDetails('Bronze'));
    document.getElementById('silvermembership').addEventListener('click', () => showMembershipDetails('Silver'));
    document.getElementById('goldmembership').addEventListener('click', () => showMembershipDetails('Gold'));
});