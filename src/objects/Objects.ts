import { ctx, canvas, dpf, rad, distCoor2Coor, DEBUG } from '../game/Global.js'

class Coor {
	constructor(public x: number, public y: number) {
		this.x = x
		this.y = y
	}
}
//hitbox
class Hitbox {
	private master: Hittable
	private coor_relative: Coor
	protected coor: Coor
	constructor(x: number, y: number, master: Hittable, relX: number = 0, relY: number = 0) {
		this.master = master
		this.coor_relative = new Coor(relX, relY)
		this.coor = new Coor(master.coor.x + x, master.coor.y + y)
	}
	getType() { return "common" }
	getCoor() { return this.coor }
	setRelativeCoor(relX: number = 0, relY: number = 0) {
		this.coor_relative = new Coor(relX, relY)
		this.coor = new Coor(this.master.coor.x + this.coor.x, this.master.coor.y + this.coor.y)
	}
	update() {
		const h = distCoor2Coor(this.coor_relative, new Coor(0, 0))
		this.coor.x = this.master.coor.x + -h * Math.cos(rad(this.master.getDir()))
		this.coor.y = this.master.coor.y + -h * Math.sin(rad(this.master.getDir()))
	}
	isHitWith(other: Hitbox) {
		return false
	}
	isHitWithCircleRect(c: HitboxCircle, r: HitboxRect) {
		const [cx, cy, cr, rx, ry, rw, rh] = [c.coor.x, c.coor.y, c.getR(), r.coor.x, r.coor.y, r.getSize().w, r.getSize().h]
		let testX = cx
		let testY = cy

		// which edge is closest?
		if (cx < rx - rw / 2) testX = rx - rw / 2      // test left edge
		else if (cx > rx + rw / 2) testX = rx + rw / 2   // right edge
		if (cy < ry - rh / 2) testY = ry - rh / 2      // top edge
		else if (cy > ry + rh / 2) testY = ry + rh / 2   // bottom edge

		// get distance from closest edges
		const distX = cx - testX
		const distY = cy - testY
		const distance = Math.sqrt((distX * distX) + (distY * distY))

		// if the distance is less than the radius, collision!
		if (distance <= cr) {
			return true
		}
		return false
	}
	draw() { }
}
class HitboxCircle extends Hitbox {
	private r: number
	constructor(x: number, y: number, r: number, master: Hittable, relX: number = 0, relY: number = 0) {
		super(x, y, master, relX, relY)
		this.r = r
	}
	getType() { return "circle" }
	getR() { return this.r }
	isHitWith(other: HitboxRect): boolean
	isHitWith(other: HitboxCircle): boolean
	isHitWith(other: any) {
		if (other.getType() === this.getType()) {
			if (other.r + this.r > Math.abs(this.coor.x - other.coor.x) && other.r + this.r > Math.abs(this.coor.y - other.coor.y)) {
				if (other.r + this.r > distCoor2Coor(other.coor, this.coor)) {
					return true
				}
			}
			return false
		}
		else {
			return super.isHitWithCircleRect(this, other)
		}
	}
	draw() {
		if (DEBUG.SHOW_HITBOX) {
			ctx.beginPath()
			ctx.arc(this.coor.x, this.coor.y, this.r, 0, 2 * Math.PI, false)
			ctx.strokeStyle = 'red'
			ctx.stroke()
			ctx.closePath()
			ctx.beginPath()
			ctx.arc(this.coor.x, this.coor.y, this.r + 1, 0, 2 * Math.PI, false)
			ctx.strokeStyle = 'blue'
			ctx.stroke()
			ctx.closePath()
		}
	}
}
class HitboxRect extends Hitbox {
	private w: number
	private h: number
	constructor(x: number, y: number, w: number, h: number, master: Hittable, relX: number = 0, relY: number = 0) {
		super(x, y, master, relX, relY)
		this.w = w
		this.h = h
	}
	getType() { return "rect" }
	getSize() { return { w: this.w, h: this.h } }
	isHitWith(other: HitboxRect): boolean
	isHitWith(other: HitboxCircle): boolean
	isHitWith(other: any) {
		if (other.getType() === this.getType()) {
			if (other.coor.x + other.w / 2 < this.coor.x - this.w && this.coor.x + this.w < other.coor.x - other.w) {
				if (other.coor.y + other.h / 2 < this.coor.y - this.h && this.coor.y + this.h < other.coor.y - other.h) {
					return true
				}
			}
			return false
		}
		else {
			return super.isHitWithCircleRect(other, this)
		}
	}
	draw() {
		if (DEBUG.SHOW_HITBOX) {
			ctx.beginPath()
			ctx.rect(this.coor.x - this.w / 2, this.coor.y - this.h / 2, this.w, this.h)
			ctx.strokeStyle = 'red'
			ctx.stroke()
			ctx.closePath()
			ctx.beginPath()

			ctx.rect(this.coor.x - (this.w + 1) / 2, this.coor.y - (this.h + 1) / 2, (this.w + 1), (this.h + 1))
			ctx.strokeStyle = 'blue'
			ctx.stroke()
			ctx.closePath()
		}
	}
}

