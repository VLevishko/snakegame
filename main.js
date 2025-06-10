import {GameField} from './game-field.js';

const canvasEl = document.getElementsByTagName('canvas')[0];
const context = canvasEl.getContext('2d');

const startBtn = document.getElementById('start');
startBtn.onclick = () => field.start();

const field = new GameField(context);
field.render();

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
