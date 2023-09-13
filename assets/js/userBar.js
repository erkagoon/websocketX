document.addEventListener('DOMContentLoaded', function() {
    const userBar = document.getElementById('userBar');
    const toggleButton = document.getElementById('toggleButton');
    let hideBarImg = document.querySelector(".hideBarImg");

    function hidden(pathName) {
        if(window.location.pathname === pathName) {
            userBar.classList.add('hidden');
            hideBarImg.src = "/assets/img/show.png";
        }
    }

    // Pour cacher la barre sur les pages qu'on veut
    hidden('/gameCore');
    
    toggleButton.addEventListener('click', function() {
        if (userBar.classList.contains('hidden')) {
            userBar.classList.remove('hidden');
            hideBarImg.src = "/assets/img/hide.png";
        } else {
            userBar.classList.add('hidden');
            hideBarImg.src = "/assets/img/show.png";
        }
    });
});