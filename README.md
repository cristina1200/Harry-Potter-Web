"# Harry Potter - Wizard Registration & Duels

A simple, interactive web application for wizard registration with Harry Potter book collection and spell dueling features.

## Features

### 1. Wizard Registration Form
- **Name validation**: Minimum 3 characters
- **Email validation**: Proper email format required
- **Password validation**: Minimum 8 characters with at least one digit
- **House selection**: Choose from the four Hogwarts houses (loaded dynamically from API)
- **Real-time validation**: Fields turn orange on blur if invalid, with error messages displayed
- **Form disable**: After successful registration, the form becomes disabled (grayed out and unclickable)

### 2. Login Verification
- After registration, users must re-enter their password to verify identity
- Password is stored in memory (client-side only)
- Incorrect password shows an error message
- Successful login reveals the Books and Duels sections

### 3. Harry Potter Book Collection
- Displays all Harry Potter books in a responsive grid layout
- Each book card shows:
  - Cover image
  - Title
  - Release date
  - Description
- Books are fetched from the Potter API

### 4. Spell Duels
- **Start Duel**: Initiates a duel between you and an opponent
- **Random spells**: Each round displays two different random spells
- **Next Round**: Generate new spell matchups
- **End Duel**: Returns to the start state
- Spells are fetched once from the API and reused for performance

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with Flexbox and CSS Grid for responsive layouts
- **Vanilla JavaScript**: No frameworks, pure DOM manipulation
- **Fetch API**: Asynchronous data loading from Potter API
- **Potter API**: [https://potterapi-fedeperin.vercel.app](https://potterapi-fedeperin.vercel.app)

## Project Structure

```
├── home.html       # Main HTML structure
├── styles.css      # All styling and layout
├── script.js       # Application logic and API calls
├── wallpaper.jpg   # Background image
└── README.md       # This file
```

## How to Use

1. **Open `home.html`** in a modern web browser
2. **Fill out the registration form**:
   - Enter a wizard name (min 3 chars)
   - Provide a valid email
   - Create a password (min 8 chars, 1 number)
   - Select a Hogwarts house
3. **Click Register** - The form will be validated and disabled if all fields are correct
4. **Enter your password again** in the login section to verify
5. **Explore**:
   - Browse the Harry Potter book collection
   - Start a spell duel and see random magical spells face off

## API Endpoints Used

- `/en/houses` - Fetches Hogwarts houses with emojis
- `/en/books` - Fetches Harry Potter book information
- `/en/spells` - Fetches magical spells for duels

## Key Features Implemented

### Form Validation
- Blur event listeners on all inputs trigger validation
- Visual feedback: orange background for invalid fields
- Per-field error messages shown/hidden dynamically
- Submit prevented until all fields are valid

### State Management
- Password stored in memory (`storedPassword` variable)
- Duels initialized only once (`window._duelsInitialized` flag)
- Spells cached after first load for better performance

### Responsive Design
- CSS Grid auto-fit for book cards (adapts to screen size)
- Flexbox for form layout and duel area
- Mobile-friendly with min/max widths

### User Experience
- Sections hidden by default and revealed after login
- Smooth transitions between registration → login → main content
- Disabled form state prevents accidental edits
- Clean, Harry Potter-themed color scheme (purple #4a0072)

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript (arrow functions, async/await, destructuring)
- Fetch API
- CSS Grid and Flexbox

## Notes

- Password is stored **client-side only** in memory - not secure for production
- No persistent storage (refresh resets everything)
- Single-page application - no page navigation or history
- Background image (`wallpaper.jpg`) must be in the same directory

## Future Enhancements

- Implement duel winner logic (currently just displays spells)
- Add localStorage for persistent login
- Implement proper authentication
- Add animations and transitions
- Mobile menu for smaller screens

---

**Developed as a university project for PIU course**
" 
