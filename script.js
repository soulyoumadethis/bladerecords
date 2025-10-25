/**
 * BLADE RECORDS JAVASCRIPT: High-Level Interaction & UX
 */

// === DATA STRUCTURE ===
const peopleData = {
    // Note: The 'role' field is now used explicitly in the modal
    'soulyoumadethis': { name: "SOULYOUMADETHIS", role: "ARTIST / FOUNDER", description: "Visionary vocalist and producer, recognized for his core contributions to Project YVL and establishing the uncompromising aesthetic of Blade Records." },
    'disciple': { name: "DISCIPLE", role: "ARTIST / CO-OWNER", description: "Master of sonic architecture, DISCIPLE is a distinguished vocalist and producer known for exceptional remastering work." },
    'vetements': { name: "VETEMENTS", role: "ARTIST", description: "The enigmatic force pushing the boundaries of experimental trap music. Their sound is raw, uncompromising, and future-facing." },
    'producer1': { name: "R3DD", role: "PRODUCER", description: "R3DD specializes in high-quality track producing, bringing a polished, unique sound to every project." },
    'producer3': { name: "JATEM", role: "PRODUCTION", description: "A versatile producer highly regarded for crafting intricate, Cardo-style beats and demonstrating wide genre mastery." }
};

// === DOM ELEMENTS ===
const DOM = {
    modal: document.getElementById('person-modal'),
    modalTitle: document.getElementById('modalTitle'),
    modalRole: document.getElementById('modalRole'),
    modalDescription: document.getElementById('modalDescription'),
    closeModalBtn: document.getElementById('close-modal'),
    // Group all clickable elements that trigger the modal
    modalTriggers: document.querySelectorAll('.grid-item, .artist-tag-btn, .producer-tag-btn'),
    navLinks: document.querySelectorAll('.nav-link'),
    menuToggle: document.querySelector('.menu-toggle'),
    navList: document.getElementById('primary-menu')
};

// === INITIALIZATION & EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', setupEventListeners);

function setupEventListeners() {
    // 1. Modal Triggers
    DOM.modalTriggers.forEach(element => {
        element.addEventListener('click', handlePersonClick);
    });

    // 2. Navigation
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // 3. Mobile Menu Toggle
    DOM.menuToggle.addEventListener('click', toggleMobileMenu);

    // 4. Modal Events
    DOM.closeModalBtn.addEventListener('click', closeModal);
    DOM.modal.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeydown);
}

// === HANDLERS ===

function handlePersonClick(event) {
    const key = event.currentTarget.getAttribute('data-person-key');
    const person = peopleData[key];

    if (person) {
        showModal(person);
    } else {
        console.error(`Data not found for key: ${key}`);
    }
}

function handleSmoothScroll(event) {
    event.preventDefault();
    
    // Close menu before scrolling on mobile
    if(DOM.navList.classList.contains('is-open')) {
        toggleMobileMenu();
    }

    const targetId = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        // Adjust for fixed header (height is roughly 80px)
        const offsetTop = targetSection.offsetTop - 80;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function toggleMobileMenu() {
    DOM.navList.classList.toggle('is-open');
    // Optional: Add/remove class to the button for the hamburger animation
    DOM.menuToggle.classList.toggle('is-active');
    document.body.classList.toggle('no-scroll');
}

function handleKeydown(event) {
    if (event.key === 'Escape' && DOM.modal.classList.contains('is-visible')) {
        closeModal();
    }
}

function handleOutsideClick(event) {
    if (event.target === DOM.modal) {
        closeModal();
    }
}

// === MODAL LOGIC ===

function showModal(person) {
    DOM.modalTitle.textContent = person.name;
    DOM.modalRole.textContent = person.role;
    DOM.modalDescription.textContent = person.description;
    
    DOM.modal.classList.add('is-visible');
    DOM.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll'); // Prevent background scrolling
}

function closeModal() {
    DOM.modal.classList.remove('is-visible');
    DOM.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll'); // Restore background scrolling
}

// Add CSS for no-scroll on body (for the modal and mobile menu)
// This should be in style.css but is added here for completeness:
/* .no-scroll {
    overflow: hidden !important;
} 
*/