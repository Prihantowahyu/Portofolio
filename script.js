// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.style.setProperty('background', 'rgba(13, 17, 23, 0.95)');
    } else {
        navbar?.style.setProperty('background', 'rgba(13, 17, 23, 0.85)');
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation for stats
            if (entry.target.id === 'about') {
                document.querySelectorAll('.stat-num').forEach(stat => {
                    const target = parseInt(stat.dataset.target || 0);
                    if (target && !stat.classList.contains('counted')) {
                        stat.classList.add('counted');
                        animateCounter(stat, target);
                    }
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Typing effect for footer
const typingTexts = ['console.log("Hello World!")', 'git push origin main', 'npm run dev', '// Happy coding!'];
let textIndex = 0;
let charIndex = 0;
const footerTyping = document.querySelector('.footer-typing');

function typeWriter() {
    if (!footerTyping) return;
    
    if (charIndex < typingTexts[textIndex].length) {
        footerTyping.textContent += typingTexts[textIndex][charIndex];
        charIndex++;
        setTimeout(typeWriter, 80);
    } else {
        setTimeout(() => {
            footerTyping.textContent = '';
            charIndex = 0;
            textIndex = (textIndex + 1) % typingTexts.length;
            setTimeout(typeWriter, 1000);
        }, 2000);
    }
}

setTimeout(typeWriter, 3000);
