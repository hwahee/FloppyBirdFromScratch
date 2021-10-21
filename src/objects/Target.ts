import { canvas, DEBUG } from "../game/Global.js"
import { Coor, Hittable } from "./Objects.js"

class Target extends Hittable {
	private r: number
	private dy: number = 0
	constructor(x = canvas.width / 2, y = canvas.height / 2, speed = 6, dir = 0, r = 11) {
		super(x, y, speed, dir)
		this.r = r
		this.setHitbox(0, 0, { r: 10 }, this)
		this.img=[new Image(), new Image(), new Image()]
		this.img[0].src=`images/redbird0.png`
		this.img[1].src=`images/redbird1.png`
		this.img[2].src=`images/redbird2.png`

		setInterval(()=>{
			this.img_cursor=(this.img_cursor+1)%this.img.length
		}, 333)
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
			//중력 작용
			this.dy += 1
			//바닥에 닿을 때 튕기기
			// if (canvas.height < this.coor.y + this.dy) {
			// 	this.dy = -this.dy / 2
			// }
			this.coor.y += this.dy

			//떨어질 때 아래를 향하기
			if(10 < this.dy){
				this.dir=45
			}
			else{
				this.dir=0
			}
		}
	}
	update() {
		this.move()
		this.updateHitbox()
	}
	// draw(){
	// 	ctx.beginPath()
	// 	ctx.save()
	// 	ctx.translate(this.coor.x, this.coor.y)
	// 	ctx.rotate(rad(this.dir))
	// 	ctx.drawImage(this.img[this.img_cursor], -this.img[this.img_cursor].naturalWidth / 2, -this.img[this.img_cursor].naturalHeight / 2, this.img[this.img_cursor].naturalWidth, this.img[this.img_cursor].naturalHeight)
	// 	ctx.restore()
	// 	ctx.closePath()
	// }
}

const target: Target = new Target()
export { Target, target }