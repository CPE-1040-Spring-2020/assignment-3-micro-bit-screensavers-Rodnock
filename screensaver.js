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
    } else{
        basic.showString("Sleep")
    }
})
