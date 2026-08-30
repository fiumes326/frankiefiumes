import * as THREE from 'three'
import SpaceShip from './SpaceShip'
import Experience from '../Experience'
import Stars from './Stars'
import Earth from './Earth'
import Moon from './Moon'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        const axes = new THREE.AxesHelper(5)
        this.scene.add(axes)
        this.resource = this.experience.resource
    
        this.resource.on('ready', () => {
            this.spaceship = new SpaceShip()
            this.stars = new Stars() 
            this.earth = new Earth()
            this.moon = new Moon()
            this.scene.add(new THREE.AmbientLight(0x1c2d4a, 0.15))
            this.sunLight = new THREE.DirectionalLight(0xfff1cf, 3)
            this.sunLight.position.set(10, 12, 8)
            this.sunLight.target.position.set(0, 0, 0)
            this.scene.add(this.sunLight, this.sunLight.target)
         })
    }

    update(){
        this?.spaceship?.update()
        this?.earth?.update()
        this?.moon?.update()
    }
}