//objects class
class Objects {
	public coor: Coor
	constructor(x: number, y: number) {
		this.coor = new Coor(x, y)
	}
}

//movable
class Movable extends Objects {
	protected speed: number
	protected dir: number
	protected img: HTMLImageElement[]=[]
	protected img_cursor:number=-1
	constructor(x: number, y: number, speed: number, dir: number) {
		super(x, y)
		this.speed = speed
		this.dir = dir
		this.img.push(new Image())
		this.img[0].src = "images/default_image.png"
		this.img_cursor=0
	}
	setSpeed(val: number) { this.speed = val }
	getSpeed() { return this.speed }
	getDir() { return this.dir }
	move() {
		if (this.speed > 100) this.speed = 100

		this.coor.x += dpf(this.speed) * Math.cos(rad(this.dir))
		this.coor.y += dpf(this.speed) * Math.sin(rad(this.dir))

		this.coor.x = (this.coor.x + canvas.width) % canvas.width
		this.coor.y = (this.coor.y + canvas.height) % canvas.height
	}
	moveTo(dest: Coor) {
		this.coor.x = dest.x
		this.coor.y = dest.y
	}
	draw() {
		ctx.beginPath()
		ctx.save()
		ctx.translate(this.coor.x, this.coor.y)
		ctx.rotate(rad(this.dir))
		ctx.drawImage(this.img[this.img_cursor], -this.img[this.img_cursor].naturalWidth / 2, -this.img[this.img_cursor].naturalHeight / 2, this.img[this.img_cursor].naturalWidth, this.img[this.img_cursor].naturalHeight)
		ctx.restore()
		ctx.closePath()
	}
}

//hittable
class Hittable extends Movable {
	protected hitbox: Hitbox[]
	constructor(x: number, y: number, speed: number, dir: number) {
		super(x, y, speed, dir)
		this.hitbox = []
	}
	getHitbox() { return this.hitbox }
	isHitWith(other: Hittable) {
		for (let j of this.hitbox) {
			for (let k of other.hitbox) {
				if (j.isHitWith(k)) {
					return true
				}
			}
		}
		return false
	}
	updateHitbox() {
		for (let hbox of this.hitbox) {
			hbox.update()
		}
	}
	setHitbox(x: number, y: number, props: any, master: Hittable, relX: number = 0, relY: number = 0) {
		if (props.r)
			this.hitbox[this.hitbox.length] = new HitboxCircle(x, y, props.r, master, relX, relY)
		else if (props.w) {
			this.hitbox[this.hitbox.length] = new HitboxRect(x, y, props.w, props.h, master, relX, relY)
		}
	}
	drawHitbox() {
		for (let hbox of this.hitbox) {
			hbox.draw()
		}
	}
	draw(){
		super.draw()
		this.hitbox.forEach((i)=>{i.draw()})
	}
}

export { Coor, Hittable }