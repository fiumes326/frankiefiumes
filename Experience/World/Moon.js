import * as THREE from 'three'
import Experience from '../Experience'

export default class Moon {
    constructor() {
        this.experience = new Experience()
        this.resource = this.experience.resource
        this.scene = this.experience.scene
        this.orbitAngle = 0
        this.rotationAngle = 0

        this.setMesh()
    }


    setMesh(){
        this.moonGroup = new THREE.Group()
        this.mesh = this.resource.items.moon.scene
        this.bounds = new THREE.Box3().setFromObject(this.mesh)
        this.center = this.bounds.getCenter(new THREE.Vector3())
        this.mesh.position.sub(this.center)
        this.moonGroup.add(this.mesh)
        this.moonGroup.position.set(5, -8, 0)
        this.moonGroup.traverse((object) => object.layers.enable(1))
        this.scene.add(this.moonGroup)
    }

    update(){
        //add orbit around earth next radius 5 and make orbit around y axis at origin (0,0,0)
        this.moonGroup.position.x = Math.cos(this.orbitAngle) * 5
        this.moonGroup.position.z = Math.sin(this.orbitAngle) * 5
        this.orbitAngle -= .001
        this.moonGroup.rotation.y = this.rotationAngle
        this.rotationAngle += .01
    }
}