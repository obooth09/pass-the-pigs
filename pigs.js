//define global variables
let currentPlayer = 0
let handScore = 0
let playerScores = [0, 0, 0, 0]

//set up probability for roll button
let pig1Roll
let pig2Roll
let dot = 0.349
let noDot = 0.651
let razorback = 0.875
let trotter = 0.963
let snouter = 0.993
let leaningJowler = 1

//setup buttons/layout
disableButtons()
enableButtons()

//onclick functions
function handleClick(id) {
    if (id.includes('Pass')) {
        handlePass()
    } else if (id.includes('Roll')) {
        handleRoll()
    } else if (id == ('replayButton')) {
        location.reload()
    }
}

//defining all the functions within the onclick ones
function handlePass() {
    updateTotalScore()
    endTurn()
    changePlayer()
    disableButtons()
    enableButtons()
}

function handleRoll() {
    assignPigs()
    calculateScore()
    checkIfWin()
    document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: " + handScore
}

function rollPig() {
    let pigRolled = Math.random()
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

//return values for pig
function assignPigs() {
    pig1Roll = rollPig()
    pig2Roll = rollPig()
    document.getElementById("player" + currentPlayer + "Pig1").innerHTML = pig1Roll
    document.getElementById("player" + currentPlayer + "Pig2").innerHTML = pig2Roll
}

// assign scores to rolls
function calculateScore() {
    checkDoubles()
    // when no doubles, check individual pigs (this is pig 1)
    if ((pig1Roll == "dot" && pig2Roll == "no dot") || (pig1Roll == 'no dot' && pig2Roll == 'dot')) {
        pigOut()
    } else if (pig1Roll == 'razorback' || pig1Roll == 'trotter') {
        handScore = handScore + 5
    } else if (pig1Roll == 'snouter') {
        handScore = handScore + 10
    } else if (pig1Roll == 'leaning jowler') {
        handScore = handScore + 15
    } else if (pig1Roll == "dot" || pig1Roll == "noDot") {
        handScore = handScore + 0
    }
    // this is pig 2
    if (pig2Roll == 'razorback' || pig2Roll == 'trotter') {
        handScore = handScore + 5
    } else if (pig2Roll == 'snouter') {
        handScore = handScore + 10
    } else if (pig2Roll == 'leaning jowler') {
        handScore = handScore + 15
    } else if (pig2Roll == "dot" || pig2Roll == "noDot") {
        handScore = handScore + 0
    }
}

function checkIfWin() {
    if ((playerScores[currentPlayer] + handScore) >= 100) {
        endGame()
    }
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

function pigOut() {
    handScore = "PIG OUT!"
    //skip turn
    updateTotalScore()
    endTurn()
    changePlayer()
    disableButtons()
    enableButtons()
}

// for when the pass button is clicked
function updateTotalScore() {
    //display you pigged out if you did versus displaying your actual score
    if (handScore == "PIG OUT!") {
        handScore = 0
        document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: " + ("YOU PIGGED OUT!")
    } else {
        document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: " + (handScore - handScore)
    }
    //update internally
    playerScores[currentPlayer] = playerScores[currentPlayer] + handScore
    document.getElementById("player" + currentPlayer + "TotalScore").innerHTML = "Total Score: " + playerScores[currentPlayer]
}

function endTurn() {
    handScore = 0
    //change visuals to show your turn has ended
    let cardColor = document.getElementById("player" + currentPlayer)
    cardColor.classList.add('w3-light-gray')
    cardColor.classList.remove('w3-dark-gray')
    document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: " + handScore
}

function changePlayer() {
    currentPlayer++
    if (currentPlayer == 4) {
        currentPlayer = 0
    }
    //set colors for new player
    let cardColor = document.getElementById("player" + currentPlayer)
    cardColor.classList.add('w3-dark-gray')
    cardColor.classList.remove('w3-light-gray')
}

function endGame() {
    disableButtons()
    //set elements to look like they won
    let cardColor = document.getElementById("player" + currentPlayer)
    cardColor.classList.add('w3-yellow')
    cardColor.classList.remove('w3-dark-gray')
    //show replay button
    document.getElementById("replay").classList.remove("w3-hide")
}

// button functions
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