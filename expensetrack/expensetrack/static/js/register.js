const usernameField = document.querySelector("#usernameField")
const feedbackArea = document.querySelector(".invalid-feedback")
const emailField = document.querySelector("#emailField")
const emailFeedbackArea = document.querySelector(".emailFeedBackArea")
const showPasswordToggle = document.querySelector(".showPasswordToggle")
const passwordField = document.querySelector("#passwordField")

usernameField.addEventListener('keyup', (e) => {
    const username = e.target.value
    feedbackArea.style.display = "none";
    usernameField.classList.remove("is-invalid");

    if(username.length > 0)
    {
        fetch("/authentication/validate-username",{
            body: JSON.stringify({username: username}),
            method: "POST",
        }).then((res) => res.json())
        .then((data) => {
            if(data.username_error)
            {
                usernameField.classList.add("is-invalid");
                feedbackArea.style.display = "block";
                feedbackArea.innerHTML=`<p>${data.username_error}</p>`;
            }

        })
    }
})

emailField.addEventListener('keyup', (e) => {
    const email = e.target.value

    console.log(">>>")
    console.log(email)
    if(email.length > 0)
    {
        fetch("/authentication/validate-email",
            {
                body: JSON.stringify({email: email}),
                method: "POST"
            }
        ).then((res) => res.json())
        .then((data) => {
            if(data.email_error){
                emailField.classList.add("is-invalid")
                emailFeedbackArea.style.display = "block"
                emailFeedbackArea.innerHTML = `<p>${data.email_error}</p>`
            }
            else
            {
                emailField.classList.remove("is-invalid")
                emailFeedbackArea.style.display = "none"
            }
        })
    }
})

const handlePasswordToggle = (e) => {
    if(showPasswordToggle.textContent == "SHOW")
    {
        showPasswordToggle.textContent = "HIDE";
        passwordField.setAttribute("type", "text");
    }
    else
    {
        showPasswordToggle.textContent = "SHOW";
        passwordField.setAttribute("type", "password");
    }
}

showPasswordToggle.addEventListener("click", handlePasswordToggle);
