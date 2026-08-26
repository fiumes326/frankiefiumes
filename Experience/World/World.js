import * as THREE from 'three'
import SpaceShip from './SpaceShip'
export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            this.spaceship = new SpaceShip()
        })
    }

    update(){
        this.spaceship.update()
    }
}