# Balancování

## Namespace
```
balancing
```
## Popis
Simulace hry „vejce na lžíci“.
 
## Metody
#### Nastav obtížnost na %difficulty
```
function setDifficulty(difficulty: Difficulty): void
```
- Nastaví obtížnost hry
- Parametry:
    - obtiznost (enum)
- Bez návratové hodnoty

#### Aktualizuj
```
function tick(): void
```
- Aktualizuje LEDky
- Bez parametrů
- Bez návratové hodnoty

#### Souřadnice
```
function coordinates(): number[]
```
- Vrátí aktuální souřadnice
- Bez parametrů
- Návratová hodnota: pole souřadnic (number[])
 
#### Při pádu vejce
```
function onEggDrop(action: () => void)
```
- Zkontroluje, jestli vejce nespadlo
- Parametry:
    - metoda
- Bez návratové hodnoty


## Enumy
```
enum Difficulty {
    Easy = 100,
    Normal = 50,
    Hard = 25,
}
```

## Příklady

### Hra s automatickou detekcí „spadnutí vejce“

#### Bloky

![Příklad hlasovače](https://github.com/SmutnyJan/pxt-spoon-balancing-extension/blob/master/images/easyexample.png)

#### Kód

```
balancing.onEggDrop(function () {
    if (jeHraSpustena) {
        jeHraSpustena = false
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
})
input.onButtonPressed(Button.A, function () {
    jeHraSpustena = !(jeHraSpustena)
})
let jeHraSpustena = false
balancing.setDifficulty(Difficulty.Easy)
basic.forever(function () {
    if (jeHraSpustena) {
        balancing.tick()
    }
})
```

### Hra s detekcí podle souřadnic

#### Bloky
![Těžký příklad](https://github.com/SmutnyJan/pxt-spoon-balancing-extension/blob/master/images/hardexample.png)

#### Kód
```
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    jeHraSpustena = !(jeHraSpustena)
})
let souradnice: number[] = []
let jeHraSpustena = false
balancing.setDifficulty(Difficulty.Normal)
basic.forever(function () {
    if (jeHraSpustena) {
        balancing.tick()
        souradnice = balancing.coordinates()
    }
    if (jeHraSpustena && (souradnice[0] == 0 || souradnice[0] == 4 || souradnice[1] == 0 || souradnice[1] == 4)) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            # # # # #
            # . . . #
            `)
        music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        jeHraSpustena = false
    }
})
```
