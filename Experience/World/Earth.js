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
        this.bounds = new THREE.Box3().setFromObject(this.mesh)
        this.center = this.bounds.getCenter(new THREE.Vector3())
        this.mesh.position.sub(this.center)
        this.earthGroup.add(this.mesh)
        this.earthGroup.scale.set(5,5,5)
        this.earthGroup.position.set(0,-10,0)
        this.earthGroup.traverse((object) => object.layers.enable(1))
        this.scene.add(this.earthGroup)
    }

    update(){
        this.earthGroup.rotation.y+=.001
    }
}