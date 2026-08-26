import Experience from "../Experience"
export default class Size {
    constructor(){
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.camera = this.experience.camera

        this.setEventListener
    }

    setEventListener() {
        window.addEventListener('resize', () => {
            this.camera.resize()
            this.renderer.resize()
        })
    }
}