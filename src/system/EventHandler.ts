class EventHandler {
	private handlerList: CallableFunction[] = []
	handleEvent() {
		for (let i = 0; i < this.handlerList.length; i++) {
			this.handlerList[i]()
		}
		this.handlerList = []
	}
	push(func:CallableFunction){
		this.handlerList.push(func)
	}
}
const eventHandler:EventHandler=new EventHandler()

export {eventHandler}
