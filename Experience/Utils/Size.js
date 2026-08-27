import Experience from "../Experience"
import EventEmitter from "./EventEmitter"

export default class Size extends EventEmitter {
    constructor(){
        super()
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.camera = this.experience.camera

        this.setEventListener()
    }

    setEventListener() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.trigger('resize')
        })
    }
}