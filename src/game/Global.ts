import { Coor } from "../objects/Objects"

const canvas: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D

const standard_frame: number = 25//term given as millisecond, DON'T CHANGE
const frame = 50
const fps = 1000 / frame
const ratio = frame / standard_frame

const SCROLL_SPEED = 6

function dpf(n: number) { return n }//distance per frame
function rad(n: number) { return n * Math.PI / 180 }
function deg(n: number) { return n / Math.PI * 180 }
function distCoor2Coor(a: Coor, b: Coor) {
	const cx: number = b.x - a.x
	const cy: number = b.y - a.y
	return Math.sqrt(cx * cx + cy * cy)
}

//drawings
function drawLine(x1: number, y1: number, x2: number, y2: number, thickness: number, color: string) {
	let degree
	if (x1 < x2) {
		degree = Math.atan((y2 - y1) / (x2 - x1))
	}
	else if (x1 > x2) {
		degree = Math.PI + Math.atan((y2 - y1) / (x2 - x1))
	}
	else {
		if (y1 < y2)
			degree = 90
		else if (y1 > y2)
			degree = 270
		else
			degree = 0//p1==p2
	}

	ctx.save()
	ctx.beginPath()
	ctx.translate(x1, y1)
	ctx.rotate(degree)
	ctx.rect(0, 0, Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)), thickness / 2)
	ctx.rect(0, 0, Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)), -thickness / 2)
	ctx.fillStyle = color
	ctx.fill()
	ctx.closePath()
	ctx.restore()
}
function drawEllipseByCenter(cx: number, cy: number, w: number, h: number) {
	drawEllipse(cx - w / 2.0, cy - h / 2.0, w, h)
}
function drawEllipse(x: number, y: number, w: number, h: number) {
	let kappa = .5522848,
		ox = (w / 2) * kappa, // control point offset horizontal
		oy = (h / 2) * kappa, // control point offset vertical
		xe = x + w,           // x-end
		ye = y + h,           // y-end
		xm = x + w / 2,       // x-middle
		ym = y + h / 2       // y-middle

	ctx.beginPath()
	ctx.moveTo(x, ym)
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
	//ctx.closePath() // not used correctly, see comments (use to close off open path)
	ctx.stroke()
}
//random integer generator
function randint(min: number, max?: number) {
	if (max == undefined) {
		max = min
		min = 0
	}
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function randColor(transparency: number = 1): string {
	return `rgba(${randint(255)},${randint(255)},${randint(255)},${transparency})`
}

const DEBUG = { 
	"TARGET_FOLLOWS_MOUSE": false,
	"SHOW_HITBOX":false
 }

export { canvas, ctx, frame, fps, ratio, SCROLL_SPEED, dpf, rad, deg, distCoor2Coor, drawLine, drawEllipseByCenter, randint, randColor, DEBUG }