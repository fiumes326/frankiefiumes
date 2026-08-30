import * as THREE from 'three'
import Experience from './Experience'


export default class Minimap {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.minimap = document.getElementById("minimap")
        this.mapSize = 20
        this.width = this.minimap.clientWidth
        this.height = this.minimap.clientHeight
        this.ambientLight = new THREE.AmbientLight(0xffffff, 2)
        this.ambientLight.layers.set(1)
        this.scene.add(this.ambientLight)

        this.camera = new THREE.OrthographicCamera(
            -this.mapSize / 2,
            this.mapSize / 2,
            this.mapSize / 2,
            -this.mapSize / 2,
            0.1,
            100
        )
        this.camera.layers.set(1)

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.minimap,
            antialias: true,
            alpha: true
        })
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(this.width, this.height, false)
    }

    update(){
        const spaceship = this.experience.world.spaceship
        if(!spaceship) return

        const position = spaceship.body.position
        this.camera.position.set(position.x, 30, position.z)
        this.camera.lookAt(position.x, -10, position.z)
        this.renderer.render(this.scene, this.camera)
    }
}