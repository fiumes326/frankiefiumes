import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter'

export default class Resource extends EventEmitter{
    constructor(sources){
        super()
        this.sources = sources
        this.toLoad = this.sources.length
        this.ready = false
        this.items = {}

        this.setLoaders()
        this.load()
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
    }

    load(){
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                try {
                    this.loaders.gltfLoader.load(
                        source.path,
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                            console.log('loaded', source.name)
                        },
                        undefined,
                        (error) => {
                            console.error('Error loading', source.name, error)
                        }
                    )
                } catch (error) {
                    console.error('Error loading', source.name, error)
                }
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file)
                    },
                    undefined,
                    (error) => {
                        console.error('Error loading', source.name, error)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file

        this.toLoad--

        if(this.toLoad === 0)
        {   
            this.ready = true
            this.trigger('ready')
        }
    }
    
}