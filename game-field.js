import { Food } from "./food.js";
import { Snake } from "./snake.js";

export class GameField {
    #score;
    #highscore;
    #context;
    #snake;
    #food;

    constructor(renderingContext) {
        this.#context = renderingContext;
        this.#snake = new Snake(renderingContext);
        this.#food = new Food(renderingContext);
        this.#score = 0;
        this.#highscore = localStorage.getItem('highscore') || 0;
        document.getElementById('highscore').innerText = this.#highscore;
    }

    start() {
        this.#snake.init();
        this.#score = 0;
        this.#food.empty();
        document.getElementById('score').innerText = this.#score;
        this.#gameLoop();
    }

    #gameLoop() {
        const hasEaten = this.#hasSnakeEatenFood();
        this.#snake.move(hasEaten);

        if (this.#snake.hasColided()) {
            if (this.#score > this.#highscore) {
                this.#highscore = this.#score;
                localStorage.setItem('highscore', this.#highscore);
                document.getElementById('highscore').innerText = this.#highscore;
            }
            alert(`Кінець гри. Ваш результат: ${this.#score}`);
            return;
        }

        if (hasEaten) {
            this.#food.empty();
            this.#score += 5;
            document.getElementById('score').innerText = this.#score;
        }

        this.#createFoodIfNotExists();
        this.render();
        setTimeout(() => this.#gameLoop(), 200);
    }

    render() {
        const size = this.#context.canvas.width;
        this.#context.fillStyle = 'black';
        this.#context.fillRect(0, 0, size, size);

        this.#context.strokeStyle = 'black';
        this.#context.lineWidth = 5;
        this.#context.strokeRect(0, 0, size, size);

        this.#snake.render();
        this.#food.render();
    }

    updateSize(newSize) {
        this.#context.canvas.width = newSize;
        this.#context.canvas.height = newSize;
    }

    setSnakeSkin(color) {
        this.#snake.setSkin(color);
    }

    #createFoodIfNotExists() {
        if (!this.#food.exists) {
            this.#food.create();
        }
    }

    #hasSnakeEatenFood() {
        if (!this.#food.exists) return false;

        const head = this.#snake.head;
        const food = this.#food.coordinates;

        return head.x === food.x && head.y === food.y;
    }
}
