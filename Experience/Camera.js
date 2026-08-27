import * as THREE from 'three'
import Experience from './Experience'

export default class Camera {
    constructor(){
        this.experience = new Experience()
        this.size = this.experience.size
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
    }
    setInstance(){
        this.instance = new THREE.PerspectiveCamera(75, this.size.width / this.size.height, 0.1, 100)
        this.instance.position.set(0, 5, 5)
        this.instance.lookAt(0, 0, 0)
        this.scene.add(this.instance)
    }

    resize(){
        this.instance.aspect = this.size.width / this.size.height
        this.instance.updateProjectionMatrix()
    }
}