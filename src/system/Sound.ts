import { MessageDelivery } from "./MessageInteraction.js"

class Sound {
	private list: { [key: string]: HTMLAudioElement } = {}
	private MD: MessageDelivery = new MessageDelivery()
	constructor() { }
	register(name: string, src: string) {
		this.list[name] = new Audio(src)
		this.MD.setAction(name, () => {
			this.list[name].currentTime=0
			this.list[name].play()
		})
	}
	registerPrepared() {
		this.register("AUDIO_jump", "audios/audio_wing.wav")
		this.register("AUDIO_die", "audios/audio_die.wav")
		this.register("AUDIO_pass", "audios/audio_point.wav")
	}
}

const sound: Sound = new Sound()
export { sound }