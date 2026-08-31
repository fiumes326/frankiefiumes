import EventEmitter from "./EventEmitter.js";
import Experience from "../Experience.js";
import * as THREE from 'three'

export default class RayCaster extends EventEmitter{
    constructor(){
        super()
        this.experience = new Experience()
        this.setRayCaster()
        this.cursor = this.experience.cursor.position
    }


    setRayCaster(){
        this.raycaster = new THREE.Raycaster()
        this.raycaster.far = 1
    }

    update() {
        this.raycaster.setFromCamera(this.cursor, this.experience.camera.instance)
        this.intersects = this.raycaster.intersectObjects(this.experience.scene.children, true)
        this.trigger('cast', this.intersects)
    }

}