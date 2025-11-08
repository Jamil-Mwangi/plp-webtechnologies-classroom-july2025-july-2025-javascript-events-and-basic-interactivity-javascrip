// ============================================
// 🎉 PART 1: JAVASCRIPT EVENT HANDLING
// ============================================

// 1.1 Click Event Handling
const clickBtn = document.getElementById('clickBtn');
const clickMessage = document.getElementById('clickMessage');

clickBtn.addEventListener('click', function() {
    const messages = [
        "Hello! You clicked me!",
        "Great job! 👍",
        "Keep clicking! 🎯",
        "You're a clicking pro! 💪",
        "One more time! 🔥"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    clickMessage.textContent = randomMessage;
    clickMessage.style.color = '#007acc';
    
    // Add visual feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// 1.2 Mouse Events (Hover)
const hoverArea = document.getElementById('hoverArea');
const hoverMessage = document.getElementById('hoverMessage');

hoverArea.addEventListener('mouseenter', function() {
    hoverMessage.textContent = "Mouse entered! 🖱️";
    hoverMessage.style.color = '#28a745';
});

hoverArea.addEventListener('mouseleave', function() {
    hoverMessage.textContent = "Mouse left! 👋";
    hoverMessage.style.color = '#dc3545';
});

// 1.3 Keyboard Events
const keyboardInput = document.getElementById('keyboardInput');
const keyboardMessage = document.getElementById('keyboardMessage');

keyboardInput.addEventListener('keydown', function(event) {
    keyboardMessage.textContent = `Key pressed: ${event.key} (Key code: ${event.keyCode})`;
    keyboardMessage.style.color = '#ffc107';
});

keyboardInput.addEventListener('keyup', function() {
    setTimeout(() => {
        keyboardMessage.textContent = `You typed: ${this.value}`;
        keyboardMessage.style.color = '#007acc';
    }, 100);
});

// ============================================
// 🎮 PART 2: INTERACTIVE ELEMENTS
// ============================================

// 2.1 Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = false;

themeToggle.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-theme');
    
    if (isDarkMode) {
        this.textContent = '☀️ Switch to Light Mode';
        this.style.background = '#495057';
    } else {
        this.textContent = '🌙 Switch to Dark Mode';
        this.style.background = '#007acc';
    }
    
    console.log(`Theme changed to: ${isDarkMode ? 'Dark' : 'Light'} mode`);
});

// 2.2 Counter Game
const decrementBtn = document.getElementById('decrementBtn');
const incrementBtn = document.getElementById('incrementBtn');
const resetCounter = document.getElementById('resetCounter');
const counterValue = document.getElementById('counterValue');

let count = 0;

function updateCounter() {
    counterValue.textContent = count;
    
    // Visual feedback based on count
    if (count > 0) {
        counterValue.style.color = '#28a745';
    } else if (count < 0) {
        counterValue.style.color = '#dc3545';
    } else {
        counterValue.style.color = '#007acc';
    }
    
    // Size animation
    counterValue.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterValue.style.transform = 'scale(1)';
    }, 150);
}

decrementBtn.addEventListener('click', function() {
    count--;
    updateCounter();
});

incrementBtn.addEventListener('click', function() {
    count++;
    updateCounter();
});

resetCounter.addEventListener('click', function() {
    count = 0;
    updateCounter();
    
    // Visual feedback for reset
    this.style.background = '#28a745';
    setTimeout(() => {
        this.style.background = '#6c757d';
    }, 500);
});

// 2.3 FAQ Section
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        // Close all other FAQ answers
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelectorAll('.faq-question').forEach(item => {
            item.textContent = item.textContent.replace('▼', '▶');
        });
        
        // Toggle current answer
        if (!isActive) {
            answer.classList.add('active');
            this.textContent = this.textContent.replace('▶', '▼');
        }
    });
});

// ============================================
// 📋✅ PART 3: FORM VALIDATION
// ============================================

const validationForm = document.getElementById('validationForm');
const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName(name) {
    const nameRegex = /^[A-Za-z\s]{2,50}$/;
    if (!name.trim()) {
        return 'Name is required';
    } else if (!nameRegex.test(name)) {
        return 'Name should be 2-50 characters, letters and spaces only';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        return 'Email is required';
    } else if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePassword(password) {
    if (!password) {
        return 'Password is required';
    } else if (password.length < 8) {
        return 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        return 'Password must contain uppercase, lowercase, and numbers';
    }
    return '';
}

function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) {
        return 'Please confirm your password';
    } else if (password !== confirmPassword) {
        return 'Passwords do not match';
    }
    return '';
}

// Real-time validation
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

nameInput.addEventListener('blur', function() {
    const error = validateName(this.value);
    document.getElementById('nameError').textContent = error;
});

emailInput.addEventListener('blur', function() {
    const error = validateEmail(this.value);
    document.getElementById('emailError').textContent = error;
});

passwordInput.addEventListener('blur', function() {
    const error = validatePassword(this.value);
    document.getElementById('passwordError').textContent = error;
});

confirmPasswordInput.addEventListener('blur', function() {
    const error = validateConfirmPassword(passwordInput.value, this.value);
    document.getElementById('confirmPasswordError').textContent = error;
});

// Form submission
validationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate all fields
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const passwordError = validatePassword(passwordInput.value);
    const confirmError = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    
    // Display errors
    document.getElementById('nameError').textContent = nameError;
    document.getElementById('emailError').textContent = emailError;
    document.getElementById('passwordError').textContent = passwordError;
    document.getElementById('confirmPasswordError').textContent = confirmError;
    
    // Check if form is valid
    const isValid = !nameError && !emailError && !passwordError && !confirmError;
    
    if (isValid) {
        // Show success message
        formSuccess.style.display = 'block';
        validationForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
        
        console.log('Form submitted successfully!');
        console.table({
            name: nameInput.value,
            email: emailInput.value,
            password: '***' // Don't log actual password
        });
    } else {
        console.log('Form validation failed');
    }
});

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Interactive Web Pages loaded successfully!');
    console.log('Try out all the interactive features:');
    console.log('- Click events with random messages');
    console.log('- Mouse hover effects');
    console.log('- Keyboard input tracking');
    console.log('- Dark/light mode toggle');
    console.log('- Counter game');
    console.log('- Collapsible FAQ');
    console.log('- Form validation with real-time feedback');
});

// Bonus: Add keyboard shortcut to reset counter
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        count = 0;
        updateCounter();
        console.log('Counter reset via keyboard shortcut');
    }
});