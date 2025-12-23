/**
 * La Canteen Restaurant - Modern JavaScript
 * STEAK. FRITES. REPEAT.
 * Smooth animations & interactions
 */

(function() {
    'use strict';

    // ===================================
    // PRELOADER
    // ===================================
    const loader = document.getElementById('loader');

    window.addEventListener('load', () => {
        document.body.classList.add('loading');
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 2200);
    });

    // ===================================
    // CUSTOM CURSOR
    // ===================================
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Cursor follows mouse instantly
            cursorX = mouseX;
            cursorY = mouseY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Follower has delay
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        });
    }

    // ===================================
    // NAVIGATION
    // ===================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // ===================================
    // SMOOTH SCROLL
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // MENU TABS
    // ===================================
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuPanels = document.querySelectorAll('.menu-panel');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPanel = tab.dataset.tab;

            // Update tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panels
            menuPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetPanel) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // ===================================
    // SCROLL ANIMATIONS (AOS)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Stagger animation for gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Stagger for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // ===================================
    // COUNTER ANIMATION
    // ===================================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.count);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    if (counters.length > 0) {
        counterObserver.observe(counters[0].closest('.about-stats'));
    }

    // ===================================
    // PARALLAX EFFECT
    // ===================================
    const parallaxElements = document.querySelectorAll('[data-speed]');

    if (parallaxElements.length > 0 && window.matchMedia('(min-width: 992px)').matches) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.speed);
                const rect = el.getBoundingClientRect();

                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = (scrollY - el.offsetTop) * (1 - speed) * 0.3;
                    el.style.transform = `translateY(${yPos}px)`;
                }
            });
        });
    }

    // ===================================
    // IMAGE LIGHTBOX
    // ===================================
    const galleryImages = document.querySelectorAll('.gallery-item');

    galleryImages.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-item-overlay span');

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-backdrop"></div>
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="lightbox-caption">${overlay ? overlay.textContent : ''}</div>
                    <button class="lightbox-close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            `;

            // Styles
            Object.assign(lightbox.style, {
                position: 'fixed',
                inset: '0',
                zIndex: '10000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            });

            const backdrop = lightbox.querySelector('.lightbox-backdrop');
            Object.assign(backdrop.style, {
                position: 'absolute',
                inset: '0',
                background: 'rgba(10, 10, 10, 0.95)',
                opacity: '0',
                transition: 'opacity 0.4s ease'
            });

            const content = lightbox.querySelector('.lightbox-content');
            Object.assign(content.style, {
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                opacity: '0',
                transform: 'scale(0.9)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            });

            const lightboxImg = lightbox.querySelector('img');
            Object.assign(lightboxImg.style, {
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain'
            });

            const caption = lightbox.querySelector('.lightbox-caption');
            Object.assign(caption.style, {
                textAlign: 'center',
                marginTop: '1.5rem',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.5rem',
                fontStyle: 'italic',
                color: '#B5A07C'
            });

            const closeBtn = lightbox.querySelector('.lightbox-close');
            Object.assign(closeBtn.style, {
                position: 'absolute',
                top: '-50px',
                right: '0',
                width: '40px',
                height: '40px',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
            });

            closeBtn.querySelector('svg').style.width = '20px';
            closeBtn.querySelector('svg').style.height = '20px';

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Animate in
            requestAnimationFrame(() => {
                backdrop.style.opacity = '1';
                content.style.opacity = '1';
                content.style.transform = 'scale(1)';
            });

            // Close function
            const closeLightbox = () => {
                backdrop.style.opacity = '0';
                content.style.opacity = '0';
                content.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }, 400);
            };

            backdrop.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });

            // Hover effect on close button
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = '#B5A07C';
                closeBtn.style.borderColor = '#B5A07C';
            });
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'none';
                closeBtn.style.borderColor = 'rgba(255,255,255,0.3)';
            });
        });
    });

    // ===================================
    // MAGNETIC BUTTONS
    // ===================================
    const magneticElements = document.querySelectorAll('.nav-cta, .btn-primary, .btn-outline');

    if (window.matchMedia('(hover: hover)').matches) {
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ===================================
    // TEXT REVEAL ON SCROLL
    // ===================================
    const revealTexts = document.querySelectorAll('.about-title, .menu-title, .gallery-title, .contact-title');

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealTexts.forEach(text => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(40px)';
        text.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        textObserver.observe(text);
    });

    // ===================================
    // LAZY LOADING IMAGES
    // ===================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // ACTIVE NAV LINK
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===================================
    // SMOOTH REVEAL FOR MENU ITEMS
    // ===================================
    const menuItems = document.querySelectorAll('.menu-item');

    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.1 });

    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        menuObserver.observe(item);
    });

    // ===================================
    // CONSOLE SIGNATURE
    // ===================================
    console.log(
        '%c LA CANTEEN ',
        'background: #B5A07C; color: #0A0A0A; font-size: 24px; padding: 15px 30px; font-family: "Playfair Display", Georgia, serif; font-weight: 400; letter-spacing: 0.3em;'
    );
    console.log(
        '%c STEAK. FRITES. REPEAT. ',
        'color: #B5A07C; font-size: 12px; font-style: italic; padding: 5px 0;'
    );
    console.log(
        '%c Elite Kitchen - Abidjan ',
        'color: #888; font-size: 10px;'
    );

})();
