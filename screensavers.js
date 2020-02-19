let working: boolean = true
let gesture : Gesture = Gesture.Shake

input.onGesture(Gesture.Shake, function () {
    gesture = Gesture.Shake
})

input.onGesture(Gesture.TiltLeft, function () {
    gesture = Gesture.TiltLeft
})

input.onGesture(Gesture.TiltRight, function () {
    gesture = Gesture.TiltRight
})

input.onGesture(Gesture.ThreeG, function () {
    gesture = Gesture.ThreeG
})

input.onGesture(Gesture.LogoDown, function () {
    gesture = Gesture.LogoDown
})

input.onButtonPressed(Button.A, function () {
    working = false
})

input.onButtonPressed(Button.B, function () {
    working = true
})

// if (working) {
//     basic.showString("Awake")
// } else {
//     basic.showString("Zzzzz")
// }

function randomNumber () {
    basic.showNumber(Math.randomRange(1, 9))
    basic.pause(1000)
}

function fireworks () {
    let x = Math.randomRange(0, 4)
    led.plot(x, 4)
    basic.pause(500)
    led.plot(x, 3)
    basic.pause(500)
    led.unplot(x, 4)
    led.plot(x, 2)
    basic.pause(500)
    led.unplot(x, 3)
    led.unplot(x, 2)
    led.plot(x - 1, 2)
    led.plot(x, 3)
    led.plot(x + 1, 2)
    led.plot(x, 1)
    basic.pause(500)
    led.unplot(x - 1, 2)
    led.unplot(x, 3)
    led.unplot(x + 1, 2)
    led.unplot(x, 1)
    led.plot(x - 2, 2)
    led.plot(x, 4)
    led.plot(x + 2, 2)
    led.plot(x, 0)
    led.plot(x - 1, 1)
    led.plot(x - 1, 3)
    led.plot(x + 1, 1)
    led.plot(x + 1, 3)
    basic.pause(500)
    led.unplot(x - 2, 2)
    led.unplot(x, 4)
    led.unplot(x + 2, 2)
    led.unplot(x, 0)
    led.unplot(x - 1, 1)
    led.unplot(x - 1, 3)
    led.unplot(x + 1, 1)
    led.unplot(x + 1, 3)
}

function rain() {
    let rain: Raindrop[] = []
    const NUM_DROPS: number = 10

    for (let i = 0; i < NUM_DROPS; i++) {
        let x: number
        let y: number
        if (Math.randomBoolean()) {
            x = 0
            y = Math.randomRange(0, 4)
        } else {
            x = Math.randomRange(0, 4)
            y = 0
        }
        let raindrop = new Raindrop(x, y, Math.randomRange(0, 4)) // x < 0 might clamp to 0
        raindrop.turnRight(45)
        rain.push(raindrop)
    }

    basic.forever(function () {
        for (let i = 0; i < NUM_DROPS; i++) {
            // Randomize the distance and x location of a sprite that is done falling.
            if (rain[i].y() >= 4) {
                rain[i].setDist(Math.randomRange(0, 4))
                let x: number
                let y: number
                if (Math.randomBoolean()) {
                    x = 0
                    y = Math.randomRange(0, 4)
                } else {
                    x = Math.randomRange(0, 4)
                    y = 0
                }
                rain[i].setX(x)
                rain[i].setY(y)
            } else {
                rain[i].fall()
            }
        }
    })
}

class Raindrop extends game.LedSprite {
    private distance: number
    private freq: number
    private brightLevels: number[]
    constructor(x: number, y: number, d: number) {
        super(x, y)
        this.distance = d
        this.freq = 0
        this.brightLevels = [240, 180, 60, 30, 1]
    }
    setDist(d: number) {
        this.distance = d
        this.freq = 0
    }
    fall() {
        this.setBrightness(this.brightLevels[this.distance - 1])
        if (this.freq == this.distance) {
            this.move(1)
        }
        this.freq = (this.freq + 1) % (this.distance + 1)
    }
}

function inAndOut () {
    for (let x = 0; x <= 4; x++) {
        led.plot(x, 0) //Plots each point at the designated area
        led.plot(0, 4 - x)
        led.plot(4 - x, 4)
        led.plot(4, x)
        led.plot(2, x)
        led.plot(2, 4 - x)
        led.plot(x, 2)
        led.plot(4 - x, 2)
        basic.pause(50)
        led.unplot(x, 0) //unplots each point at the same area as above, created aflashing effect
        led.unplot(4 - x, 4)
        led.unplot(0, 4 - x)
        led.unplot(4, x)
        led.unplot(2, x)
        led.unplot(2, 4 - x)
        led.unplot(x, 2)
        led.unplot(4 - x, 2)
        basic.pause(50)
    }
}

let direction: number = 0
let snakeX = 4
let snakeY = 0
let timing = 100

function spiral () {
    switch (direction) {
        case 0: right()
            break;
        case 1: down()
            break;
        case 2: left()
            break;
        case 3: up()
            break;
    }

}

function right() {
    for (let x = 0; x < 5; x++) {
        basic.pause(100)
        led.plotBrightness(x, snakeY, 255)
        if (led.point(x + 1, null)) {
            break;
        }
    }
    direction = 1
}

function down() {
    for (let y = 0; y < 5; y++) {
        basic.pause(100)
        led.plotBrightness(snakeX, y, 255)
        //if (led.point()) {

        //}
    }
    direction = 2
    snakeY = 4
}

function left() {
    for (let x = 5; x >= 0; x--) {
        basic.pause(100)
        led.plotBrightness(x, snakeY, 255)
    }
    direction = 3
    snakeX = 0
    snakeY = snakeY - 2
}

function up() {
    for (let y = 5; y >= 0; y--) {
        basic.pause(100)
        led.plotBrightness(snakeX, y, 255)
        if (led.point(0, 1)) {
            direction = 0
            snakeY = snakeY - 1
        }
    }
}

let gestArray : Gesture[] = [Gesture.Shake, Gesture.TiltLeft, Gesture.TiltRight, 
                             Gesture.ThreeG, Gesture.LogoDown]

let screenSavers = [randomNumber, fireworks, rain, inAndOut, spiral]

basic.forever(function () {
    if (working) {
        basic.showString("Awake!")
    }
    else {
        screenSavers[gestArray.indexOf(gesture)]()
    }

})
