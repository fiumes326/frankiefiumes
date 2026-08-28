import * as THREE from 'three'
import Size from './Utils/Size'
import Renderer from './Renderer'
import Camera from './Camera'
import Time from './Utils/Time'
import World from './World/World'
import EventEmitter from './Utils/EventEmitter'
import Resource from './Utils/Resource'
import sources from './sources.js'
import Physics from './Physics'
import Controls from './Utils/Controls'
import Cursor from './Utils/Cursor'
import RayCaster from './Utils/RayCaster'
import HUD from './HUD.js'

let instance = null
export default class Experience extends EventEmitter{
    constructor(canvas){
        super()
        if(instance){
            return instance
        }
        instance = this

        this.canvas = canvas
        this.cursor = new Cursor()
        this.scene = new THREE.Scene()
        this.resource = new Resource(sources)
        this.hud = new HUD()
        this.size = new Size()
        this.controls = new Controls()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.time = new Time()
        this.physics = new Physics()
        this.RayCaster = new RayCaster()

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
        this.camera.update()
        this.physics.update()
        this.renderer.update()
    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }

}