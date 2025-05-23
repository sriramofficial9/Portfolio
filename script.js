document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const navLinks = document.querySelectorAll('#navbar a[href^="#"], #hero a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            // For home button, scroll to top explicitly if hero is the target
            if (targetId === "#hero" || targetId === "#") {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Adjust for fixed navbar height if necessary
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
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

    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('#navbar ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset if you have a fixed navbar
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            if (pageYOffset >= (sectionTop - navbarHeight - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        // If near top of page, set home as active
        if (pageYOffset < (document.getElementById('hero').offsetHeight / 2) ) {
           current = 'hero';
        }


        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
         // Special case for home when at the very top
        if (current === 'hero' || (current === '' && pageYOffset < 100)) {
            const homeLink = document.querySelector('#navbar a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });


    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Note about Prosway dates:
    // The resume shows Prosway Data Scientist role as "August 2024 - Oct 2024".
    // This is likely a typo as it's in the future and very short.
    // I've used "Aug 2023 - Oct 2023" in the HTML as a placeholder.
    // Please correct this in the `index.html` file if it's wrong.
    console.log("Portfolio script loaded. Remember to check the Prosway dates in index.html!");
});
