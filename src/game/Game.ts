import { target } from '../objects/Target.js'
import { canvas, ctx, DEBUG, frame } from './Global.js'
import { eventHandler } from '../system/EventHandler.js'
import { timer } from './Timer.js'
import { gameStatus } from './GameStatus.js'
import { wallList } from '../objects/Wall.js'
import { mouse } from '../system/Mouse.js'

let status_pause = false

document.getElementById("myCanvas")?.addEventListener("click", (e) => {
    if (gameStatus.getStatus() === 1) {
        if (DEBUG.TARGET_FOLLOWS_MOUSE)
            target.teleport(e.x, e.y)
        else
            target.jump()
    }
    else if (gameStatus.getStatus() === 0) {
        gameStatus.setStatus(1)
    }
    else if (gameStatus.getStatus() === 3) {
        target.init()
        timer.init()
        wallList.init()
        gameStatus.setStatus(0)
    }
})

function update() {
    if (!status_pause) {
        target.update()
        wallList.update()
    }
}
function draw() {
    if (!status_pause) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        target.draw()
        wallList.draw()
    }
}
function collision() {
    if(wallList.isHitWith(target)){
        gameStatus.setStatus(3)
    }
}

function main() {
    eventHandler.handleEvent()

    if (gameStatus.getStatus() === 0) {        //init
        gameStatus.drawInit()
    }
    else if (gameStatus.getStatus() === 1) {        //playing
        update()
        collision()
        draw()
    }
    else if (gameStatus.getStatus() === 2) {        //pause

    }
    else if (gameStatus.getStatus() === 3) {        //gameover
        gameStatus.drawGameover(Math.floor(timer.now() / 1000), wallList.getWallDodged())
    }
}

timer.start()
setInterval(main, frame)