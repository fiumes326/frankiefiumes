import * as THREE from 'three'
import SpaceShip from './SpaceShip'
import Experience from '../Experience'
import Stars from './Stars'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resource

        this.resource.on('ready', () => {
            console.log('resources ready')
            this.spaceship = new SpaceShip()
            this.stars = new Stars() 
            this.scene.add(new THREE.AmbientLight(0xffffff, 8))
         })
    }

    update(){
        this.spaceship?.update()
    }
}