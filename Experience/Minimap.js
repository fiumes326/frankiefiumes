import * as THREE from 'three'
import Experience from './Experience'


export default class Minimap {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.minimap = document.getElementById("minimap")
        this.expandMiniMap = document.getElementById("expandMiniMap")
        this.expandIcon = document.getElementById("expandIcon")
        this.expanded = false
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

        this.setExpandEventListener()
    }

    setExpandEventListener(){
        this.expandMiniMap.addEventListener("click", ()=>{
            if (this.expanded == false) {
                this.mapSize = 100
                this.camera.left = -50
                this.camera.right = 50
                this.camera.top = 50
                this.camera.bottom = -50
                this.camera.updateProjectionMatrix()
                this.expanded = true
                this.minimap.classList.add('expanded')
                this.expandMiniMap.classList.add('expanded')
                this.width = this.minimap.clientWidth
                this.height = this.minimap.clientHeight
                this.renderer.setSize(this.width, this.height, false)
                this.expandIcon.src = '/icons/shrink.svg'
            }

            else {
                this.mapSize = 20
                this.camera.left = -10
                this.camera.right = 10
                this.camera.top = 10
                this.camera.bottom = -10
                this.camera.updateProjectionMatrix()
                this.expanded = false
                this.minimap.classList.remove('expanded')
                this.expandMiniMap.classList.remove('expanded')
                this.width = this.minimap.clientWidth
                this.height = this.minimap.clientHeight
                this.renderer.setSize(this.width, this.height, false)
                this.expandIcon.src = '/icons/expand.png' 
            }
        })
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