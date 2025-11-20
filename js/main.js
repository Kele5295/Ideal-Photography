// main.js - JavaScript functionality for Ideal Photography

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initFormValidation();
    initGalleryFilter();
    initImageLoading();
    initSmoothScrolling();
    initMobileMenu();
});

// Form Validation Functions
function initFormValidation() {
    const enquiryForm = document.getElementById('enquiryForm');
    const contactForm = document.getElementById('contactForm');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', validateEnquiryForm);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
}

function validateEnquiryForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const serviceType = form.serviceType.value;
    
    let isValid = true;
    let errorMessage = '';

    // Clear previous error styles
    clearErrors(form);

    // Name validation
    if (name === '') {
        showError(form.fullName, 'Please enter your full name');
        isValid = false;
    }

    // Email validation
    if (email === '') {
        showError(form.email, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(form.email, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    if (phone === '') {
        showError(form.phone, 'Please enter your phone number');
        isValid = false;
    } else if (!isValidPhone(phone)) {
        showError(form.phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Service type validation
    if (serviceType === '') {
        showError(form.serviceType, 'Please select a service type');
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        showSuccessMessage('enquirySuccess');
        simulateFormSubmission(form, 'enquiry');
    }
    
    return false;
}

function validateContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.contactName.value.trim();
    const email = form.contactEmail.value.trim();
    const messageType = form.messageType.value;
    const message = form.contactMessage.value.trim();
    
    let isValid = true;

    // Clear previous error styles
    clearErrors(form);

    // Name validation
    if (name === '') {
        showError(form.contactName, 'Please enter your full name');
        isValid = false;
    }

    // Email validation
    if (email === '') {
        showError(form.contactEmail, 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(form.contactEmail, 'Please enter a valid email address');
        isValid = false;
    }

    // Message type validation
    if (messageType === '') {
        showError(form.messageType, 'Please select a message type');
        isValid = false;
    }

    // Message validation
    if (message === '') {
        showError(form.contactMessage, 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError(form.contactMessage, 'Message must be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        showSuccessMessage('contactSuccess');
        simulateFormSubmission(form, 'contact');
    }
    
    return false;
}

function showError(field, message) {
    field.style.borderColor = '#e74c3c';
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '0.25rem';
}

function clearErrors(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
        
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showSuccessMessage(type) {
    let message = '';
    if (type === 'enquirySuccess') {
        message = 'Thank you for your enquiry! We will get back to you within 24 hours with detailed information.';
    } else if (type === 'contactSuccess') {
        message = 'Thank you for your message! We will get back to you soon.';
    }
    
    alert(message); // In a real application, you'd show this in the page
}

function simulateFormSubmission(form, type) {
    // Simulate API call or form processing
    setTimeout(() => {
        form.reset();
        // In a real application, you would submit to a server here
        console.log(`${type} form submitted successfully`);
    }, 1000);
}

// Gallery Filter Enhancement
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        // Add fade-in animation
                        item.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Image Loading with Error Handling
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Handle broken images
        img.addEventListener('error', function() {
            this.alt = 'Image not available';
            this.style.backgroundColor = '#f8f9fa';
            this.style.padding = '2rem';
            this.style.textAlign = 'center';
        });
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Toggle (Enhanced)
function initMobileMenu() {
    // Create mobile menu button for smaller screens
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '☰';
        menuButton.style.background = 'none';
        menuButton.style.border = 'none';
        menuButton.style.fontSize = '1.5rem';
        menuButton.style.cursor = 'pointer';
        menuButton.style.color = 'var(--text-color)';
        
        header.querySelector('.container').appendChild(menuButton);
        
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
        });
    }
}

// Additional Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access (if needed)
window.formValidation = {
    validateEnquiryForm,
    validateContactForm,
    isValidEmail,
    isValidPhone
};