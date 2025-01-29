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

        const showInfo = document.querySelector('#results');
        showInfo.innerHTML = `
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