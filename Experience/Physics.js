import * as CANNON from 'cannon'
import Experience from './Experience.js'

export default class Physics {
    constructor(){
        this.experience = new Experience()
        this.world = new CANNON.World()
        this.world.gravity.set(0, 0, 0)
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.allowSleep = true

        this.setMaterials()
        this.setContactMaterials()
    }

    setMaterials(){
        this.materials = {
            ship: new CANNON.Material('ship'),
            socialMedia: new CANNON.Material('socialMedia')
        }
    }

    setContactMaterials(){
        this.shipSocialMediaContact = new CANNON.ContactMaterial(
            this.materials.ship,
            this.materials.socialMedia,
            {
                friction: 0.1,
                restitution: 0.6
            }
        )
        this.world.addContactMaterial(this.shipSocialMediaContact)
    }

    update(){
        this.world.step(1/60, this.experience.time.delta / 1000, 3)
    }
}