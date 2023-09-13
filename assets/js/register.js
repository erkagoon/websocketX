function register(username, password, passwordCheck) {
    fetch('/reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            passwordCheck
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            let formulaireError = document.querySelector('#formulaireError');
            formulaireError.textContent = data.error;
        }
        if(data.redirection) {
            window.location.href = data.redirection;
        }
    })
    .catch(error => {
        console.error('Erreur lors de la requête:', error);
    });
}

const registerBtn = document.querySelector(".register");
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let passwordCheck = document.querySelector("#passwordCheck").value;

    register(username, password, passwordCheck);
})