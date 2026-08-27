import Experience from "../Experience";
import * as THREE from 'three'
import * as CANNON from 'cannon'

export default class SpaceShip {

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resource = this.experience.resource


        this.isAccelerating = false
        this.isBraking = false
        this.isTurningLeft = false
        this.isTurningRight = false
        this.shipPitch = 0
        this.shipYaw = Math.PI
        this.maxShipPitch = 0.4
        this.idleDamping = 0.6
        this.thrustForce = 2
        this.pitchAxis = new CANNON.Vec3(1, 0, 0)
        this.yawAxis = new CANNON.Vec3(0, 1, 0)
        this.yawQuaternion = new CANNON.Quaternion()

        this.setMesh()
        this.setPhysics()
        this.setFlames()
        this.controls()
    }

    setMesh(){
        this.mesh = this.resource.items.spaceship.scene
        this.mesh.scale.set(0.10, 0.10, 0.10)
        this.geometrySize = new THREE.Box3().setFromObject(this.mesh)
        this.mesh.position.set(0, 1, 0)
        this.mesh.rotation.y = this.shipYaw
        this.scene.add(this.mesh)
    }

    setFlames(){
        this.flameCount = 300
        this.flameSpeed = 1.5
        this.flameMaxDistance = 1
        this.flameWidth = 2.5
        this.flameDirection = Math.sign(this.geometrySize.min.z) || -1
        this.flameProgress = new Float32Array(this.flameCount)
        this.flameAngle = new Float32Array(this.flameCount)
        this.flameRadius = new Float32Array(this.flameCount)

        const positions = new Float32Array(this.flameCount * 3)
        for(let i = 0; i < this.flameCount; i++){
            this.flameProgress[i] = Math.random()
            this.resetFlameParticle(positions, i)
        }

        const particleGeometry = new THREE.BufferGeometry()
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xff6600,
            size: 0.01,
            transparent: true,
            depthWrite: false
        })

        this.flames = new THREE.Points(particleGeometry, particleMaterial)
        // geometrySize is already scaled by mesh.scale, so undo it here since flames is a child of the scaled mesh
        this.flames.position.set(0, 0, (this.geometrySize.min.z / this.mesh.scale.z) * 1.5)
    }

    resetFlameParticle(positions, i){
        this.flameAngle[i] = Math.random() * Math.PI * 2
        this.flameRadius[i] = Math.random()
        positions[i * 3] = 0
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = 0
    }

    updateFlames(){
        const positions = this.flames.geometry.attributes.position.array

        for(let i = 0; i < this.flameCount; i++){
            this.flameProgress[i] += this.experience.time.delta * 0.001 * this.flameSpeed

            if(this.flameProgress[i] >= 1){
                this.flameProgress[i] = 0
                this.resetFlameParticle(positions, i)
            }

            // spread grows with progress so particles fan out into a cone as they travel back
            const coneRadius = this.flameRadius[i] * this.flameWidth * this.flameProgress[i]
            positions[i * 3] = Math.cos(this.flameAngle[i]) * coneRadius
            positions[i * 3 + 1] = Math.sin(this.flameAngle[i]) * coneRadius
            positions[i * 3 + 2] = this.flameDirection * this.flameProgress[i] * this.flameMaxDistance
        }

        this.flames.geometry.attributes.position.needsUpdate = true
    }

    flamesOn(){
        if(!this.flames.parent){
            this.mesh.add(this.flames)
        }
    }

    flamesOff(){
        this.mesh.remove(this.flames)
    }

    setPhysics(){
        this.physics = this.experience.physics
        this.body = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(this.geometrySize.getSize(new THREE.Vector3()).x / 2, this.geometrySize.getSize(new THREE.Vector3()).y / 2, this.geometrySize.getSize(new THREE.Vector3()).z / 2)),
            position: new CANNON.Vec3(0, 1, 0)
        })
        this.physics.world.addBody(this.body)
    }

    controls(){
        this.experience.controls.on("forward", () => {
            this.body.wakeUp()
            this.flamesOn()
            this.isAccelerating = true
        })
        this.experience.controls.on("keyup", (event) => {
            if(event.code === 'KeyW' || event.code === 'ArrowUp'){
                this.flamesOff()
                this.isAccelerating = false
            }
        })
        this.experience.controls.on("backward", () => {
            this.body.wakeUp()
            this.isBraking = true
        })
        this.experience.controls.on("keyup", (event) => {
            if(event.code === 'KeyS' || event.code === 'ArrowDown'){
                this.isBraking = false
            }
        })
        this.experience.controls.on("left", () => {
            this.isTurningLeft = true
        })
        this.experience.controls.on("right", () => {
            this.isTurningRight = true
        })
        this.experience.controls.on("keyup", (event) => {
            if(event.code === 'KeyA' || event.code === 'ArrowLeft'){
                this.isTurningLeft = false
            } else if(event.code === 'KeyD' || event.code === 'ArrowRight'){
                this.isTurningRight = false
            }
        })

    }

    pitchNoseUp(){
        if(this.shipPitch > -this.maxShipPitch){
            this.shipPitch -= 0.025
        }
    }

    pitchNoseDown(){
        if(this.shipPitch < this.maxShipPitch){
            this.shipPitch += 0.025
        }
    }

    update(){
        const hasMovementInput = this.isAccelerating || this.isBraking || this.isTurningLeft || this.isTurningRight
        this.body.linearDamping = hasMovementInput ? 0 : this.idleDamping

        if(this.isTurningLeft){
            this.shipYaw += this.turnSpeed * this.experience.time.delta * 0.001
        }
        if(this.isTurningRight){
            this.shipYaw -= this.turnSpeed * this.experience.time.delta * 0.001
        }

        this.yawQuaternion.setFromAxisAngle(this.yawAxis, this.shipYaw)
        this.body.quaternion.copy(this.yawQuaternion)

        if(this.isAccelerating ){
            this.body.applyLocalForce(new CANNON.Vec3(0, 0, this.thrustForce), new CANNON.Vec3(0, 0, 0))
            if(this.body.velocity.length() > 6){
                this.body.velocity.normalize()
                this.body.velocity.scale(6, this.body.velocity)
            }
        }
        if(this.isBraking && this.body.velocity.length() < 6){
            this.body.applyLocalForce(new CANNON.Vec3(0, 0, -this.thrustForce), new CANNON.Vec3(0, 0, 0))
        }

        this.mesh.position.copy(this.body.position)
        this.mesh.rotation.set(this.shipPitch, this.shipYaw, 0)

        if(this.isAccelerating){
            this.updateFlames()
            this.pitchNoseUp()
        }
        if(this.isBraking){
            this.pitchNoseDown()
        }

        if (!this.isAccelerating && !this.isBraking) {
            if (this.shipPitch > 0) {
                this.pitchNoseUp()
            } else if (this.shipPitch < 0) {
                this.pitchNoseDown()
            }
        }

    }

}