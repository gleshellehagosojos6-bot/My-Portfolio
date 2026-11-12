// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Profile picture: click to switch between photo and avatar
const img = document.getElementById('profile-img');
let showingAvatar = false;

// Preload the avatar so the swap doesn't flicker
new Image().src = img.dataset.avatar;

function toggleAvatar() {
    img.style.transform = 'rotateY(90deg)';      // turn edge-on

    setTimeout(() => {
        showingAvatar = !showingAvatar;
        img.src = showingAvatar ? img.dataset.avatar : img.dataset.photo;
        img.style.transform = '';                // turn back
    }, 300);
}

img.addEventListener('click', toggleAvatar);
img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAvatar();
    }
});
// SulitSpot screenshot viewer
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    lightboxImg.src = '';
}

document.querySelectorAll('[data-shot]').forEach(btn => {
    btn.addEventListener('click', () => {
        lightboxImg.src = btn.dataset.shot;
        lightboxImg.alt = btn.dataset.alt;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
    });
});

lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});