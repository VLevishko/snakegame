import { GameField } from './game-field.js';

const canvasEl = document.querySelector('canvas');
const context = canvasEl.getContext('2d');
const sizeSelect = document.getElementById('size');
const skinSelect = document.getElementById('skin');
const startBtn = document.getElementById('start');

const field = new GameField(context);
field.render();

startBtn.onclick = () => field.start();

sizeSelect.addEventListener('change', () => {
    const newSize = parseInt(sizeSelect.value);
    canvasEl.width = newSize;
    canvasEl.height = newSize;
    field.updateSize(newSize);
    field.start();
});

skinSelect.addEventListener('change', () => {
    const value = skinSelect.value;

    let skin;
    if (value === "gradient") {
        skin = { type: "gradient", colors: ["#000066", "#cc00ff"] }; 
    } else if (value === "dual") {
        skin = { type: "dualColor", head: "#FF00FF", body: "#000080" }; 
    } else {
        skin = value; 
    }

    field.setSnakeSkin(skin);
    field.render();
});


function createStars(count) {
    const starContainer = document.getElementById('star-container');
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;

        starContainer.appendChild(star);
    }
}

createStars(100);
