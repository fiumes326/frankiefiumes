import EventEmitter from "./EventEmitter.js";

export default class Cursor extends EventEmitter{
    constructor(){
        super()
        this.position = {
            x: 0,
            y: 0
        }

        this.addEventListener()
    }

    addEventListener(){
        window.addEventListener('mousemove', (event) => {
            this.position.x = (event.clientX / window.innerWidth) * 2 - 1
            this.position.y = -(event.clientY / window.innerHeight) * 2 + 1
            this.trigger('move', this.position)
        })
        window.addEventListener('click', (event) => {
            this.trigger('click', this.position)
        })
    }
}
