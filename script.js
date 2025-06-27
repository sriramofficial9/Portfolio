// This script handles the fade-in animations as you scroll down the page.
document.addEventListener("DOMContentLoaded", function() {
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    // Checks if an element is in the viewport
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    // Adds the 'visible' class to an element to trigger the animation
    const displayScrollElement = (element) => {
        element.classList.add("visible");
    };

    // Removes the 'visible' class (optional, for re-animating)
    const hideScrollElement = (element) => {
        element.classList.remove("visible");
    };

    // The main function that loops through elements and checks their position
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } 
            // Uncomment the 'else' block below to make animations re-trigger on scroll up
            // else {
            //     hideScrollElement(el);
            // }
        });
    };
    
    // Add the scroll event listener
    window.addEventListener("scroll", handleScrollAnimation);
    
    // Trigger animation for elements already in view on initial page load
    handleScrollAnimation();
});
