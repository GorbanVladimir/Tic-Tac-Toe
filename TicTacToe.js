let input = document.getElementById('playerName')
let cardBody = document.getElementById('cardBody')
let alerts = document.getElementById('alerts')
let gameMatrix = []

for (let i = 0; i < 3; ++i) {
    gameMatrix[i] = []
}

class person {
    constructor(name, signature) {
        this.name = name
        this.signature = signature
    }
}

let iterationsSignatures = 0
let player1, player2

function submitPlayer() {
    printMessage('', '')
    if (input.value !== '') {
        if (!iterationsSignatures) {
            player1 = new person(input.value, 'X')
            input.value = 'Second player'
            ++iterationsSignatures
        } else {
            player2 = new person(input.value, '0')
            input.value = ''
            whoseTurn(player1.name)
        }
    } else {
        printMessage('warning', 'Enter a valid name')
    }
}

function putSignPlayer(section) {
    printMessage('', '')
    if (sectionWasNotSelected(section)) {
        let curentPlayer
        if (iterationsSignatures % 2) {
            curentPlayer = player1
            whoseTurn(player2.name)
        } else {
            curentPlayer = player2
            whoseTurn(player1.name)
        }
        completeSectionAndGameMatrix(section, curentPlayer.name, curentPlayer.signature)
        if (checkWinner()) {
            printMessage('success', `${checkWinner()} Won!`)
            createRestartButton()
        } else if (iterationsSignatures >= 9) {
            printMessage('primary', 'Draw!')
            createRestartButton()
        }
        ++iterationsSignatures
    } else {
        printMessage('warning', `Is already selected, I suggest you select another one!`)
    }
}

function checkWinner() {
    for (let i = 0; i < 3; ++i) {
        if (gameMatrix[i][0] === gameMatrix[i][1] && gameMatrix[i][1] === gameMatrix[i][2]) {
            return  gameMatrix[i][0]
        }
        if (gameMatrix[0][i] === gameMatrix[1][i] && gameMatrix[1][i] === gameMatrix[2][i]) {
            return gameMatrix[0][i]
        }
    }
    if (gameMatrix[0][0] === gameMatrix[1][1] && gameMatrix[1][1] === gameMatrix[2][2]) {
        return gameMatrix[0][0]
    }
    if (gameMatrix[0][2] === gameMatrix[1][1] && gameMatrix[1][1] === gameMatrix[2][0]) {
        return gameMatrix[0][2]
    }
    return false
}

function completeSectionAndGameMatrix(section, name, signature) {
    document.getElementById(`${section}`).innerHTML = signature
    const i = (section / 10).toFixed()
    const j = (section % 10).toFixed()
    gameMatrix[i][j] = name
}

function whoseTurn(name) {
    cardBody.innerHTML = `<h5>${name} turn</h5>`
}

function sectionWasNotSelected(section) {
    return gameMatrix[(section / 10).toFixed()][(section % 10).toFixed()] === undefined
}

function play() {
    let audio = document.getElementById('audio')
    audio.play()
}

function printMessage(alertType, message) {
    alerts.innerHTML = `<div class="alert alert-${alertType}" role="alert">${message}</div>`
}

function createRestartButton() {
    cardBody.innerHTML = '<button type="button" class="btn btn-secondary" onclick="restartGame()">Restart</button>'
}

function restartGame() {
    location.reload()
}

input.addEventListener('keyup', function(event) {
    event.preventDefault()
    if (event.keyCode === 13) {
        document.getElementById('submit').click()
    }
})