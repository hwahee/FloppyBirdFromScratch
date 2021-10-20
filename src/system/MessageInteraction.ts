class MessageBroker {
	private members: MessageDelivery[] = []
	constructor() { }

	setMember(target: MessageDelivery) {
		this.members.push(target)
	}

	trigger(keyword: string, data: any) {
		this.members.forEach((member) => member.get(keyword, data))
	}
}
const MB = new MessageBroker()

class MessageDelivery {
	private actions:{[key:string]:CallableFunction}={}
	constructor() { 
		MB.setMember(this)
	}

	setAction(keyword:string, action:CallableFunction) {
		this.actions[keyword] = action
	}

	deliver(keyword:string, data = {}) {
		MB.trigger(keyword, data)
	}

	get(keyword:string, data?:any) {
		if (keyword in this.actions) {
			this.actions[keyword](data??undefined)
		}
	}
}

export {MessageDelivery}
