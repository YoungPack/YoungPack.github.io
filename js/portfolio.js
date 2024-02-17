document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const carouselImages = document.querySelectorAll('.artwork-carousel img');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    
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
    handleScroll(); 
});
