document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar", "components/navbar.html", () => {
        document.querySelectorAll('nav a[data-page]').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const page = link.getAttribute('data-page');
                loadPage(page);
            });
        });

        const logoButton = document.getElementById('logo-button');
        logoButton.addEventListener('click', (event) => {
            event.preventDefault();
            togglePage();
        });

        // Load all sections initially
        loadPage('home');
        loadPage('about');
        loadPage('contact');
    });

    loadComponent("footer", "components/footer.html");
});

function loadComponent(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}

function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById(page).innerHTML = data;
            document.getElementById(page).setAttribute('data-title', getPageTitle(page)); // Set the title attribute for each section
            updateLogoButton(page); // Update the logo button behavior if necessary
            if (page === 'home') {
                initializeCarousel();
            }
        });
}

function getPageTitle(page) {
    switch(page) {
        case 'home':
            return 'Accueil | CaninCompris';
        case 'about':
            return 'À Propos | CaninCompris';
        case 'contact':
            return 'Contact | CaninCompris';
        default:
            return 'CaninCompris';
    }
}

// function updateLogoButton(currentPage) {
//     const logoButton = document.getElementById('logo-button');
//     if (currentPage === 'home') {
//         logoButton.setAttribute('data-page', 'about');
//         logoButton.setAttribute('data-title', 'À propos | CaninCompris');
//     } else {
//         logoButton.setAttribute('data-page', 'home');
//         logoButton.setAttribute('data-title', 'Accueil | CaninCompris');
//     }
// }

// function togglePage() {
//     const logoButton = document.getElementById('logo-button');
//     const page = logoButton.getAttribute('data-page');
//     const title = logoButton.getAttribute('data-title');
//     loadPage(page, title);
// }

// Carousel functionality
