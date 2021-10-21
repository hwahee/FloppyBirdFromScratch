import { canvas, ctx, SCROLL_SPEED } from "../game/Global.js"
import { Hittable } from "./Objects.js"

class Ground extends Hittable{
	private w:number
	private h:number
	constructor(){
		super(canvas.width/2, canvas.height-20, SCROLL_SPEED, 180)
		this.img[0].src="images/grass.png"

		this.w=canvas.width*2
		this.h=40
		this.setHitbox(0, 0, {w:this.w, h:this.h}, this)
		
	}
	move(){
		super.move()
		if(this.coor.x < 0){
			this.coor.x=canvas.width
		}
	}
	update(){
		this.move()
		this.updateHitbox()
	}
	draw(){
		ctx.beginPath()
		ctx.save()
		ctx.translate(this.coor.x-this.w/2,this.coor.y-this.h/2)
		ctx.rect(0, 0, this.w, this.h)
		ctx.fillStyle=ctx.createPattern(this.img[0], "repeat") as CanvasPattern
		ctx.fill()
		ctx.restore()
		ctx.closePath()
		this.hitbox.map((i)=>{i.draw()})
	}
}

const ground:Ground=new Ground()
export {ground}