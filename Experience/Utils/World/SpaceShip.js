import Experience from "../../Experience";

export default class SpaceShip {

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    setMesh(){

    }

}