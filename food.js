export class Food {
    #coordinates;
    #context;
    #size = 10;

    get coordinates() {
        return this.#coordinates;
    }

    constructor(renderingContext) {
        this.#context = renderingContext;
    }

    get exists() {
        return !!this.#coordinates;
    }

    empty() {
        this.#coordinates = null;
    }

    render() {
        console.log('this.#coordinate', this.#coordinates);
        if (!this.exists) {
            return;
        }
        this.#context.fillStyle = 'DeepPink';
        this.#context.strokestyle = 'DeepPink';
        this.#context.fillRect(this.#coordinates.x, this.#coordinates.y,  this.#size, this.#size);
        this.#context.strokeRect(this.#coordinates.x, this.#coordinates.y, this.#size, this.#size);
    }

    create() {
        this.#coordinates = {
            x: this.#generateRandom(),
            y: this.#generateRandom()
        };
        
        console.log('CREATE', this.coordinates);
    }

    #generateRandom() {
        const random = Math.random() * 380;
        return Math.round(random/20) * 20;
    }

}