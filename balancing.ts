enum Difficulty {
    //% block="Jednoduchá"
    Easy = 100,
    //% block="Normální"
    Normal = 50,
    //% block="Těžká"
    Hard = 25,
}

//% weight=100 color=#1d1f1d icon="\uf24e" block="Balancování"
namespace balancing {

    let boundary = Difficulty.Normal
    let methodLock = false
    let currentCoordinates: number[] = []

    let x = 0
    let y = 0
    let previousX = 0
    let previousY = 0

    /**
    * Nastaví obtížnost hry
    * @difficulty Obtížnost hry
    */
    //% block="Nastav obtížnost na %difficulty"
    export function setDifficulty(difficulty: Difficulty): void {
        boundary = difficulty
    }

    /**
    * Aktualizuje LEDky
    */
    //% block="Aktualizuj"
    export function tick(): void {
        if (x != previousX || y != previousY) {
            led.unplot(previousX, previousY)
            led.plot(x, y)
            previousX = x
            previousY = y
        }
    }

    /**
    * Vrátí aktuální souřadnice
    */
    //% block="Souřadnice"
    export function coordinates(): number[] {
        currentCoordinates[0] = x
        currentCoordinates[1] = y
        return currentCoordinates
    }

    /**
    * Zkontroluje, jestli vejce nespadlo
    * @akce Bloky, které se provedou, pokud dojde k pádu vejce
    */
    //% block="Při pádu vejce"
    export function onEggDrop(action: () => void) {
        const eventId = 111 + Math.randomRange(0, 100);

        control.onEvent(eventId, 0, function () {
            control.inBackground(() => {
                methodLock = true
                action()
                methodLock = false
            })
        })

        control.inBackground(() => {
            while (true) {
                if (methodLock == false && (x == 0 || x == 4 || y == 0 || y == 4)) {
                    control.raiseEvent(eventId, 1)
                }
                basic.pause(20)
            }
        })
    }

    control.inBackground(() => {
        while (true) {
            x = Math.floor(Math.map(input.rotation(Rotation.Roll), -180 + (180 - boundary), 180 - (180 - boundary), -1, 5) / 0.8)
            y = Math.floor(Math.map(input.rotation(Rotation.Pitch), -180 + (180 - boundary), 180 - (180 - boundary), -1, 5) / 0.8)
            basic.pause(20)
        }
    })
}