import Experience from "../Experience";
import * as THREE from 'three'


export default class Instagram{
    constructor(){
        this.experience = new Experience()
        this.resource = this.experience.resource
        this.cursor = this.experience.cursor
        this.scene = this.experience.scene
        this.isHovering = false
        this.toolTipOpen = false

        this.setMesh()
        this.setRayCastListener()
        this.setClickListener()
    }

    setClickListener(){
        this.cursor.on('click', () => {
            if (this.isHovering) {
                window.open('https://www.linkedin.com/in/frank-fiumefreddo-56549a34b/', '_blank', 'noopener,noreferrer')
            }
        })
    }

    setMesh(){
        this.instagram = new THREE.Group()
        this.mesh = this.resource.items.instagram.scene
        this.bounds = new THREE.Box3().setFromObject(this.mesh)
        this.center = this.bounds.getCenter(new THREE.Vector3())
        this.mesh.position.sub(this.center)
        this.instagram.add(this.mesh)
        this.instagram.position.set(0, -5, -10) 
        this.instagram.scale.set(1.5, 1.5, 1.5)
        this.instagram.rotation.y = -Math.PI / 2
        this.instagram.rotation.x = -Math.PI / 4
        this.scene.add(this.instagram)
    }

    setRayCastListener(){
        this.experience.raycaster.on("cast", (intersects) => {
            this.isHovering = intersects.some((intersect) => {
                let object = intersect.object
                while (object) {
                    if (object === this.instagram) return true
                    object = object.parent
                }
                return false
            })
        })
    }

    onHover(){
        if (!this.toolTipOpen){
            this.cursor.showToolTip("Click to go to Instagram")
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