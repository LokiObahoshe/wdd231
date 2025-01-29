const currentUrl = window.location.href;

//console.log(currentUrl);

const everything = currentUrl.split('?');
//console.log(everything);

let formData = everything[1].split('&');
//console.log(formData);

function show(cup) {
    //console.log(cup)
    formData.forEach((element) => {
        //console.log(element)
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace("%40", "@");
        };
    });
    return (result)
}

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<p>Appointment for ${show("first")} ${show("last")}</p>
<p>Proxy ${show("ordinance")} on ${show("fecha")} in the ${show("location")} Temple.</p>
<p>Your Phone: ${show("phone")}</p>
<p>Your Email: <a href=">${show("email")}">${show("email")}</a></p>
`