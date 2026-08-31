import * as THREE from 'three'
import Experience from '../Experience'
import { Text } from 'troika-three-text'
export default class Earth {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resource
        this.rotation = 0
        this.miniMapText = new Text()
        this.setMesh()
        this.setMiniMapText()
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

    setMiniMapText(){
        this.miniMapText.text = "EARTH"
        this.miniMapText.position.set(0, 0, 3)
        this.miniMapText.rotation.x = -Math.PI / 2
        this.miniMapText.anchorX = 'center'
        this.miniMapText.anchorY = 'middle'
        this.miniMapText.color = 0xFFFFFF
        this.miniMapText.outlineColor = 0x000000
        this.miniMapText.outlineWidth = 0.08
        this.miniMapText.fontSize = 2
        this.miniMapText.layers.set(1)
        this.scene.add(this.miniMapText)
    }

    update(){
        this.earthGroup.rotation.y+=.001
    }
}