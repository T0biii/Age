# Age Counter

A simple, elegant web application that displays a person's exact age in real-time with high precision (up to 9 decimal places).

## Features

- Clean, minimalist user interface
- Real-time age calculation that updates continuously
- High precision counter with 9 decimal places
- Option to input both birth date and birth time for exact calculations
- Responsive design that works on various screen sizes
- Toggle input form by clicking on the "Age" title
- Custom error popup for validation messages

## How It Works

1. Enter your birth date (required) and birth time (optional) in the input fields
2. Click "Calculate" to start the age counter
3. The counter will show your current age and continuously update in real-time
4. The integer part of your age is displayed in large font, with decimal places shown smaller
5. Click on the "Age" title at any time to show/hide the input form and adjust your birth information

## Technical Details

The application is built using:
- HTML5
- CSS3 for styling
- Vanilla JavaScript (no external libraries or frameworks)

The age calculation uses the following formula:

```js
const diffTime = now - birthDate;
const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
```


This accounts for leap years by using 365.25 days per year in the calculation.

## Project Structure

The project consists of three main files:
- `index.html` - The main HTML structure
- `styles.css` - All styling and visual aspects
- `script.js` - The JavaScript functionality

## Installation

No installation required! This is a simple web application that can be opened in any modern web browser. URL: https://t0biii.github.io/Age/

### To use locally:

1. Download all three files (`index.html`, `styles.css`, and `script.js`)
2. Make sure they are in the same directory
3. Open `index.html` in your preferred web browser
4. Enter your birth information and enjoy watching your age tick up in real-time

## Customization

You can easily customize the appearance by modifying the CSS styles in the `styles.css` file:

- Change colors by updating the color hex codes
- Adjust font sizes by modifying the `font-size` properties
- Change the layout by editing the flexbox properties

## Browser Compatibility

This application works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and free to use for personal or commercial purposes.

## Author

Created with ❤️ by AI assistance
