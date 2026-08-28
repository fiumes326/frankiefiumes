import * as THREE from 'three'
import Experience from '../Experience'
export default class Stars {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resource

        this.setMesh()
    }
    
    setMesh(){
        const geometry = new THREE.BufferGeometry()
        const count = 10000
        const positions = new Float32Array(count * 3)

        for(let i = 0; i < count * 3; i++){
            if (i % 3 === 0) {
                positions[i] = (Math.random() - 0.5) * 20 //stars from -10 to 10 x
            } else if (i % 3 === 1) {
                positions[i] = (Math.random() - 1) * 10 //stars from -10 to 0 y
            } else {
                positions[i] = (Math.random() - .5) * 20 //stars from -10 to 10 z
            }
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        
        const material = new THREE.PointsMaterial({
            size: 0.01,
            sizeAttenuation: true,
            alphaMap: this.resource.items.starsAlphaMap,
            transparent: true
        })
        
        this.mesh = new THREE.Points(geometry, material)
        this.scene.add(this.mesh)
    }
}