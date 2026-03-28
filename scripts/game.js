import { loadSettings, saveSettings } from './storage.js';

let deck = [], flipped = [], matched = 0, attempts = 0, seconds = 0, timer = null, settings = null;

const themes = {
    animals: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'],
    foods: ['🍎','🍉','🍓','🍒','🥑','🍕','🍔','🌮'],
    faces: ['😀','😂','😍','😎','🥳','🤩','😢','😡']
};

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

export function createDeck(pairs, theme) {
    const emojis = shuffle(themes[theme]).slice(0, pairs);
    let cards = [];
    emojis.forEach((emoji, i) => {
        cards.push({id: i + '-1', emoji});
        cards.push({id: i + '-2', emoji});
    });
    return shuffle(cards);
}

export function renderBoard(boardEl) {
    boardEl.innerHTML = '';
    deck.forEach(card => {
        const div = document.createElement('div');
        div.className = 'memory-card';
        div.dataset.id = card.id;
        div.innerHTML = `
            <div class="card-inner">
                <div class="back">❓</div>
                <div class="front">${card.emoji}</div>
            </div>`;
        div.addEventListener('click', () => flipCard(div));
        boardEl.appendChild(div);
    });
}

function flipCard(cardEl) {
    if (flipped.length >= 2 || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (!timer) startTimer();

    cardEl.classList.add('flipped');
    flipped.push(cardEl);

    if (flipped.length === 2) {
        attempts++;
        updateUI();

        const [c1, c2] = flipped;
        if (c1.querySelector('.front').textContent === c2.querySelector('.front').textContent) {
            c1.classList.add('matched');
            c2.classList.add('matched');
            matched += 2;
            flipped = [];
            if (matched === deck.length) endGame();
        } else {
            setTimeout(() => {
                c1.classList.remove('flipped');
                c2.classList.remove('flipped');
                flipped = [];
            }, 800);
        }
    }
}

function startTimer() {
    seconds = 0;
    timer = setInterval(() => { seconds++; updateUI(); }, 1000);
}

function updateUI() {
    document.getElementById('attempts-display').textContent = attempts;
    document.getElementById('time-display').textContent = seconds + 's';
}

function endGame() {
    clearInterval(timer);
    const bestUpdated = attempts < settings.bestAttempts || seconds < settings.bestTime;
    if (bestUpdated) {
        settings.bestAttempts = attempts;
        settings.bestTime = seconds;
        saveSettings(settings);
    }
    document.getElementById('win-stats').innerHTML = `You did it in <strong>\( {attempts}</strong> attempts and <strong> \){seconds}</strong> seconds!`;
    new bootstrap.Modal(document.getElementById('winModal')).show();
}

export function initGame(boardEl) {
    settings = loadSettings();
    document.getElementById('player-display').textContent = `Player: ${settings.playerName}`;
    document.getElementById('best-display').innerHTML = settings.bestAttempts === Infinity ? '—' : `Best: ${settings.bestAttempts} att / ${settings.bestTime}s`;

    deck = createDeck(settings.difficulty, settings.theme);
    matched = 0; attempts = 0; flipped = [];
    if (timer) clearInterval(timer);
    renderBoard(boardEl);
    updateUI();
    document.getElementById('status').textContent = 'Click cards to start!';
}

export function resetGame() {
    initGame(document.getElementById('board'));
}

// Easter egg
window.unlockRainbow = () => {
    document.getElementById('board').style.animation = 'rainbow 1.5s linear infinite';
    console.log('%c🌈 Rainbow mode activated!', 'color:#ff00ff; font-size:20px');
};