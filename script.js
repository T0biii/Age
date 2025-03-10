let currentAge = 0;
let targetAge = 1;
let increment = 0.000000001;
let counterId = null;
let birthDate = null;

const inputContainer = document.getElementById('input-container');
const ageTitle = document.getElementById('age-title');
const errorPopup = document.getElementById('error-popup');
const overlay = document.getElementById('overlay');
const errorMessage = document.getElementById('error-message');
const closePopup = document.getElementById('close-popup');
const ageContainer = document.getElementById('age-container');

// Check for user's preferred color scheme
function getPreferredColorScheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Apply initial color scheme based on browser preference
function applyInitialColorScheme() {
    const preferredScheme = getPreferredColorScheme();
    document.body.classList.add(`${preferredScheme}-mode`);
}

// Toggle dark/light mode
function toggleColorScheme() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
}

// Initialize color scheme
applyInitialColorScheme();

// Function to show error popup
function showError(message) {
    errorMessage.textContent = message;
    errorPopup.style.display = 'flex';
    overlay.style.display = 'block';
}

// Function to close popup
function closeErrorPopup() {
    errorPopup.style.display = 'none';
    overlay.style.display = 'none';
}

// Event listener for closing the popup with button
closePopup.addEventListener('click', closeErrorPopup);

// Event listener for closing the popup by clicking outside
overlay.addEventListener('click', closeErrorPopup);

// Event listener for the Calculate button
document.getElementById('calculate-btn').addEventListener('click', function() {
    // Get birth date and time from input fields
    const birthdateValue = document.getElementById('birthdate').value;
    const birthtimeValue = document.getElementById('birthtime').value || '00:00';
    
    if (!birthdateValue) {
        showError('Please enter your birth date.');
        return;
    }
    
    // Combine birth date and time and save as Date object
    const dateTimeStr = `${birthdateValue}T${birthtimeValue}:00`;
    birthDate = new Date(dateTimeStr);
    
    // Hide input field
    inputContainer.classList.add('hidden');
    
    // Calculate current age
    calculateAge();
    
    // Stop counter if already running
    if (counterId) {
        clearTimeout(counterId);
    }
    
    // Start counter
    updateAge();
});

// Event listener for the Age title
ageTitle.addEventListener('click', function() {
    // Toggle input field
    if (inputContainer.classList.contains('hidden')) {
        inputContainer.classList.remove('hidden');
    } else {
        inputContainer.classList.add('hidden');
    }
});

// Event listener for the age display to toggle dark mode
ageContainer.addEventListener('click', toggleColorScheme);

// Function to calculate current age
function calculateAge() {
    if (!birthDate) return 0;
    
    const now = new Date();
    const diffTime = now - birthDate;
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    
    currentAge = diffYears;
    targetAge = Math.floor(diffYears) + 1;
    
    return diffYears;
}

// Function to update age display
function updateAge() {
    if (!birthDate) {
        counterId = setTimeout(updateAge, 10);
        return;
    }
    
    // Recalculate current age
    calculateAge();
    
    // Split into integer and decimal parts
    const integerPart = Math.floor(currentAge);
    const decimalPart = (currentAge - integerPart).toFixed(9).substring(1);
    
    // Update display
    document.getElementById('age-integer').textContent = integerPart;
    document.getElementById('age-decimal').textContent = decimalPart;
    
    // Call function again (every 10ms)
    counterId = setTimeout(updateAge, 10);
}


// Am Anfang der Datei nach den Variablendeklarationen

// Set default date to 10 years ago
function setDefaultDate() {
    const today = new Date();
    
    // Set max date to today
    const birthdateInput = document.getElementById('birthdate');
    birthdateInput.max = today.toISOString().split('T')[0];
    
    // Instead of setting a default value, we'll add a click handler
    // that will set the value just before opening, then clear it after
    birthdateInput.addEventListener('click', function(e) {
        // Only set a temporary value if the field is empty
        if (!this.value) {
            const tenYearsAgo = new Date();
            tenYearsAgo.setFullYear(today.getFullYear() - 10);
            
            // Set temporary value to position the calendar
            this.value = tenYearsAgo.toISOString().split('T')[0];
            
            // Use setTimeout to clear the value after the calendar opens
            setTimeout(() => {
                this.value = '';
            }, 5);
        }
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', setDefaultDate);
