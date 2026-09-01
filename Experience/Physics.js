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
            socialMedia: new CANNON.Material('socialMedia'),
            laser: new CANNON.Material('laser')
        }
    }

    setContactMaterials(){
        this.shipSocialMediaContact = new CANNON.ContactMaterial(
            this.materials.ship,
            this.materials.socialMedia,
            {
                friction: 0.1,
                restitution: 0
            }
        )
        this.laserSocialMediaContact = new CANNON.ContactMaterial(
            this.materials.laser,
            this.materials.socialMedia,
            {
                friction: 0.1,
                restitution: 0
            }
        )
        this.world.addContactMaterial(this.shipSocialMediaContact)
        this.world.addContactMaterial(this.laserSocialMediaContact)
    }

    update(){
        this.world.step(1/60, this.experience.time.delta / 1000, 3)
    }
}