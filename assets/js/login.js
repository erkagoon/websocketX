function login(username, password) {
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
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

const loginBtn = document.querySelector(".login");
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    login(username, password);
})