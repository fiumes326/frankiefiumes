import * as THREE from 'three'

export default class Notification {
    constructor(){
        this.notification = document.getElementById("notification")
        this.message = document.getElementById("notificationMessage")
        this.closeButton = document.getElementById("closeNotification")

        this.addEventListeners()
    }

    addEventListeners(){
        this.closeButton.addEventListener("click", () => {
            this.closeNotification()
        })
    }

    showTimedNotification(message, duration = 3000){
        this.message.textContent = message
        this.notification.style.display = "block"
        setTimeout(() => {
            this.closeNotification()
        }, duration)
    }

    showNotification(message){
        this.message.textContent = message
        this.notification.style.display = "block"
    }

    closeNotification(){
        this.notification.style.display = "none"
    }
}