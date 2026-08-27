import Experience from "../Experience";
import * as THREE from 'three'

export default class SpaceShip {

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resource

        this.setMesh()
    }

    setMesh(){
        this.mesh = this.resource.items.spaceship.scene
        this.mesh.scale.set(0.15, 0.15, 0.15)
        this.mesh.rotation.y = Math.PI
        this.scene.add(this.mesh)
    }

    update(){
    }

}