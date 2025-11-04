const baseURL = "https://potterapi-fedeperin.vercel.app";

let nameInput;
let emailInput;
let passwordInput;
let houseInput;
let storedPassword = '';

window.onload = () => {

    nameInput = document.getElementById('wizardName');
    if (nameInput) nameInput.addEventListener('blur', isNameValid);

    emailInput = document.getElementById('email');
    if (emailInput) emailInput.addEventListener('blur', isEmailValid);

    passwordInput = document.getElementById('password');
    if (passwordInput) passwordInput.addEventListener('blur', isPasswordValid);

    houseInput = document.getElementById('house');
    if (houseInput) houseInput.addEventListener('blur', isHouseValid);


    loadHousesFromAPI();


    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            onSubmit();
        });
    }


    const loginBtn = document.getElementById('loginButton');
    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            const loginPasswordEl = document.getElementById('loginPassword');
            const loginError = document.getElementById('loginError');
            let loginPassword = '';
            if (loginPasswordEl) {
                loginPassword = loginPasswordEl.value;
            }

            if (loginPassword === storedPassword) {

                const formContainer = document.querySelector('.form-container');
                if (formContainer) formContainer.style.display = 'none';

                // welcome msg
                const nameInputEl = document.getElementById('wizardName');
                let userName = 'Wizard';
                if (nameInputEl && nameInputEl.value) {
                    userName = nameInputEl.value;
                }


                const welcomeHeader = document.getElementById('welcomeHeader');
                if (welcomeHeader) {
                    welcomeHeader.textContent = `Welcome ${userName}!`;
                    welcomeHeader.style.display = 'block';
                }

                const booksSection = document.getElementById('booksSection');
                if (booksSection) booksSection.style.display = 'block';
                loadBooks();

                const duelsSection = document.getElementById('duelsSection');
                if (duelsSection) duelsSection.style.display = 'block';
                initDuels();
            }
            else {
                if (loginError) loginError.style.display = 'block';
            }
        });
    }
};



function initDuels() {
    if (window._duelsInitialized) return;
    window._duelsInitialized = true;

    const startBtn = document.getElementById('startDuelBtn');
    const nextBtn = document.getElementById('nextRoundBtn');
    const endBtn = document.getElementById('endDuelBtn');
    let spellsList = [];

    async function ensureSpellsLoaded() {
        if (spellsList.length > 0) return;

        const endpoints = [`${baseURL}/en/spells`];
        for (const url of endpoints) {
            try {
                const resp = await fetch(url);
                if (!resp.ok) continue;
                const data = await resp.json();
                if (Array.isArray(data)) {
                    spellsList = data;
                    return;
                }
            } catch (e) { }
        }
    }

    if (startBtn)
        startBtn.addEventListener('click', async () => {

            document.getElementById('duelArea').style.display = 'flex';
            startBtn.style.display = 'none';
            nextBtn.style.display = 'inline-block';
            endBtn.style.display = 'inline-block';
            await ensureSpellsLoaded();
            await runRound();
        });

    if (nextBtn) nextBtn.addEventListener('click', async () => {
        await runRound();
    });

    if (endBtn) endBtn.addEventListener('click', () => {
        document.getElementById('duelArea').style.display = 'none';
        startBtn.style.display = 'inline-block';
        nextBtn.style.display = 'none';
        endBtn.style.display = 'none';

    });

    function getTwoRandomSpells() {
        if (!spellsList.length) return [null, null];
        let idx1 = Math.floor(Math.random() * spellsList.length);
        let idx2;
        do {
            idx2 = Math.floor(Math.random() * spellsList.length);
        } while (idx2 === idx1 && spellsList.length > 1);
        return [spellsList[idx1], spellsList[idx2]];
    }

    async function runRound() {
        if (!spellsList.length) await ensureSpellsLoaded();
        const [playerSpell, opponentSpell] = getTwoRandomSpells();
        renderSpell(playerSpell, 'playerSpell');
        renderSpell(opponentSpell, 'opponentSpell');

    }

    function renderSpell(spell, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        if (!spell) {
            container.textContent = 'No spell data';
            return;
        }
        const name = spell.spell || 'Unknown Spell';
        const desc = spell.use || 'No description available.';

        container.innerHTML = '';

        const nameEl = document.createElement('div');
        nameEl.className = 'spell-name';
        nameEl.textContent = name;

        const descEl = document.createElement('div');
        descEl.className = 'spell-desc';
        descEl.textContent = desc;

        container.appendChild(nameEl);
        container.appendChild(descEl);
    }

}

