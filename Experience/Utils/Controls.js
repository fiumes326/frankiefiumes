import EventEmitter from './EventEmitter'

export default class Controls extends EventEmitter{
    constructor(){
        super()
        this.setEventListener()
    }
    
    setEventListener() {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'KeyW' || event.code === 'ArrowUp') {
                this.trigger('forward')
            } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
                this.trigger('backward')
            }
            else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                this.trigger('left')
            } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                this.trigger('right')
            }
            else if (event.code === 'Space'){
                this.trigger('space')
            }
        })
        window.addEventListener('keyup', (event) => {
            this.trigger('keyup', event)
        })
    }

    setMobileEventListeners(){
        document.getElementById("mobileUp").addEventListener("click", () =>{
            this.trigger("forward")
        })
        document.getElementById("mobileDown").addEventListener("click", () =>{
            this.trigger("backward")
        })
        document.getElementById("mobileLeft").addEventListener("click", () =>{
            this.trigger("left")
        })
        document.getElementById("mobileRight").addEventListener("click", () =>{
            this.trigger("right")
        })
    }
}