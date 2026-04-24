// ==========================================
// Portfolio Animations & Interaction Script
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- Mobile hamburger menu ---
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = "";
            });
        });

        // Close mobile menu on resize above 900px
        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) {
                hamburger.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

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
