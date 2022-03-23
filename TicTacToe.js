let input = document.getElementById('playerName')
let cardBody = document.getElementById('cardBody')
let alerts = document.getElementById('alerts')
let gameMatrix = []

const player1 = {
    name : '',
    putSign(section) {
        completeSectionAndGameMatrix(section, player1.name, 'X')
    }
}

const player2 = {
    name : '',
    putSign(section) {
        completeSectionAndGameMatrix(section, player2.name, '0')
    }
}

for (let i = 0; i < 3; ++i) {
    gameMatrix[i] = []
}

function createRestartButton () {
    cardBody.innerHTML = '<button type="button" class="btn btn-secondary" onclick="restartGame()">Restart</button>'
}

function restartGame () {
    location.reload()
}

function completeSectionAndGameMatrix (section, name, signature) {
    document.getElementById(`${section}`).innerHTML = signature
    const i = (section / 10).toFixed()
    const j = (section % 10).toFixed()
    gameMatrix[i][j] = name
}

function checkWinner () {
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

let iterationsSignatures = 0

function addPlayer () {
    alerts.innerHTML = ''
    if (input.value !== '') {
        if (!iterationsSignatures) {
            player1.name = input.value
            input.value = 'Second player'
            ++iterationsSignatures
        } else {
            player2.name = input.value
            input.value = ''
            whoseTurn(player1.name)
        }
    } else {
        alerts.innerHTML = '<div class="alert alert-warning" role="alert">Enter a valid name!\n</div>'
    }
}

function whoseTurn (name) {
    cardBody.innerHTML = `<h5>${name} turn</h5>`
}

function sectionWasNotSelected (section) {
    return gameMatrix[(section / 10).toFixed()][(section % 10).toFixed()] === undefined;
}

function putSignPlayer (section) {
    alerts.innerHTML = ''
    if (player1.name !== '' && player2.name !== '') {
        if (sectionWasNotSelected(section)) {
            if (iterationsSignatures % 2) {
                whoseTurn(player2.name)
                player1.putSign(section)
                if (checkWinner()) {
                    alerts.innerHTML = `<div class="alert alert-success" role="alert">${checkWinner()} Won!</div>`
                    createRestartButton()
                } else if (iterationsSignatures >= 9) {
                    alerts.innerHTML = '<div class="alert alert-primary" role="alert">Draw!\n</div>'
                    createRestartButton()
                }
                ++iterationsSignatures
            } else {
                whoseTurn(player1.name)
                player2.putSign(section)
                if (checkWinner()) {
                    alerts.innerHTML = `<div class="alert alert-success" role="alert">${checkWinner()} Won!</div>`
                    createRestartButton()
                } else if (iterationsSignatures >= 9) {
                    alerts.innerHTML = '<div class="alert alert-primary" role="alert">Draw!\n</div>'
                    createRestartButton()
                }
                ++iterationsSignatures
            }
        } else {
            alerts.innerHTML = '<div class="alert alert-warning" role="alert">Is already selected, I suggest you select another one!\n</div>'
        }
    } else {
        alerts.innerHTML = '<div class="alert alert-warning" role="alert">First enter you name or click on submit!\n</div>'
    }
}

input.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById('submit').click();
    }
});
