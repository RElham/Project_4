//Function: check required fields
function checkRequired(input, alert) {
    var result = true

    if (input.value === "") {
        console.log("Please enter your " + input.id + ".")
        alert.innerHTML = "Please enter your " + input.id + "."
        input.focus()
        result = false;
    } else {
        alert.innerHTML = ""
    }

    return result
}

//Function: validate email
function validateEmail(email, emailAlert) {
    var result = true

    var atPosition = email.value.indexOf("@");
    var dotPosition = email.value.lastIndexOf(".");

    if (atPosition < 1 || ( dotPosition - atPosition < 2 )) {
        console.log("Please enter a valid e-mail address.")
        emailAlert.innerHTML = "Please enter a valid e-mail address."
        email.focus()
        result = false;
    } else {
        emailAlert.innerHTML = ""
    }

    return result
}

//Function: validate phone number
function validatePhone(phone, phoneAlert) {
    var result = true

    var phoneAUPatter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneCountryCodePatter = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    if (!phone.value.match(phoneAUPatter) || !phone.value.match(phoneCountryCodePatter)) {
        console.log("Please enter a valid phone number.")
        phoneAlert.innerHTML = "Please enter a valid phone number."
        phone.focus()
        result = false;
    } else {
        phoneAlert.innerHTML = ""
    }

    return result
}

function submit() {
    var finalResult = true

    var firstname = document.getElementById("firstname")
    var lastname = document.getElementById("lastname")
    var phone = document.getElementById("phone")
    var email = document.getElementById("email")
    var message = document.getElementById("message")

    var alertFName = document.getElementById("alertFName")
    var alertLName = document.getElementById("alertLName")
    var alertPhone = document.getElementById("alertPhone")
    var alertEmail = document.getElementById("alertEmail")
    var alertMsg = document.getElementById("alertMsg")

    //check required fields
    if (checkRequired(firstname, alertFName) === false) {
        finalResult = false
    } else if (checkRequired(lastname, alertLName) === false) {
        finalResult = false
    } else if (checkRequired(phone, alertPhone) === false) {
        finalResult = false
    } else if (validatePhone(phone, alertPhone) === false) {
        //phone validation
        finalResult = false
    } else if (checkRequired(email, alertEmail) === false) {
        finalResult = false
    } else if (validateEmail(email, alertEmail) === false) {
        //email validation
        finalResult = false
    } else if (checkRequired(message, alertMsg) === false) {
        finalResult = false
    }
    
    console.log(finalResult)

    if (finalResult === true) {
        document.getElementById("popup").style.display = "block";
    }
}

function close() {
    document.getElementById("popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("It is work!")

    const submitBtn = document.getElementById("submitBtn")
    submitBtn.onclick = (event) => {
        //submit()
        console.log("submitBtn")
    }
})