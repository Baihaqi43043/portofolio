// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // Mobile Navigation Toggle
    // ==============================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ==============================
    // Smooth Scrolling
    // ==============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ==============================
    // Navbar Scroll Effect
    // ==============================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            header.style.background = 'rgba(255,255,255,0.98)';
        } else {
            header.style.boxShadow = '0 1px 0 rgba(0,0,0,0.06)';
            header.style.background = 'rgba(255,255,255,0.95)';
        }
    });

    // ==============================
    // Section Fade-in on Scroll
    // ==============================
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // ==============================
    // Stats Counter Animation
    // ==============================
    const animateCounter = (el, target, duration = 1200) => {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(start);
            }
        }, 16);
    };

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        // Animate stat cards entrance
        heroStats.querySelectorAll('.stat-card').forEach((card, i) => {
            card.style.setProperty('--index', i);
        });

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    entry.target.querySelectorAll('.stat-number').forEach(num => {
                        const target = parseInt(num.getAttribute('data-target'), 10);
                        animateCounter(num, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(heroStats);
    }

    // ==============================
    // Skill Bar Animation
    // ==============================
    const animateSkillBars = () => {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 200);
        });
    };

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        skillsObserver.observe(skillsSection);
    }

    // ==============================
    // Project Cards Stagger Animation
    // ==============================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        const projectsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectsGrid.classList.add('animate');
                    projectsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        projectsObserver.observe(projectsGrid);
    }

    // ==============================
    // Hero Typing Effect
    // ==============================
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const nameSpan = heroTitle.querySelector('.highlight');
        const nameText = nameSpan ? nameSpan.textContent : '';
        const fullHTML = heroTitle.innerHTML;
        const textBefore = fullHTML.split('<span')[0];

        heroTitle.innerHTML = '';
        let charIndex = 0;

        const typeText = () => {
            if (charIndex < textBefore.length) {
                heroTitle.innerHTML += textBefore.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 80);
            } else {
                heroTitle.innerHTML += `<span class="highlight">${nameText}</span>`;
            }
        };

        setTimeout(typeText, 600);
    }

    // ==============================
    // WhatsApp Contact Form
    // ==============================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name    = document.getElementById('name').value.trim();
            const email   = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Mohon isi semua field yang diperlukan.');
                return;
            }

            const whatsappNumber = "082288565525";
            const text =
                `*Pesan dari Website Portfolio*%0A%0A` +
                `*Nama:* ${encodeURIComponent(name)}%0A` +
                `*Email:* ${encodeURIComponent(email)}%0A` +
                `*Subject:* ${encodeURIComponent(subject)}%0A%0A` +
                `*Pesan:*%0A${encodeURIComponent(message)}`;

            window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
            contactForm.reset();
        });
    }

    // ==============================
    // Footer Year
    // ==============================
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
        footerCopy.innerHTML = footerCopy.innerHTML.replace('2025', new Date().getFullYear());
    }

});
