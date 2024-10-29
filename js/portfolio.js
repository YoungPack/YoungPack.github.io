document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

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
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            const navList = document.querySelector('.nav-list');
            navList.classList.toggle('active');
        });
    }

    // Handling clicks on the "Read More" buttons within artwork elements
    const readMoreButtons = document.querySelectorAll('.artwork-info button');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const blogPostUrl = this.getAttribute('data-blog-url'); // Ensure you add a 'data-blog-url' attribute to your button element in HTML
            if(blogPostUrl) {
                window.location.href = blogPostUrl; // Redirects the user to the blog post URL
            }
        });
    });
});
