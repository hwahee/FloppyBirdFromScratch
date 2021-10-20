import { canvas, ctx } from "./Global.js"

class GameStatus {
	static status: string[] = ["init", "playing", "pause", "gameover"]
	private status_now: number = 0
	private drawOneTime: boolean = true	//init, pause, gameover 시 최초 1회만 그리게 하기 위해
	getStatus() { return this.status_now }
	setStatus(s: number) {
		this.status_now = s
		this.drawOneTime = true
	}
	drawInit() {
		if (this.drawOneTime) {
			this.drawOneTime = false
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.beginPath()
			ctx.font = "20px Georgia"
			ctx.fillStyle = "gray"
			ctx.fillText("CLICK TO START", canvas.width / 2 - 70, canvas.height / 2)
			ctx.closePath()
		}
	}
	drawGameInfoOnPlay(score:number){
		ctx.beginPath();
		ctx.fillStyle = "gray"
		ctx.textAlign = "center";
		ctx.fillText(`SCORE: ${score}`, canvas.width / 2, 60);
		ctx.closePath();
	}
	drawGameover(final_score: number, final_missile_dodged: number) {
		if (this.drawOneTime) {
			this.drawOneTime = false
			ctx.beginPath()
			let offset = 0
			let offset_increase = 20
			ctx.textAlign = "center"
			ctx.fillStyle = "black"
			ctx.fillText("Game Over\n", canvas.width / 2, canvas.height / 2 + offset)
			offset += offset_increase
			ctx.fillText("", canvas.width / 2, canvas.height / 2 + offset)
			offset += offset_increase
			ctx.fillText("Time : " + final_score + "\n", canvas.width / 2, canvas.height / 2 + offset)
			offset += offset_increase
			ctx.fillText("Wall Passed : " + final_missile_dodged + "\n", canvas.width / 2, canvas.height / 2 + offset)
			offset += offset_increase
			ctx.closePath()
		}
	}
}
const gameStatus: GameStatus = new GameStatus()

export { gameStatus }