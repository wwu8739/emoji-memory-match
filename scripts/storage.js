export const STORAGE_KEY = 'matchySettings';

export function loadSettings() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
        playerName: 'Guest',
        difficulty: 6,
        theme: 'animals',
        bestAttempts: Infinity,
        bestTime: Infinity
    };
}

export function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}