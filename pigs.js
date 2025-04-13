let currentPlayer = 0
disableButtons()
enableButtons()
playerScores = [0, 0, 0, 0]
function handleClick(id) {
    console.log(id)
    if (id.includes('Pass')) {

        updateTotalScore()
        endTurn()
        changePlayer()
        disableButtons()
        enableButtons()




        console.log('passed')
    } else if (id.includes('Roll')) {
        whenRolled()
        calculateScore()
    }
}
function endTurn() {

    let container = document.getElementById("player" + currentPlayer)
    container.classList.add('w3-light-gray')
    container.classList.remove('w3-dark-gray')
    currentPlayer = currentPlayer + 1
    if (currentPlayer == 4) {
        handScore = 0
        currentPlayer = 0
    }
    document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: " + handScore


}
function changePlayer() {
    let container = document.getElementById("player" + currentPlayer)
    container.classList.add('w3-dark-gray')
    container.classList.remove('w3-light-gray')


}


//set up for roll button
let dot = 0.349
let noDot = 0.651
let razorback = 0.875
let trotter = 0.963
let snouter = 0.993
let leaningJowler = 1

let pig1Roll
let pig2Roll

//return values for pig
function whenRolled() {
    currentPlayer = currentPlayer
    pig1Roll = rollPig()
    pig2Roll = rollPig()
    console.log(pig1Roll + " and " + pig2Roll)
    document.getElementById("player" + currentPlayer + "Pig1").innerHTML = pig1Roll
    document.getElementById("player" + currentPlayer + "Pig2").innerHTML = pig2Roll
}

function rollPig() {
    let pigRolled = Math.random()
    console.log(pigRolled)
    if (pigRolled <= dot) {
        return 'dot'
    } else if (pigRolled <= noDot) {
        return 'no dot'
    } else if (pigRolled <= razorback) {
        return 'razorback'
    } else if (pigRolled <= trotter) {
        return 'trotter'
    } else if (pigRolled <= snouter) {
        return 'snouter'
    } else if (pigRolled <= leaningJowler) {
        return 'leaning jowler'
    }


}
let handScore = 0

// if score returns 0, pigout
// assign scores
function calculateScore() {
    checkDoubles()
    if ((pig1Roll == "dot" && pig2Roll == "no dot") || (pig1Roll == 'no dot' && pig2Roll == 'dot')) {
        pigOut()
    }


    if (pig1Roll == 'razorback' || pig1Roll == 'trotter') {
        handScore = handScore + 5
    } else if (pig1Roll == 'snouter') {
        handScore = handScore + 10
    } else if (pig1Roll == 'leaning jowler') {
        handScore = handScore + 15
    } else if (pig1Roll == "dot" || pig1Roll == "noDot") {
        handScore = handScore + 0
    }

    if (pig2Roll == 'razorback' || pig2Roll == 'trotter') {
        handScore = handScore + 5
    } else if (pig2Roll == 'snouter') {
        handScore = handScore + 10
    } else if (pig2Roll == 'leaning jowler') {
        handScore = handScore + 15
    } else if (pig2Roll == "dot" || pig2Roll == "noDot") {
        handScore = handScore + 0
    }
    document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: " + handScore

    if ((playerScores[currentPlayer] + handScore) >= 10){
        endGame()
    }


}

function updateTotalScore() {
    playerScores[currentPlayer] += handScore
    console.log(playerScores)
    document.getElementById("player" + currentPlayer + "TotalScore").innerHTML = "Total Score: " + playerScores[currentPlayer]
    document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: " + (handScore - handScore)
    handScore = 0
}

function pigOut() {
    handScore = 0
    console.log('player' + currentPlayer + 'pigged out')
    console.log(document.getElementById("player" + currentPlayer + "HandScore"))
    document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: PIG OUT!"
    updateTotalScore()
    endTurn()
    changePlayer()
    disableButtons()
    enableButtons()
}

function checkDoubles() {
    if ((pig1Roll == 'dot' && pig2Roll == 'dot') || (pig1Roll == 'no dot' && pig2Roll == 'no dot')) {
        handScore = handScore + 1
    } else if ((pig1Roll == 'razorback' && pig2Roll == 'razorback') || (pig1Roll == 'trotter' && pig2Roll == 'trotter')) {
        handScore = handScore + 20
    } else if ((pig1Roll == 'leaning jowler' && pig2Roll == 'leaning jowler')) {
        handScore = handScore + 60
    }
}

function endGame() {
    console.log('GAME HAS ENDED')
    disableButtons()
    //set elements to look like they won
    let container = document.getElementById("player" + currentPlayer)
    container.classList.add('w3-yellow')
    container.classList.remove('w3-dark-gray')
    // //make replay button appear
    //document.getElementById("replayButton").style.display = 'none'


}

function disableButtons() {
    document.getElementById("player0RollButton").disabled = true
    document.getElementById("player0PassButton").disabled = true
    document.getElementById("player1RollButton").disabled = true
    document.getElementById("player1PassButton").disabled = true
    document.getElementById("player2RollButton").disabled = true
    document.getElementById("player2PassButton").disabled = true
    document.getElementById("player3RollButton").disabled = true
    document.getElementById("player3PassButton").disabled = true
}

function enableButtons() {
    document.getElementById("player" + currentPlayer + "RollButton").disabled = false
    document.getElementById("player" + currentPlayer + "PassButton").disabled = false
}