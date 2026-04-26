// ==========================================
// Portfolio Animations & Interaction Script
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- Lenis Smooth Scroll Initialization ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integração de Links Âncora com Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target);
            }
        });
    });

    // --- Mobile hamburger menu ---
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuClose = document.getElementById("mobileMenuClose");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
        });

        if (mobileMenuClose) {
            mobileMenuClose.addEventListener("click", () => {
                hamburger.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = "";
            });
        }

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
