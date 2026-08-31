import EventEmitter from "./EventEmitter.js";

export default class Cursor extends EventEmitter{
    constructor(){
        super()
        this.position = {
            x: 0,
            y: 0
        }
        this.toolTip = document.getElementById("toolTip") 

        this.addEventListener()
    }

    addEventListener(){
        window.addEventListener('mousemove', (event) => {
            this.position.x = (event.clientX / window.innerWidth) * 2 - 1
            this.position.y = -(event.clientY / window.innerHeight) * 2 + 1
            this.toolTip.style.left = `${event.clientX}px`
            this.toolTip.style.top = `${event.clientY}px`
            this.trigger('move', this.position)
        })
        window.addEventListener('click', (event) => {
            this.trigger('click', this.position)
        })
    }

    showToolTip(message) {
        this.toolTip.innerText = message
        this.toolTip.style.display='block' 
    }

    removeToolTip(){
        this.toolTip.style.display='none'
    }
}
