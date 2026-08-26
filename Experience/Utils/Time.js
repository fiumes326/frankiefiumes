import Experience from "../Experience"

export default class Time {
    #experience

    constructor(){
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.#experience = new Experience()
        window.requestAnimationFrame(() =>
        {
            this.tick()
        })
    }

    tick(){
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        window.requestAnimationFrame(() =>
        {
            this.tick()
            this.#experience.update()
        })
    }
}