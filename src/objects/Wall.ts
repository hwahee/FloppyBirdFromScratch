import { canvas, ctx, randint, SCROLL_SPEED } from '../game/Global.js'
import { Hittable } from './Objects.js'

class Wall extends Hittable {
	protected w: number
	protected h: number
	private dx = -SCROLL_SPEED
	protected exist: boolean = true
	
	constructor(x: number, y: number, w: number, h: number) {
		super(x, y, 0, 0)
		this.w = w
		this.h = h
		this.setHitbox(0, 0, { w: this.w, h: this.h }, this)
	}
	isExist() { return this.exist }
	move() {
		this.coor.x += this.dx
	}
	parish() {
		if (!(-40 < this.coor.x && this.coor.x < canvas.width + 40 && -40 < this.coor.y && this.coor.y < canvas.height + 40)) {
			this.exist = false
		}
	}
	draw() {
		ctx.beginPath()
		ctx.rect(this.coor.x - this.w / 2, this.coor.y - this.h / 2, this.w, this.h)
		ctx.fillStyle = "yellowgreen"
		ctx.fill()
		ctx.closePath()
		this.hitbox.map((i) => { i.draw() })
	}
}
class WallWithHole extends Wall {
	private up: Wall
	private down: Wall
	constructor(x: number, y: number, w: number, h: number) {
		super(x, y, w, h)
		this.up = new Wall(x, (y - h / 2) / 2, w, y - h / 2)
		this.down = new Wall(x, y + h / 2 + (canvas.height - (y + h / 2)) / 2, w, canvas.height - (y + h / 2))
	}
	isHitWith(other: Hittable) {
		return this.up.isHitWith(other) || this.down.isHitWith(other)
	}
	move(){
		this.up.move()
		this.up.updateHitbox()
		this.down.move()
		this.down.updateHitbox()
	}
	parish(){
		this.up.parish()
		this.down.parish()
		if(!this.up.isExist() &&  !this.down.isExist()){
			this.exist=false
		}
	}
	draw() {
		this.up.draw()
		this.down.draw()
	}
}

class WallList {
	private list: Wall[] = []
	private wall_dodged:number=0
	constructor() {
		this.init()
	}
	getWallDodged(){return this.wall_dodged}
	init(){
		this.list=[]
		this.addWall()
		this.wall_dodged=0
	}
	createWall(x:number=canvas.width,y:number= randint(20, canvas.height-20),w:number= 40,h:number= 100){
		return new WallWithHole(x, y, w, h)
	}
	addWall(x?: number, y?: number, w?: number, h?: number) {
		this.list.push(this.createWall(x, y, w, h))
	}
	isHitWith(other: Hittable) {
		for (let i of this.list) {
			if (i.isHitWith(other)) {
				return true
			}
		}
		return false
	}
	move(){
		this.list.map((i) => { 
			i.move() 
		})
	}
	parish(){
		this.list.map((i) => { i.parish() })
	}
	update(){
		this.move()
		this.parish()
		for(let i=0;i<this.list.length;i++){
			if(!this.list[i].isExist()){
				this.wall_dodged++
				this.list[i]=this.createWall()
			}
		}
	}
	draw() {
		this.list.map((i) => { i.draw() })
	}
}

const wallList = new WallList()
export { wallList }