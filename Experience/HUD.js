import Experience from "./Experience";
import Minimap from "./Minimap";
import EventEmitter from "./Utils/EventEmitter";

export default class HUD {
    constructor(){
        this.experience = new Experience()
        this.loading = document.getElementById("loading")

        this.showLoader()
        
    }

    showLoader(){
        this.loadingHeader = document.createElement("h2")
        this.loadingHeader.innerText = "Loading..."
        this.loading.appendChild(this.loadingHeader)

        this.experience.resource.on("ready",()=>this.showStartButton())

    }

    removeLoading() {
        this.loading.remove()
    }

    showStartButton(){
        this.startButton = document.createElement("button")
        this.loadingHeader.innerText = "Ready!"
        this.startButton.id="startButton"
        this.startButton.innerText = "Start"
        this.startButton.addEventListener("click", () =>this.removeLoading())
        this.loading.appendChild(this.startButton)
    }


    update(){

    }
}