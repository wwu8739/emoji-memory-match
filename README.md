# 🐱‍👤 Emoji Memory Match
Name: Wansheng Wu

28th March 2026  
**Goal:** Fun memory matching game with persistent settings and best scores.

**Live Demo:Git:https://github.com/wwu8739/emoji-memory-match

**How to Play:** Flip cards to find matching emoji pairs. Lower attempts and time = better score.

**Technologies:** HTML5, Bootstrap 5, ES Modules, localStorage, Custom CSS.

**Wireframe:** See `./images/wireframe.svg`

```js
//  from game.js - data-driven deck creation
export function createDeck(pairs, theme) {
    const emojis = shuffle(themes[theme]).slice(0, pairs);
    let cards = [];
    emojis.forEach((emoji, i) => {
        cards.push({id: i + '-1', emoji});
        cards.push({id: i + '-2', emoji});
    });
    return shuffle(cards);   // Randomization every new game
}
