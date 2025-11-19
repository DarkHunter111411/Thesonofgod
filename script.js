// DIGILOWEN - Digital Forge - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initContactForm();
    initMobileMenu();
    initSmoothScroll();
    initParallaxEffect();
    initCounterAnimation();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
}
// Contact Form Handler
function initContactForm() {
    // Utiliser la délégation d'événements pour capturer la soumission du formulaire
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'contactForm') {
            e.preventDefault();
            
            const contactForm = e.target;
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validation basique
            const emailInput = contactForm.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(emailValue)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                emailInput.focus();
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-feather="loader" class="w-5 h-5 animate-spin"></i> Envoi en cours...';
            feather.replace();
            submitBtn.disabled = true;
            
            // Simulate form submission avec une vérification réseau
            simulateFormSubmission()
                .then(() => {
                    // Success message
                    showNotification('Message envoyé avec succès ! Nous vous répondrons dans les 24h.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                })
                .catch(() => {
                    showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
                })
                .finally(() => {
                    // Restore button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    feather.replace();
                });
        }
    });
}

// Simuler une soumission de formulaire avec délai et gestion d'erreur
function simulateFormSubmission() {
    return new Promise((resolve, reject) => {
        // Simuler un appel réseau avec 80% de succès
        setTimeout(() => {
            const success = Math.random() > 0.2;
            if (success) {
                resolve({ success: true });
            } else {
                reject({ error: 'Network error' });
            }
        }, 2000);
    });
}
// Mobile Menu Toggle
function initMobileMenu() {
    // Créer le bouton menu mobile avec une classe identifiable
    const existingBtn = document.querySelector('.mobile-menu-btn');
    if (existingBtn) return; // Ne pas créer de doublon

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn md:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 hover:scale-110';
    mobileMenuBtn.innerHTML = '<i data-feather="menu" class="w-6 h-6"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Menu mobile');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // Ajouter le gestionnaire d'événements
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    document.body.appendChild(mobileMenuBtn);
    feather.replace();
}

function toggleMobileMenu() {
    const nav = document.querySelector('custom-navbar');
    const shadowRoot = nav?.shadowRoot;
    const navLinks = shadowRoot?.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && mobileBtn) {
        const isActive = navLinks.classList.toggle('mobile-active');
        
        // Mettre à jour l'icône et l'état ARIA
        mobileBtn.setAttribute('aria-expanded', isActive);
        if (isActive) {
            mobileBtn.innerHTML = '<i data-feather="x" class="w-6 h-6"></i>';
            // Ajouter un overlay pour fermer en cliquant à l'extérieur
            createOverlay();
        } else {
            mobileBtn.innerHTML = '<i data-feather="menu" class="w-6 h-6"></i>';
            removeOverlay();
        }
        feather.replace();
    }
}

// Créer un overlay pour fermer le menu en cliquant à l'extérieur
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay fixed inset-0 bg-black/50 z-40 md:hidden';
    overlay.addEventListener('click', toggleMobileMenu);
    document.body.appendChild(overlay);
}

function removeOverlay() {
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        overlay.remove();
    }
}
// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    // Gestion des clics sur les liens ancres dans le document principal
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            // Gérer le cas spécial du lien "top"
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                const nav = document.querySelector('custom-navbar');
                if (nav) {
                    const shadowRoot = nav.shadowRoot;
                    const navLinks = shadowRoot?.querySelector('.nav-links');
                    if (navLinks && navLinks.classList.contains('mobile-active')) {
                        navLinks.classList.remove('mobile-active');
                        // Mettre à jour l'icône du bouton mobile
                        const mobileBtn = document.querySelector('.mobile-menu-btn');
                        if (mobileBtn) {
                            mobileBtn.innerHTML = '<i data-feather="menu" class="w-6 h-6"></i>';
                            feather.replace();
                        }
                    }
                }
            }
        }
    });
}
// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('#accueil');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Counter Animation (for stats if added later)
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
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
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}
// Notification System
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes pour éviter les doublons
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification fixed top-6 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 max-w-sm`;
    
    const bgColor = type === 'success' ? 'bg-green-500' : 
                    type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.classList.add(bgColor);
    notification.innerHTML = `
        <div class="flex items-center gap-3 text-white">
            <i data-feather="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}" class="w-5 h-5 flex-shrink-0"></i>
            <span class="text-sm">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    feather.replace();
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide notification
    const hideTimeout = setTimeout(() => {
        hideNotification(notification);
    }, 4000);

    // Permettre de fermer la notification en cliquant dessus
    notification.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}
// Dynamic Year in Footer
function updateFooterYear() {
    const footer = document.querySelector('custom-footer');
    if (!footer) return;
    
    const shadowRoot = footer.shadowRoot;
    const yearSpan = shadowRoot?.querySelector('#currentYear');
    
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Call on load
window.addEventListener('load', updateFooterYear);
// Performance Optimization: Lazy Load Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour les navigateurs ne supportant pas IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        });
    }
}

// Gestionnaire d'événements global pour les boutons avec confirmation
document.addEventListener('click', function(e) {
    const btn = e.target.closest('[data-confirm]');
    if (btn) {
        e.preventDefault();
        const message = btn.getAttribute('data-confirm') || 'Êtes-vous sûr ?';
        if (confirm(message)) {
            // Si c'est un lien, naviguer
            if (btn.tagName === 'A' && btn.href) {
                window.location.href = btn.href;
            }
            // Si c'est un bouton de soumission, soumettre le formulaire
            else if (btn.type === 'submit' && btn.form) {
                btn.form.submit();
            }
        }
    }
});

// Initialiser tous les modules
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollAnimations();
    initContactForm();
    initMobileMenu();
    initSmoothScroll();
    initParallaxEffect();
    initCounterAnimation();
    initLazyLoading();
    
    // Remplacer les icônes feather après le chargement
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
