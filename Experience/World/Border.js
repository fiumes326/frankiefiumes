import Experience from '../Experience'
import * as CANNON from 'cannon'

export default class Border {
    constructor(){
        this.experience = new Experience()
        this.physics = this.experience.physics
        this.setBorders()
    }

    setBorders(){
        const mapSize = 100
        const wallHeight = 1
        const wallThickness = 0.5
        const edge = mapSize / 2
        const wallY = 1

        this.createWall({
            width: mapSize,
            height: wallHeight,
            thickness: wallThickness,
            position: new CANNON.Vec3(0, wallY, -edge),
            rotation: new CANNON.Vec3(0, 0, 0)
        })

        this.createWall({
            width: mapSize,
            height: wallHeight,
            thickness: wallThickness,
            position: new CANNON.Vec3(0, wallY, edge),
            rotation: new CANNON.Vec3(0, 0, 0)
        })

        this.createWall({
            width: mapSize,
            height: wallHeight,
            thickness: wallThickness,
            position: new CANNON.Vec3(-edge, wallY, 0),
            rotation: new CANNON.Vec3(0, Math.PI / 2, 0)
        })

        this.createWall({
            width: mapSize,
            height: wallHeight,
            thickness: wallThickness,
            position: new CANNON.Vec3(edge, wallY, 0),
            rotation: new CANNON.Vec3(0, Math.PI / 2, 0)
        })
    }

    createWall({ width, height, thickness, position, rotation }){
        const body = new CANNON.Body({
            mass: 0,
            position
        })

        body.addShape(new CANNON.Box(
            new CANNON.Vec3(width / 2, height / 2, thickness / 2)
        ))
        body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z)
        this.physics.world.addBody(body)
    }
}
