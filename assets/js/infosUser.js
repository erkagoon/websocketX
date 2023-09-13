document.addEventListener('DOMContentLoaded', function() {
    let currentStartIndex = 0;
    const images = document.querySelectorAll('.gallery-container > .avatar-container'); // Le sélecteur "> img" s'assure que nous sélectionnons seulement les images directes et non d'autres éléments.
    const maxIndex = images.length - 1;

    const showImagesFromTo = (start, end) => {
        images.forEach((img, index) => {
            if (index >= start && index <= end) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        });
    };

    showImagesFromTo(currentStartIndex, currentStartIndex + 3);

    document.querySelector('.gallery-nav.left').addEventListener('click', () => {
        if (currentStartIndex > 0) {
            currentStartIndex -= 4;
        } else {
            currentStartIndex = maxIndex - (maxIndex % 4);
        }
        showImagesFromTo(currentStartIndex, currentStartIndex + 3);
    });

    document.querySelector('.gallery-nav.right').addEventListener('click', () => {
        if (currentStartIndex + 4 <= maxIndex) {
            currentStartIndex += 4;
        } else {
            currentStartIndex = 0;
        }
        showImagesFromTo(currentStartIndex, currentStartIndex + 3);
    });

    const avatars = document.querySelectorAll('.avatar-container img');
    for (let element of avatars) {
        element.addEventListener("click", () => {
            let avatarUserBar = document.querySelector(".avatar");
            let infosUserAvatar = document.querySelector(".infosUserAvatar");

            avatarUserBar.src = element.src;
            infosUserAvatar.src = element.src;

            
            fetch('/avatar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Assurez-vous d'ajouter des headers d'authentification si nécessaire
                },
                body: JSON.stringify({ avatar: element.src })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error('Erreur lors de la mise à jour de l\'avatar:', data.error);
                } else {
                    console.log(data.message);
                }
            })
            .catch(err => {
                console.error('Erreur lors de l\'exécution de la requête fetch:', err);
            });
        })
    }
});
