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
