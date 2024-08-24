const NC = 50,
    NR = 50
const ch = window.innerHeight,
    cw = window.innerWidth
const TILE_H = ch / NC
const TILE_W = cw / NR

const canvas = document.getElementById("canvas")
canvas.height = ch
canvas.width = cw

const ctx = canvas.getContext("2d")
for (let i = 0; i < NR; i++) {
    for (let j = 0; j < NC; j++) {
        square(j * TILE_W, i * TILE_H, TILE_W, TILE_H, color(i))
    }
}

function square(x1, y1, width, height, col) {
    ctx.fillStyle = col
    ctx.fillRect(x1, y1, width, height)
}

function color(i) {
    let c = i * 360 / NC
    return `hsl(${c},100%, 30%)`
}

function randomColor() {
    let c = Math.ceil(Math.random() * 360)
    return `hsl(${c},100%, 30%)`
}
