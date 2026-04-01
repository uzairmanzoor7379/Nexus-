
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});


function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);


const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-filter');

      
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});


const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        document.querySelectorAll('.error').forEach(el => el.remove());

        let isValid = true;

       
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        }

      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        }

       
        if (subject === '') {
            showError('subject', 'Subject is required');
            isValid = false;
        }

        
        if (message === '') {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            
            const successMsg = document.createElement('div');
            successMsg.className = 'success';
            successMsg.textContent = '✓ Message sent successfully! We will get back to you soon.';
            contactForm.insertBefore(successMsg, contactForm.firstChild);

           
            contactForm.reset();

           
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorEl = document.createElement('div');
        errorEl.className = 'error';
        errorEl.textContent = message;
        field.parentNode.insertBefore(errorEl, field.nextSibling);
    }
}


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


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});


const galleryImages = document.querySelectorAll('.gallery-image');
const mainImage = document.getElementById('mainImage');

if (galleryImages.length > 0 && mainImage) {
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            const src = image.getAttribute('data-src');
            mainImage.textContent = image.textContent;
            
           
            galleryImages.forEach(img => img.classList.remove('active'));
            image.classList.add('active');
        });
    });
}

console.log('Nexus website loaded successfully!');
