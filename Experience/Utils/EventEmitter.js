

export default class EventEmitter {
    constructor(){
        this.callbacks = {}
    }

    on(name, callback){
        if (this.callbacks[name]){
            this.callbacks[name].push(callback)
        }
        else{
            this.callbacks[name] = [callback]
        }
    }

    trigger(name, ...args){
        if (this.callbacks[name]){
            this.callbacks[name].forEach(callback => {
               callback(...args) 
            });
        }
    }


}