/**
 * ==========================================================================
 * ELYSIUM VILLA - CINEMATIC INTERACTIONS & ANIMATIONS
 * Dibangun menggunakan GSAP & ScrollTrigger
 * ==========================================================================
 */

// Mendaftarkan Plugin ScrollTrigger ke GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. PRELOADER & HERO ENTRANCE SEQUENCE
       ========================================================================== */
    const initPreloader = () => {
        const tl = gsap.timeline();

        // Mengatur status awal elemen hero agar tidak terlihat sebelum preloader selesai
        gsap.set('.hero-content .subtitle, .hero-content .title, .scroll-indicator', { 
            y: 50, 
            opacity: 0 
        });

        // Simulasi loading selesai
        window.addEventListener('load', () => {
            tl.to('.preloader', {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
                delay: 2.5, // Menunggu animasi CSS preloader selesai
                onComplete: () => {
                    document.body.classList.remove('loading');
                }
            })
            // Sequence masuknya teks Hero secara sinematik
            .to('.hero-content .subtitle', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .to('.hero-content .title', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.6")
            .to('.scroll-indicator', {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            }, "-=0.8");
        });
    };

    /* ==========================================================================
       2. NAVBAR SCROLL INTERACTION
       ========================================================================== */
    const initNavbar = () => {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    };

    /* ==========================================================================
       3. PARALLAX EFFECTS (HERO & EXPERIENCE SECTION)
       ========================================================================== */
    const initParallax = () => {
        // Hero Background Parallax
        gsap.to('.hero-background', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: '#hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Experience Section Background Parallax
        gsap.to('.bg-parallax-image', {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: '#experiences',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Floating Badge Parallax (About Section)
        gsap.to('.floating-badge', {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: '.about-section',
                start: "top center",
                end: "bottom top",
                scrub: 1 // Efek inertia yang lebih halus
            }
        });
    };

    /* ==========================================================================
       4. SCROLL REVEAL ANIMATIONS (REUSABLE)
       ========================================================================== */
    const initReveals = () => {
        
        // Animasi elemen yang muncul ke atas (Reveal Up)
        const revealUpElements = gsap.utils.toArray('.reveal-up');
        revealUpElements.forEach((elem) => {
            gsap.fromTo(elem, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%", // Mulai animasi saat elemen 85% dari atas viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animasi elemen yang membesar perlahan (Reveal Scale - untuk Galeri)
        const revealScaleElements = gsap.utils.toArray('.reveal-scale');
        revealScaleElements.forEach((elem) => {
            gsap.fromTo(elem,
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animasi Teks Paragraf Spesifik (Reveal Text)
        const revealTextElements = gsap.utils.toArray('.reveal-text');
        revealTextElements.forEach((elem) => {
            gsap.fromTo(elem,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    };

    /* ==========================================================================
       5. STAGGERED GRID ANIMATIONS (VILLAS & EXPERIENCES)
       ========================================================================== */
    const initStaggers = () => {
        // Animasi Card Vila secara bergantian
        ScrollTrigger.create({
            trigger: '.villas-section',
            start: "top 70%",
            animation: gsap.fromTo('.villa-card', 
                { y: 60, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    stagger: 0.2, 
                    ease: "power3.out" 
                }
            ),
            toggleActions: "play none none reverse"
        });

        // Animasi Grid Pengalaman secara bergantian
        ScrollTrigger.create({
            trigger: '.experience-grid',
            start: "top 75%",
            animation: gsap.fromTo('.experience-item', 
                { y: 40, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1, 
                    stagger: 0.15, 
                    ease: "power2.out" 
                }
            ),
            toggleActions: "play none none reverse"
        });
    };

    /* ==========================================================================
       6. IMAGE ZOOM PARALLAX (ABOUT SECTION)
       ========================================================================== */
    const initImageParallax = () => {
        gsap.to('.reveal-image img', {
            scale: 1.1,
            y: "10%",
            ease: "none",
            scrollTrigger: {
                trigger: '.reveal-image',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    };

    // Eksekusi semua fungsi inisialisasi
    initPreloader();
    initNavbar();
    initParallax();
    initReveals();
    initStaggers();
    initImageParallax();

});