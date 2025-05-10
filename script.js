// Portfolio Website JavaScript

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll to sections smoothly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Animate sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Handle contact form submission with WhatsApp
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate inputs
            if (!name || !email || !subject || !message) {
                alert('Mohon isi semua field yang diperlukan.');
                return;
            }
            
            // Format the message for WhatsApp
            const whatsappNumber = "082288565525"; // Ganti dengan nomor WA Anda (format: 628xxx tanpa tanda +)
            
            // Create the message text
            const whatsappText = 
                `*Pesan dari Website Portfolio*%0A%0A` +
                `*Nama:* ${encodeURIComponent(name)}%0A` +
                `*Email:* ${encodeURIComponent(email)}%0A` +
                `*Subject:* ${encodeURIComponent(subject)}%0A%0A` +
                `*Pesan:*%0A${encodeURIComponent(message)}`;
            
            // Create the WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Add typing effect to hero text
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const nameSpan = heroTitle.querySelector('.highlight');
        const nameText = nameSpan ? nameSpan.textContent : '';
        
        // Create text content without the span for typing effect
        const textBeforeName = originalText.split('<span')[0];
        const textAfterName = originalText.split('</span>')[1] || '';
        
        // Clear the title to start typing
        heroTitle.innerHTML = '';
        
        // Type the first part
        let charIndex = 0;
        const typeText = () => {
            if (charIndex < textBeforeName.length) {
                heroTitle.innerHTML += textBeforeName.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            } else {
                // Add the name with highlight
                heroTitle.innerHTML += `<span class="highlight">${nameText}</span>`;
                
                // Type the rest if any
                if (textAfterName) {
                    let afterIndex = 0;
                    const typeAfter = () => {
                        if (afterIndex < textAfterName.length) {
                            heroTitle.innerHTML += textAfterName.charAt(afterIndex);
                            afterIndex++;
                            setTimeout(typeAfter, 100);
                        }
                    };
                    setTimeout(typeAfter, 500);
                }
            }
        };
        
        setTimeout(typeText, 1000);
    }
    
    // Skill bar animation
    const animateSkillBars = () => {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-in-out';
                bar.style.width = width;
            }, 200);
        });
    };
    
    // Trigger skill bar animation when skills section is in view
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
    
    // Add CSS class for animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            section {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            section.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .project-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.5s ease;
                transition-delay: calc(var(--index) * 0.1s);
            }
            
            .projects-grid.animate .project-card {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
    
    // Set delay for project card animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    // Animate projects grid
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
    
    // Current year for footer copyright
    const yearSpan = document.querySelector('footer .container p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
    }
});