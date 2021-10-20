import { MessageDelivery } from "../system/MessageInteraction.js"

class Timer {
	private ms: number = 0
	private interval:any
	private MD:MessageDelivery=new MessageDelivery()
	constructor() { 
		this.init()
	}
	init() { this.ms = 0 }
	start() {
		this.interval = setInterval(() => { 
			this.ms += 10 
			if(this.ms%1000===0){
				this.MD.deliver("second", Math.floor(this.ms/1000))
			}
		}, 10)
	}
	pause() {
		clearInterval(this.interval)
	}
	now() { return this.ms }
}

const timer: Timer = new Timer()

export { timer }