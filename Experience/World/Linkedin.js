import Experience from "../Experience";
import * as THREE from 'three'

export default class Linkedin{
    constructor(){
        this.experience = new Experience()
        this.resource = this.experience.resource
        this.scene = this.experience.scene
        this.isHovering = false

        this.setMesh()
        this.setRayCastListener()
    }

    setMesh(){
        this.linkedin = new THREE.Group()
        this.mesh = this.resource.items.linkedin.scene
        this.bounds = new THREE.Box3().setFromObject(this.mesh)
        this.center = this.bounds.getCenter(new THREE.Vector3())
        this.mesh.position.sub(this.center)
        this.linkedin.add(this.mesh)
        this.linkedin.position.set(-2, -5, -5) 
        this.linkedin.scale.set(1.5, 1.5, 1.5)
        this.linkedin.rotation.x = -Math.PI / 4
        this.scene.add(this.linkedin)
    }

    setRayCastListener(){
        this.experience.raycaster.on("cast", (intersects) => {
            this.isHovering = intersects.some((intersect) => {
                let object = intersect.object
                while (object) {
                    if (object === this.linkedin) return true
                    object = object.parent
                }
                return false
            })
        })
    }

    onHover(){
        console.log("Hovering on linkin")
    }

    update(){
        if (this.isHovering) {
            this.onHover()
        }
    }
}