import { Control } from "./control.js";

export class Snake {
    #size = 20;  
    #visualSize = 16; 
    #context;
    #control;
    #coordinates;
    #skin = "black"; 
    #directionsCoordinates = {
        ArrowLeft: { x: -this.#size, y: 0 },
        ArrowRight: { x: this.#size, y: 0 },
        ArrowUp: { x: 0, y: -this.#size },
        ArrowDown: { x: 0, y: this.#size },
    };

    constructor(renderingContext) {
        this.#context = renderingContext;
        this.#control = new Control();
        this.init();
    }


    setSkin(skin) {
        this.#skin = skin;
    }

   
    init() {
        this.#control.stop();
        this.#coordinates = [
            { x: 200, y: 200 },
            { x: 180, y: 200 },
            { x: 160, y: 200 },
            { x: 140, y: 200 }
        ];
    }

    
    get head() {
        return this.#coordinates[0];
    }

    
    render() {
        this.#coordinates.forEach((segment, index) => {
            this.#renderSection(segment, index);
        });
    }

    
    move(increase) {
        this.#control.update();
        if (!this.#control.direction) return;

        const currentHead = this.head;
        const diff = this.#directionsCoordinates[this.#control.direction];
        const newHead = { x: currentHead.x + diff.x, y: currentHead.y + diff.y };

        this.#coordinates.unshift(newHead);
        if (!increase) this.#coordinates.pop();
    }

   
    hasColided() {
        const { x, y } = this.head;
        const maxX = this.#context.canvas.width;
        const maxY = this.#context.canvas.height;

        if (x < 0 || y < 0 || x >= maxX || y >= maxY) return true;
        return this.#coordinates.slice(1).some(c => c.x === x && c.y === y);
    }

    
    #renderSection({ x, y }, index) {
        const ctx = this.#context;
        const size = this.#visualSize;
        const offset = (this.#size - size) / 2;
    
        let fillStyle = this.#getFillStyle(ctx, x, y, index);
    
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x + offset, y + offset, size, size);
    
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white"; 
        ctx.strokeRect(x + offset, y + offset, size, size);
    }
    
    
    #getFillStyle(ctx, x, y, index) {
        if (typeof this.#skin === "string") {
            return this.#skin;
        } else if (this.#skin?.type === "gradient") {
            const gradient = ctx.createLinearGradient(x, y, x + this.#size, y + this.#size);
            gradient.addColorStop(0, this.#skin.colors[0]);
            gradient.addColorStop(1, this.#skin.colors[1]);
            return gradient;
        } else if (this.#skin?.type === "dualColor") {
            return index === 0 ? this.#skin.head : this.#skin.body;
        }

        return "black";  
    }
}
