const NC = 5,
    NR = 5
const ch = window.innerHeight,
    cw = window.innerWidth
const TILE_H = ch / NC
const TILE_W = cw / NR

const canvas = document.getElementById('canvas')
canvas.height = ch
canvas.width = cw

const ctx = canvas.getContext('2d')

const m = []

main()

function main() {
    initMatrix()
}

function initMatrix() {
    for (let i = 0; i < NR; i++) {
        let c = []
        for (let j = 0; j < NC; j++) {
            c.push(j)
        }
        m.push(c)
    }

    for (let i = 0; i < m.length; i++) {
        const element = m[i]
        shuffle(element)
    }

    // draw on canvas
    for (let i = 0; i < NR; i++) {
        for (let j = 0; j < NC; j++) {
            square(j * TILE_W, i * TILE_H, TILE_W, TILE_H, color(m[i][j]))
        }
    }
}

function square(x1, y1, width, height, col) {
    ctx.fillStyle = col
    ctx.fillRect(x1, y1, width, height)
}

function color(i) {
    let c = (i * 360) / NC
    return `hsl(${c},100%, 30%)`
}

function randomColor() {
    let c = Math.ceil(Math.random() * 360)
    return `hsl(${c},100%, 30%)`
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
}
