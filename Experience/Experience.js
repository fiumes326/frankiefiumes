import * as THREE from 'three'
import Size from './Utils/Size'
import Renderer from './Utils/Renderer'
import Camera from './Utils/Camera'
import Time from './Utils/Time'

let instance = null
export default class Experience {
    constructor(canvas){
        if(instance){
            return instance
        }
        instance = this
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.size = new Size()
        this.renderer = new Renderer()
        this.camera = new Camera()
        this.time = new Time()
    }

    update(){

    }
}