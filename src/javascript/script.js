// ==========================================
// Portfolio Animations & Interaction Script
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- General fade-in on scroll ---
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply starting styles and observe elements (excluding project sections which have their own observer)
    const animateElements = document.querySelectorAll("section:not(.projects-showcase), .hero-content, .hero-image");

    animateElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        observer.observe(element);
    });

    // --- Project Showcase: scroll-triggered reveal ---
    const projectSections = document.querySelectorAll(".project-section");

    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    });

    projectSections.forEach(section => {
        projectObserver.observe(section);
    });

});
