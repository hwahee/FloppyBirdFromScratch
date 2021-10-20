import { Coor } from '../objects/Objects.js'

class Mouse {
    private coor: Coor
    private down: boolean
    private ch: any
    private selected: any
    constructor() {
        this.coor = new Coor(0, 0)
        this.down = false
        this.ch = undefined
        this.selected = undefined
    }
    getCoor() { return this.coor }
    update(event: any) {
        this.coor.x = event.offsetX
        this.coor.y = event.offsetY
    }
    clicked() {
        this.down = true
    }
    unclicked() {
        this.down = false
        this.selected = undefined
    }
}

const mouse: Mouse = new Mouse()
export { mouse }