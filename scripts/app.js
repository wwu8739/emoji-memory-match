import { initGame, resetGame } from './game.js';
import { loadSettings, saveSettings } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    initGame(board);

    // Settings form
    document.getElementById('settings-form').addEventListener('submit', e => {
        e.preventDefault();
        const nameInput = document.getElementById('player-name');
        if (nameInput.value.trim().length < 3) {
            nameInput.classList.add('is-invalid');
            return;
        }
        nameInput.classList.remove('is-invalid');

        const newSettings = loadSettings();
        newSettings.playerName = nameInput.value.trim();
        newSettings.difficulty = parseInt(document.getElementById('difficulty').value);
        newSettings.theme = document.getElementById('theme').value;

        saveSettings(newSettings);
        bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
        initGame(document.getElementById('board'));
    });

    // Pre-fill settings modal
    document.getElementById('settingsModal').addEventListener('show.bs.modal', () => {
        const s = loadSettings();
        document.getElementById('player-name').value = s.playerName;
        document.getElementById('difficulty').value = s.difficulty;
        document.getElementById('theme').value = s.theme;
    });

    console.log('%cGame loaded! Type unlockRainbow() in console for a surprise.', 'color:gold');
});