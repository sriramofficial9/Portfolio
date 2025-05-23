document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('#navbar a[href^="#"], #hero a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            } else if (targetId === "#hero" || targetId === "#") {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id], header[id]'); // Include header
    const navLi = document.querySelectorAll('#navbar ul li a');
    window.addEventListener('scroll', () => {
        let current = 'hero'; // Default to hero
        const navbarHeight = navbar.offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // Adjusted offset
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
         // Ensure home is active when at very top
        if (pageYOffset < (document.getElementById('hero').offsetHeight / 2 - navbarHeight) ) {
           navLi.forEach(a => a.classList.remove('active'));
           const homeLink = document.querySelector('#navbar a[href="#hero"]');
           if (homeLink) homeLink.classList.add('active');
        }
    });

    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Simple fade-in on scroll for sections (optional)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.section, .experience-card, .project-card, .skill-category');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0'; // Initially hide
        el.style.transform = 'translateY(30px)'; // Initial offset
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        scrollObserver.observe(el);
    });

    console.log("Enhanced portfolio script loaded. Remember to replace ALL image placeholders!");
    console.warn("Prosway Dates: Please verify 'Aug 2024 - Oct 2024' in index.html for Prosway and correct if needed.");
});
