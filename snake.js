import { Control } from "./control.js";

export class Snake {

    #size = 20;
    #context;
    #control;
    #coordinates;
    #directionsCoordinates = {
        ArrowLeft: {x: -this.#size, y: 0},
        ArrowRight: {x: this.#size, y: 0},
        ArrowUp: {x: 0, y: -this.#size},
        ArrowDown: {x:  0, y: this.#size},
    };

    constructor(renderingContext) {
        this.#context = renderingContext;
        this.#control = new Control();
        this.init();
    }

    init() {
        this.#control.stop();
        this.#coordinates = [{
            x: 200,
            y: 200
        }, {
            x: 180,
            y: 200
        }, {
            x: 160,
            y: 200
        }, {
            x: 140,
            y: 200
        }];
    }

    get head() {
        return this.#coordinates.at(0);
    }

    render() {
        this.#coordinates.forEach(c => this.#renderSection(c));
    }

    move(increase) {

        this.#control.update();

        if (!this.#control.direction) {
            return;
        }
    
        const currentHeadPosition = this.head;
        const diff = this.#directionsCoordinates[this.#control.direction];

        const newHeadPosition = { x: currentHeadPosition.x + diff.x , y: currentHeadPosition.y + diff.y };
 
         this.#coordinates.unshift(newHeadPosition);
         if (!increase) {
             this.#coordinates.pop();
         }
     }
    

    hasColided() {
        const { x, y } = this.head;
         if (x < 0 || y < 0) {
             return true;
         }
 
         if (x > 400 || y > 400) {
             return true;
         }      

         const body = this.#coordinates.slice(1);
         return body.some(c => c.x === x && c.y === y);
     }

    #renderSection({x, y}){
        this.#context.fillStyle = 'Black';
        this.#context.fillRect(x, y, 14, 10);

        this.#context.strokeStyle = '#4CAF50';
        this.#context.strokeRect(x, y, 14, 10);
    }
}