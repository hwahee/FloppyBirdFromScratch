import { canvas, ctx, DEBUG, deg, dpf, rad } from "../game/Global.js"
import { mouse } from "../system/Mouse.js"
import { Coor, Hittable } from "./Objects.js"

class Target extends Hittable {
	private r: number
	private dy: number = 0
	constructor(x = canvas.width / 2, y = canvas.height / 2, speed = 6, dir = 0, r = 10) {
		super(x, y, speed, dir)
		this.r = r
		this.setHitbox(0, 0, { r: 10 }, this)
	}
	getR() { return this.r }
	init(x = canvas.width / 2, y = canvas.height / 2) {
		this.coor = new Coor(x, y)
		this.dy=0
	}
	jump() {
		this.dy = -10
	}
	teleport(x: number, y: number) {
		this.coor.x = x, this.coor.y = y
	}
	move() {
		if (DEBUG.TARGET_FOLLOWS_MOUSE) { }
		else {
			this.dy += 1
			if (canvas.height < this.coor.y + this.dy) {
				this.dy = -this.dy / 2
			}
			this.coor.y += this.dy
		}
	}
	update() {
		this.move()
		this.updateHitbox()
	}
	draw() {
		ctx.beginPath()
		ctx.arc(this.coor.x, this.coor.y, this.r, 0, 2 * Math.PI, false)
		ctx.fillStyle = 'coral'
		ctx.fill()
		ctx.closePath()
		for (let hbox of this.getHitbox()) {
			hbox.draw()
		}
	}
}

const target: Target = new Target()
export { Target, target }