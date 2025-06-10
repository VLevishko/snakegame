 import { Food } from "./food.js";
 import { Snake } from "./snake.js";
 
 export class GameField {
     #score;
     #context;
     #snake;
     #food;
 
     constructor(renderingContext) {
         this.#score = 0;
         this.#context = renderingContext;
         this.#snake = new Snake(renderingContext);
         this.#food = new Food(renderingContext);
     }
 
     render() {
         this.#context.fillStyle = 'white';
         this.#context.fillRect(0, 0, 400, 400);
 
         this.#context.strokeStyle = 'black';
         this.#context.lineWidth = 5;
         this.#context.strokeRect(0, 0, 400, 400);
 
         this.#snake.render();
         this.#food.render();
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
 
     #createFoodIfNotExists() {
         if (this.#food.exists) {
             return;
         }
 
         this.#food.create();
     }
 
     #hasSnakeEatenFood() {
         if (!this.#food.exists) {
             return false;
         }
 
         const head = this.#snake.head;
         const food = this.#food.coordinates;
 
         return head.x === food.x && head.y === food.y;
     }
 }