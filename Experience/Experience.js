import * as THREE from 'three'
import Size from './Utils/Size'
import Renderer from './Renderer'
import Camera from './Camera'
import Time from './Utils/Time'
import World from './World/World'
import Resource from './Utils/Resource'
import sources from '../static/sources'


let instance = null
export default class Experience extends EventEmitter{
    constructor(canvas){
        super()
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
        this.resource = new Resource(sources)
        this.world = new World()
    }

    update(){
        this.world.update()
        this.renderer.update()
    }
}