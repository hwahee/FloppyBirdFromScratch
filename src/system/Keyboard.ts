import { MessageDelivery } from './MessageInteraction.js'

class Keyboard {
	private MD: MessageDelivery = new MessageDelivery()
	constructor() { }
	init(){
		document.addEventListener('keydown', (e)=>{
			if(e.key===' '){
				this.MD.deliver('keySpace')
			}
		})
	}
}

const keyboard: Keyboard = new Keyboard()
export { keyboard }