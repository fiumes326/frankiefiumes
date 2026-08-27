import * as THREE from 'three'
import Size from './Utils/Size'
import Renderer from './Renderer'
import Camera from './Camera'
import Time from './Utils/Time'
import World from './World/World'
import EventEmitter from './Utils/EventEmitter'
import Resource from './Utils/Resource'
import sources from '../static/sources.js'


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
        this.resource = new Resource(sources)
        this.size = new Size()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.time = new Time()

        this.size.on('resize', () =>
        {
            this.resize()
        })

        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    update(){
        this.world.update()
        this.renderer.update()
    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }

}