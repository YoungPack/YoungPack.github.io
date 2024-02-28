document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const carouselImages = document.querySelectorAll('.artwork-carousel img');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Existing functionality for handling blur and scroll effects
    carouselImages.forEach((img, index) => {
        if (index !== 0) {
            img.classList.add('blur', 'hidden');
        } else {
            img.classList.remove('blur');
        }
    });

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingUp = scrollTop < lastScrollTop;

        if (scrollTop < 100) {
            if (isScrollingUp) {
                navbar.classList.add('fade-in');
                navbar.classList.remove('fade-out');
                hero.classList.add('fade-in');
                hero.classList.remove('fade-out', 'animate-up');
            }
        } else {
            navbar.classList.remove('fade-in');
            navbar.classList.add('fade-out');
            hero.classList.remove('fade-in');
            hero.classList.add('fade-out', 'animate-up');
        }

        carouselImages.forEach(img => img.classList.add('blur'));

        carouselImages.forEach(img => {
            const imgRect = img.getBoundingClientRect();
            const isInViewport = imgRect.top >= 0 && imgRect.bottom <= window.innerHeight;

            if (isInViewport) {
                img.classList.remove('blur', 'hidden');
                img.classList.add('fade-in', 'pop');
            } else {
                if (!isScrollingUp) {
                    img.classList.add('hidden');
                }
                img.classList.remove('fade-in', 'pop');
            }
        });

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize the function on load

    // Smooth Scrolling for In-Page Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Optional: Hamburger Menu Toggle for Smaller Screens
    // Assuming you have a .hamburger-menu element in your HTML
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            const navList = document.querySelector('.nav-list');
            navList.classList.toggle('active');
        });
    }
});
