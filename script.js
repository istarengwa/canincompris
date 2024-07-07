document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar", "components/navbar.html", () => {
        document.querySelectorAll('nav a[data-page]').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const page = link.getAttribute('data-page');
                const title = link.getAttribute('data-title');
                loadPage(page, title);
            });
        });
    });

    loadComponent("footer", "components/footer.html");

    // Load the initial page content
    loadPage('home', 'Accueil | CaninCompris');
});

function loadComponent(id, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}

function loadPage(page, title) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
            document.title = title; // Update the document title
            if (page === 'home') {
                initializeCarousel();
            }
        });
}

// Carousel functionality
function initializeCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel .slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000);

    // Initialize the carousel with the first slide
    showSlide(currentSlide);
}
