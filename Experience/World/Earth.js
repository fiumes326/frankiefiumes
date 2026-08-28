import * as THREE from 'three'
import Experience from '../Experience'

export default class Earth {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resource
        this.rotation = 0
        this.setMesh()
    }

    setMesh() {
        this.earthGroup = new THREE.Group()
        this.mesh = this.resource.items.earth.scene
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                child.material.metalness = 0
                child.material.roughness = 0.85
                child.material.needsUpdate = true
            }
        })
        this.bounds = new THREE.Box3().setFromObject(this.mesh)
        this.center = this.bounds.getCenter(new THREE.Vector3())
        this.mesh.position.sub(this.center)
        this.earthGroup.add(this.mesh)
        this.earthGroup.scale.set(5,5,5)
        this.earthGroup.position.set(0,-10,0)
        this.scene.add(this.earthGroup)
    }

    update(){
        this.earthGroup.rotation.y+=.001
    }
}