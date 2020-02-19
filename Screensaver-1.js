// Basic awake-asleep
let working: boolean = true

input.onButtonPressed(Button.A, function () {
    working = false
})

input.onButtonPressed(Button.B, function () {
    working = true
})

basic.forever(function () {
    if (working) {
        basic.showString("Awake")
    } else {
        basic.showString("Zzzzz")
    }
})

// Random Number Gen Screensaver Start
if (!working) {
    input.onGesture(Gesture.Shake, function () {
        basic.forever(function () {
            basic.showNumber(Math.randomRange(1, 9))
            basic.pause(1000)
        })
    })
}
// Random Number Gen Screensaver End
