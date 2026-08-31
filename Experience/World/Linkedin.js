import Experience from "../Experience";
import * as THREE from 'three'
import * as CANNON from 'cannon'

export default class Linkedin{
    constructor(){
        this.experience = new Experience()
        this.resource = this.experience.resource
        this.cursor = this.experience.cursor
        this.scene = this.experience.scene
        this.physics = this.experience.physics
        this.hud = this.experience.hud
        this.isHovering = false
        this.toolTipOpen = false

        this.setMesh()
        this.setPhysics()
        this.hud.on('start', () => {
            this.setRayCastListener()
            this.setClickListener()
        })
    }

    setClickListener(){
        this.cursor.on('click', () => {
            if (this.isHovering) {
                window.open('https://www.linkedin.com/in/frank-fiumefreddo-56549a34b/', '_blank', 'noopener,noreferrer')
            }
        })
    }

    setMesh(){
        this.linkedin = new THREE.Group()
        this.mesh = this.resource.items.linkedin.scene
        this.bounds = new THREE.Box3().setFromObject(this.mesh)
        this.center = this.bounds.getCenter(new THREE.Vector3())
        this.mesh.position.sub(this.center)
        this.linkedin.add(this.mesh)
        this.linkedin.position.set(-5, 0, -10) 
        this.linkedin.scale.set(1.5, 1.5, 1.5)
        this.linkedin.rotation.x = -Math.PI / 4
        this.scene.add(this.linkedin)
    }

    setPhysics(){
        this.size = this.bounds.getSize(new THREE.Vector3()).multiplyScalar(1.5)
        this.body = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(this.size.x / 2, this.size.y / 2, this.size.z / 2)),
            position: new CANNON.Vec3(...this.linkedin.position),
            material: this.physics.materials.socialMedia
        })
        this.physics.world.addBody(this.body)
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
        if (!this.toolTipOpen){
            this.cursor.showToolTip("Click to go to Linkedin")
            this.toolTipOpen = true
        }
    }

    update(){
        if (this.isHovering) {
            this.onHover()
        }
        else{
            if(this.toolTipOpen){
                this.cursor.removeToolTip()
                this.toolTipOpen = false
            }
        }
    }
}