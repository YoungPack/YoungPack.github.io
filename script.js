document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const carouselImages = document.querySelectorAll('.artwork-carousel img');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Apply blur to all images initially and hide them except the first
    carouselImages.forEach((img, index) => {
        img.classList.add('blur');
        if (index !== 0) img.classList.add('hidden');
    });

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingUp = scrollTop < lastScrollTop;

        // Hero and navbar fade-in/fade-out logic
        if (scrollTop < 100) {
            // Fade in the hero and navbar when near the top of the page
            if (isScrollingUp) {
                navbar.classList.add('fade-in');
                navbar.classList.remove('fade-out');
                hero.classList.add('fade-in');
                hero.classList.remove('animate-up', 'fade-out');
            }
        } else {
            // Fade out the hero and navbar when scrolling down
            navbar.classList.add('fade-out');
            navbar.classList.remove('fade-in');
            hero.classList.add('fade-out');
            hero.classList.remove('fade-in');
        }

        // First, reset all images to blurred as the default state
        carouselImages.forEach(img => img.classList.add('blur'));

        // Carousel images animation, blur logic, and popping effect
        carouselImages.forEach((img, index) => {
            const imgRect = img.getBoundingClientRect();
            const isInViewport = imgRect.top < window.innerHeight && imgRect.bottom >= 0;

            if (isInViewport) {
                // Remove blur, hidden classes, and apply fade-in, popping effect for in-view images
                img.classList.remove('blur', 'hidden');
                img.classList.add('fade-in', 'pop'); // 'pop' for the popping animation
            } else {
                // Apply blur to out-of-view images, hide them if scrolling down
                if (!isScrollingUp) {
                    img.classList.add('hidden');
                }
                img.classList.remove('fade-in', 'pop', 'enlarge'); // Ensure 'enlarge' is also managed
            }
        });

        lastScrollTop = scrollTop; // Update last scroll position
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Invoke on load to set initial state
});
