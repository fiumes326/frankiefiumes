import Experience from "../Experience"
import * as CANNON from 'cannon'
import * as THREE from 'three'


export default class Lasers {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.spaceship = this.experience.world.spaceship
        this.time = this.experience.time
        this.resource = this.experience.resource
        this.physics = this.experience.physics

        this.lasers = []

        this.totalLaserDistance = 8
        this.speed = 8
        this.controls()
    }

    controls(){
        this.experience.controls.on('space', ()=>{
            this.createLaser()
        })
    }

    createLaser(){
        const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(this.spaceship.mesh.quaternion)
        direction.y = 0
        direction.normalize()
        const spawnPosition = this.spaceship.mesh.position.clone()
            .addScaledVector(direction, 0.5)
        const body = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Sphere(.08) ,
            position: new CANNON.Vec3(
                spawnPosition.x,
                spawnPosition.y,
                spawnPosition.z
            ),
            material: this.physics.materials.laser
        })
        body.velocity.set(
            direction.x * this.speed,
            direction.y * this.speed,
            direction.z * this.speed
        )
        const geometry = new THREE.PlaneGeometry(1, .25)
        const material = new THREE.MeshBasicMaterial({
            color: 0x64e9ff,
            map: this.resource.items.lasersAlphaMap,
            alphaMap: this.resource.items.lasersAlphaMap,
            transparent: true,
            opacity: 1,
            depthWrite: false,
        })

        const laser = new THREE.Mesh(geometry, material)
        laser.position.copy(spawnPosition)
        laser.rotation.x = -Math.PI / 2
        const laserData = {laser, direction, body, totalDistance: 0, shouldRemove: false}
        this.lasers.push(laserData)
        body.addEventListener("collide", (event) => {
            if (event.body !== this.spaceship.body){
                laserData.shouldRemove = true
            }
        })
        this.physics.world.addBody(body)
        this.scene.add(laser)
    }

    removeLaser(laserData){
        this.scene.remove(laserData.laser)
        this.physics.world.removeBody(laserData.body)
        laserData.laser.geometry.dispose()
        laserData.laser.material.dispose()

        const index = this.lasers.indexOf(laserData)
        if (index !== -1) {
            this.lasers.splice(index, 1)
        }
    }

    update(){
        const deltaSeconds = this.time.delta * 0.001
        const distance = this.speed * deltaSeconds

        for (let index = this.lasers.length - 1; index >= 0; index--) {
            const laserData = this.lasers[index]

            if (laserData.shouldRemove || laserData.totalDistance > this.totalLaserDistance) {
                this.removeLaser(laserData)
                continue
            }

            laserData.totalDistance += distance

            laserData.laser.position.copy(laserData.body.position)
        }
    }
}