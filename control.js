export class Control {
    #direction;
    #latestDirectionClick;

    get direction() {
        return this.#direction;
    }

    stop() {
       this.#latestDirectionClick = null;
       this.#direction = null;
    }

    constructor() {
        document.addEventListener('keydown', evt => {
            const horizontalDirection = ['ArrowLeft', 'ArrowRight' ];
            const verticalDirection = ['ArrowUp', 'ArrowDown'];
            const directions = [...horizontalDirection, ...verticalDirection];


            if (!directions.includes(evt.code)) {
                return;
            }

            if (this.direction && horizontalDirection.includes(evt.code) && horizontalDirection.includes(this.direction)) {
                return;
            }
            if (this.direction && verticalDirection.includes(evt.code) && verticalDirection.includes(this.direction)) {
                return;
            }
            
            this.#latestDirectionClick = evt.code;

        });
    }

    update() {
        this.#direction = this.#latestDirectionClick;
    }
}