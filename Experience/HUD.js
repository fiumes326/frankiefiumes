import Experience from "./Experience";
import EventEmitter from "./Utils/EventEmitter";

export default class HUD {
    constructor(){
        this.experience = new Experience()
        this.loading = document.getElementById("loading")
        this.minimap = document.getElementById("minimap")

        this.showLoader()
        
    }

    showLoader(){
        this.loadingHeader = document.createElement("h2")
        this.loadingHeader.innerText = "Loading..."
        this.loading.appendChild(this.loadingHeader)

        this.experience.resource.on("ready",()=>this.showStartButton())

    }

    showStartButton(){
        this.startButton = document.createElement("button")
        this.startButton.id="startButton"
        this.startButton.innerText = "Start"
        this.startButton.addEventListener("click", () =>this.removeLoading())
        this.loading.appendChild(this.startButton)
    }


    removeLoading() {
        this.loading.remove()
    }

    update(){

    }
}