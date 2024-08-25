const NC = 40,
    NR = 40
const ch = window.innerHeight,
    cw = window.innerWidth
const TILE_H = ch / NC
const TILE_W = cw / NR
const SPEED = 1000 / 60
let intervalId,
    sortingFinished,
    isSorting = false

const canvas = document.getElementById('canvas')
canvas.height = ch
canvas.width = cw

const ctx = canvas.getContext('2d')

let m = []
// this will contain sorting generator functions for each row
let rowSorters = []

main()

function main() {
    initMaterial()
    initMatrix()
    setTimeout(() => {
        startSort()
    }, 1000);
}

function startSort(sortBy = insertionSort) {
    if (sortingFinished.every((e) => e)) {
        initMatrix(sortBy)
    }
    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(() => draw(sortBy), SPEED)
}

function initMatrix(sorterFunc = insertionSort) {
    m = []
    rowSorters = []
    for (let i = 0; i < NR; i++) {
        let c = []
        for (let j = 0; j < NC; j++) {
            c.push(j)
        }
        m.push(c)
    }

    for (let i = 0; i < m.length; i++) {
        shuffle(m[i])
    }

    sortingFinished = new Array(NR).fill(false)

    for (let i = 0; i < m.length; i++) {
        rowSorters.push(sorterFunc(m[i]))
    }

    // draw on canvas
    for (let i = 0; i < NR; i++) {
        for (let j = 0; j < NC; j++) {
            square(j * TILE_W, i * TILE_H, TILE_W, TILE_H, color(m[i][j]))
        }
    }
}

function draw() {
    // console.log(123)
    if (sortingFinished.every((e) => e)) {
        clearInterval(intervalId)
        isSorting = false
        return
    } else {
        isSorting = true
    }
    ctx.clearRect(0, 0, cw, ch)
    for (let i = 0; i < m.length; i++) {
        if (rowSorters[i].next().done) {
            sortingFinished[i] = true
        }
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
    let c = (i * 300) / NC
    return `hsl(${c},100%, 50%)`
}

function randomColor() {
    let c = Math.ceil(Math.random() * 360)
    return `hsl(${c},100%, 50%)`
}

function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
}

function initMaterial() {
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.modal')
        var instances = M.Modal.init(elems)
    })
}

function* selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minI = i
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minI]) {
                minI = j
            }
            yield
        }
        // swap with max
        if (minI !== i) {
            ;[arr[i], arr[minI]] = [arr[minI], arr[i]]
        }
        yield
    }
    return arr
}

function* bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[i]) {
                ;[arr[j], arr[i]] = [arr[i], arr[j]]
            }
            yield
        }
        yield
    }
    return arr
}

function* insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let c = arr[i],
            index = i
        for (let j = i - 1; j > -1; j--) {
            if (arr[j] > c) {
                arr[j + 1] = arr[j]
                index = j
            } else {
                yield
                break
            }
            yield
        }
        arr[index] = c
        yield
    }
    return arr
}
