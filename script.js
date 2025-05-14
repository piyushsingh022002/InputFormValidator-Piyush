document.addEventListener('DOMContentLoaded', () => {
    // Get all form elements
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submit-btn');
    const togglePassword = document.getElementById('toggle-password');

    // Input validation states
    const validationState = {
        name: false,
        email: false,
        password: false,
        phone: false
    };

    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{3,30}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
        phone: /^[0-9]{10}$/
    };

    // Error messages
    const errorMessages = {
        name: 'Name should be 3-30 characters and contain only letters',
        email: 'Please enter a valid email address',
        password: 'Password must be at least 8 characters with at least one number and one special character',
        phone: 'Phone number must be 10 digits'
    };

    // Add input event listeners for real-time validation
    nameInput.addEventListener('input', () => validateField(nameInput, 'name'));
    emailInput.addEventListener('input', () => validateField(emailInput, 'email'));
    passwordInput.addEventListener('input', () => validateField(passwordInput, 'password'));
    phoneInput.addEventListener('input', () => validateField(phoneInput, 'phone'));

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Final validation check
        validateField(nameInput, 'name');
        validateField(emailInput, 'email');
        validateField(passwordInput, 'password');
        validateField(phoneInput, 'phone');
        
        // If all fields are valid, submit the form
        if (Object.values(validationState).every(state => state === true)) {
            // Show success message or submit form
            showFormSuccess();
        }
    });

    // Validate individual field
    function validateField(input, fieldName) {
        const value = input.value.trim();
        const errorElement = input.parentElement.nextElementSibling;
        
        if (value === '') {
            setInvalid(input, errorElement, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
            validationState[fieldName] = false;
        } else if (!patterns[fieldName].test(value)) {
            setInvalid(input, errorElement, errorMessages[fieldName]);
            validationState[fieldName] = false;
        } else {
            setValid(input, errorElement);
            validationState[fieldName] = true;
        }
        
        // Update submit button state
        updateSubmitButtonState();
    }

    // Set invalid state
    function setInvalid(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
        errorElement.style.opacity = 1;
    }

    // Set valid state
    function setValid(input, errorElement) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
        errorElement.style.opacity = 0;
    }

    // Update submit button state
    function updateSubmitButtonState() {
        if (Object.values(validationState).every(state => state === true)) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Show form success
    function showFormSuccess() {
        form.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 20px;">
                <i class="fas fa-check-circle" style="font-size: 50px; color: var(--success-color); margin-bottom: 20px;"></i>
                <h2>Registration Successful!</h2>
                <p>Thank you for signing up.</p>
            </div>
        `;
    }

    // Format phone number as user types (optional enhancement)
    phoneInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        e.target.value = value;
    });

    // Add placeholder attribute to prevent label overlap issues
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
    });
});
