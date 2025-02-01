// Wait for the logo page to fade out, then show the main content
window.addEventListener('load', () => {
    const logoPage = document.getElementById('logo-page');
    const mainContent = document.getElementById('main-content');

    // After the logo page fades out, remove the 'hidden' class from the main content
    setTimeout(() => {
        logoPage.style.display = 'none'; // Hide the logo page
        mainContent.classList.remove('hidden'); // Show the main content
    }, 3000); // Adjust the delay to match the fade-out animation duration
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggle.querySelector('i').classList.toggle('fa-sun', isDarkMode);
    themeToggle.querySelector('i').classList.toggle('fa-moon', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
        },
    });
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

// Toggle Chatbot Visibility
chatbotToggle.addEventListener('click', () => {
    chatbot.classList.toggle('visible');
});

// Close Chatbot
chatbotClose.addEventListener('click', () => {
    chatbot.classList.remove('visible');
});

// Send Message Functionality
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatbotInput.value.trim() !== '') {
        const userMessage = chatbotInput.value.trim();
        addMessage(userMessage, 'user');
        chatbotInput.value = ''; // Clear input field

        // Simulate Bot Response
        setTimeout(() => {
            const botMessage = getBotResponse(userMessage);
            addMessage(botMessage, 'bot');
        }, 1000); // Simulate a 1-second delay
    }
});

// Add Message to Chatbot
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', sender);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to the latest message
}

// Simulate Bot Responses
function getBotResponse(userMessage) {
    const responses = [
        "Hello! How can I assist you today?",
        "That's interesting. Tell me more!",
        "I'm here to help. What do you need?",
        "Let me check that for you.",
        "Thanks for reaching out!"
    ];
    return responses[Math.floor(Math.random() * responses.length)]; // Random response
}

// Back-to-Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block'; // Show the button
    } else {
        backToTopButton.style.display = 'none'; // Hide the button
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Testimonials Data
const testimonials = [
    {
        text: "Amazing work! The team delivered beyond our expectations.",
        author: "Client A"
    },
    {
        text: "Highly professional and creative. Highly recommended!",
        author: "Client B"
    },
    {
        text: "The best software agency we've worked with. Great results!",
        author: "Client C"
    },
    {
        text: "Excellent service and timely delivery. Will work with them again!",
        author: "Client D"
    }
];

// Testimonial Slider Functionality
const testimonialContent = document.getElementById('testimonial-content');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
let currentTestimonial = 0;

// Function to Display Testimonials
function showTestimonial(index) {
    testimonialContent.style.transform = `translateX(-${index * 100}%)`;
}

// Render Testimonials
function renderTestimonials() {
    testimonialContent.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-item">
            <p>"${testimonial.text}"</p>
            <span>- ${testimonial.author}</span>
        </div>
    `).join('');
}

// Next Testimonial
testimonialNext.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Previous Testimonial
testimonialPrev.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-Scroll Testimonials
let autoScrollInterval;

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000); // Change testimonial every 5 seconds
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Start Auto-Scroll on Page Load
startAutoScroll();

// Pause Auto-Scroll on Hover
testimonialContent.addEventListener('mouseenter', stopAutoScroll);
testimonialContent.addEventListener('mouseleave', startAutoScroll);

// Render Testimonials on Page Load
renderTestimonials();
showTestimonial(currentTestimonial);