function isNameValid() {
    const name = nameInput.value.trim();
    const isValid = name.length >= 3;

    if (nameInput) {
        if (isValid) {
            nameInput.style.backgroundColor = '';
        } else {
            nameInput.style.backgroundColor = 'orange';
        }
    }

    const nameErr = document.getElementById('nameError');
    if (nameErr) {
        if (isValid) {
            nameErr.style.display = 'none';
        } else {
            nameErr.style.display = 'block';
        }
    }

    return isValid;
}

function isEmailValid() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (emailInput) {
        if (isValid) {
            emailInput.style.backgroundColor = '';
        } else {
            emailInput.style.backgroundColor = 'orange';
        }
    }

    const emailErr = document.getElementById('emailError');
    if (emailErr) {
        if (isValid) {
            emailErr.style.display = 'none';
        } else {
            emailErr.style.display = 'block';
        }
    }

    return isValid;
}

function isPasswordValid() {
    const password = passwordInput.value;
    const hasMinLength = password.length >= 8;
    const hasDigit = /\d/.test(password);
    const isValid = hasMinLength && hasDigit;

    if (passwordInput) {
        if (isValid) {
            passwordInput.style.backgroundColor = '';
        } else {
            passwordInput.style.backgroundColor = 'orange';
        }
    }

    const passErr = document.getElementById('passwordError');
    if (passErr) {
        if (isValid) {
            passErr.style.display = 'none';
        } else {
            passErr.style.display = 'block';
        }
    }

    return isValid;
}

function isHouseValid() {
    const isValid = houseInput && houseInput.value;

    if (houseInput) {
        if (isValid) {
            houseInput.style.backgroundColor = '';
        } else {
            houseInput.style.backgroundColor = 'orange';
        }
    }

    const houseErr = document.getElementById('houseError');
    if (houseErr) {
        if (isValid) {
            houseErr.style.display = 'none';
        } else {
            houseErr.style.display = 'block';
        }
    }

    return Boolean(isValid);
}


const inputValidators = {
    'wizardName': isNameValid,
    'email': isEmailValid,
    'password': isPasswordValid,
    'house': isHouseValid
};

function onSubmit() {
    const invalidIds = [];

    for (const id in inputValidators) {
        if (Object.prototype.hasOwnProperty.call(inputValidators, id)) {
            const valid = inputValidators[id]();
            if (!valid) invalidIds.push(id);
        }
    }
    // success
    if (invalidIds.length === 0) {

        storedPassword = '';
        if (passwordInput) {
            storedPassword = passwordInput.value;
        }

        const form = document.getElementById('registrationForm');
        if (form) {
            const elements = form.elements;
            for (let i = 0; i < elements.length; i++) {
                elements[i].disabled = true;
            }
            form.classList.add('disabled');
        }

        const loginSection = document.getElementById('loginSection');
        if (loginSection) loginSection.style.display = 'block';
    }
}


function loadHousesFromAPI() {
    const select = document.getElementById('house');

    fetch(`${baseURL}/en/houses`)
        .then(resp => {
            if (!resp.ok) throw new Error('Network response was not ok');
            return resp.json();
        })
        .then(houses => {
            if (Array.isArray(houses)) {
                houses.forEach(houseObj => {
                    const option = document.createElement('option');

                    option.value = houseObj.house;
                    option.textContent = `${houseObj.emoji}${houseObj.house}`;
                    select.appendChild(option);
                });
            } else {
                console.error('Unexpected houses format', houses);
            }
        })

}


function loadBooks() {
    const grid = document.getElementById('booksGrid');
    if (!grid) return;

    fetch(`${baseURL}/en/books`)
        .then(resp => {
            if (!resp.ok) throw new Error('Network response not ok');
            return resp.json();
        })
        .then(books => {
            if (!Array.isArray(books)) return;
            books.forEach(book => {
                const card = document.createElement('div');
                card.className = 'book-card';

                card.innerHTML = `
            <div class="book-cover">
                <img src="${book.cover}" >
            </div>
                    <h3>${book.title}</h3>
                        <div class="book-details">
                            <p><strong>Release Date:</strong> ${book.releaseDate}</p>
                            <p class="book-description"><strong>Description:</strong> ${book.description}</p>
                        </div>
                `;
                grid.appendChild(card);
            });
        })

}
