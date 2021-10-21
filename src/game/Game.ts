import { target } from '../objects/Target.js'
import { canvas, ctx, DEBUG, frame } from './Global.js'
import { eventHandler } from '../system/EventHandler.js'
import { timer } from './Timer.js'
import { gameStatus } from './GameStatus.js'
import { wallList } from '../objects/Wall.js'
import { ground } from '../objects/Ground.js'
import { MessageDelivery } from '../system/MessageInteraction.js'
import { keyboard } from '../system/Keyboard.js'
import { sound } from "../system/Sound.js"

//키와 마우스 입력 시의 동작 등록 
const MD: MessageDelivery = new MessageDelivery()
const inputHandler = (data: any) => {
    if (gameStatus.getStatus() === 1) {
        if (DEBUG.TARGET_FOLLOWS_MOUSE && data.x !== undefined)
            target.teleport(data.x, data.y)
        else {
            MD.deliver("AUDIO_jump")
            target.jump()
        }
    }
    else if (gameStatus.getStatus() === 0) {
        gameStatus.setStatus(1)
        timer.start()
    }
    else if (gameStatus.getStatus() === 3) {
        target.init()
        timer.init()
        wallList.init()
        gameStatus.setStatus(0)
    }
}
keyboard.init()
MD.setAction("keySpace", inputHandler)
document.getElementById("myCanvas")?.addEventListener("click", inputHandler)
sound.registerPrepared()

function update() {
    if (gameStatus.getStatus() !== 2) {
        ground.update()
        target.update()
        wallList.update()
    }
}
function draw() {
    if (gameStatus.getStatus() !== 2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        target.draw()
        wallList.draw()
        ground.draw()
        gameStatus.drawGameInfoOnPlay(wallList.getWallPassed())
    }
}
function collision() {
    if (wallList.isHitWith(target) || ground.isHitWith(target)) {
        MD.deliver("AUDIO_die")
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
        gameStatus.drawGameover(Math.floor(timer.now() / 1000), wallList.getWallPassed())
    }
}
setInterval(main, frame)