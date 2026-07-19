const usernameField = document.querySelector("#usernameField")
const feedbackArea = document.querySelector(".invalid-feedback")

usernameField.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    
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