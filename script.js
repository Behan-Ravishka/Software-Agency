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

// Progress Bar
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalHeight) * 100;

    // Update the width of the progress bar
    progressBar.style.width = `${progress}%`;
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
        // At the top of the page, always show the navbar
        navbar.classList.remove('hide');
        navbar.classList.add('show');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('hide')) {
        // Scrolling down: hide the navbar
        navbar.classList.remove('show');
        navbar.classList.add('hide');
    } else if (currentScroll < lastScroll && navbar.classList.contains('hide')) {
        // Scrolling up: show the navbar
        navbar.classList.remove('hide');
        navbar.classList.add('show');
    }

    lastScroll = currentScroll;
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

// Notification Center
const notificationToggle = document.getElementById('notification-toggle');
const notificationDropdown = document.getElementById('notification-dropdown');
const notificationList = document.getElementById('notification-list');
const markAllReadButton = document.getElementById('mark-all-read');
const clearAllButton = document.getElementById('clear-all');
const viewArchiveButton = document.getElementById('view-archive');
const notificationCount = document.getElementById('notification-count');

let notifications = [
    { id: 1, content: "🎉 New Offer: Get 20% off on all services!", read: false, archived: false },
    { id: 2, content: "🚀 Tech News: AI is revolutionizing the industry.", read: false, archived: false },
    { id: 3, content: "📢 Discount: Limited-time discount on web development.", read: false, archived: false }
];

// Render Notifications
function renderNotifications() {
    notificationList.innerHTML = notifications
        .filter(notification => !notification.archived)
        .map(notification => `
            <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
                <p class="notification-content">${notification.content}</p>
                <div class="notification-actions">
                    <button class="read-more">Read More</button>
                    <button class="delete-notification">Delete</button>
                </div>
                <div class="swipe-area">
                    <span>Mark as Read</span>
                    <span>Delete</span>
                </div>
            </div>
        `).join('');

    // Update Notification Count
    const unreadCount = notifications.filter(n => !n.read && !n.archived).length;
    notificationCount.textContent = unreadCount;
}

// Toggle Notification Dropdown
notificationToggle.addEventListener('click', () => {
    notificationDropdown.classList.toggle('visible');
});

// Mark All as Read
markAllReadButton.addEventListener('click', () => {
    notifications.forEach(notification => notification.read = true);
    renderNotifications();
});

// Clear All Notifications
clearAllButton.addEventListener('click', () => {
    notifications = [];
    renderNotifications();
});

// View Archive
viewArchiveButton.addEventListener('click', () => {
    alert("Archived Notifications: " + notifications.filter(n => n.archived).map(n => n.content).join("\n"));
});

// Handle Notification Actions
notificationList.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-more')) {
        const notificationItem = e.target.closest('.notification-item');
        const notificationId = parseInt(notificationItem.dataset.id);
        const notification = notifications.find(n => n.id === notificationId);
        alert(`Read More: ${notification.content}`);
    }

    if (e.target.classList.contains('delete-notification')) {
        const notificationItem = e.target.closest('.notification-item');
        const notificationId = parseInt(notificationItem.dataset.id);
        notifications = notifications.filter(n => n.id !== notificationId);
        renderNotifications();
    }
});

// Swipe Effects
let touchStartX = 0;
let touchEndX = 0;

notificationList.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

notificationList.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe(e);
});

function handleSwipe(e) {
    const notificationItem = e.target.closest('.notification-item');
    if (!notificationItem) return;

    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance < -50) {
        // Swipe Left: Delete
        notificationItem.classList.add('swipe-left');
        setTimeout(() => {
            const notificationId = parseInt(notificationItem.dataset.id);
            notifications = notifications.filter(n => n.id !== notificationId);
            renderNotifications();
        }, 300);
    } else if (swipeDistance > 50) {
        // Swipe Right: Mark as Read or Archive
        notificationItem.classList.add('swipe-right');
        setTimeout(() => {
            const notificationId = parseInt(notificationItem.dataset.id);
            const notification = notifications.find(n => n.id === notificationId);
            notification.read = true;
            notification.archived = true;
            renderNotifications();
        }, 300);
    }
}

// Initial Render
renderNotifications();

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
        backToTopButton.classList.add('visible'); // Show the button
    } else {
        backToTopButton.classList.remove('visible'); // Hide the button
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