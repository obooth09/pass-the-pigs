let currentPlayer = 0
let score = 0
function handleClick(id) {
    console.log(id)
    if (id.includes('Pass')) {
        endTurn()
        changePlayer()

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
    score = score
    if (currentPlayer == 4) {
        currentPlayer = 0
    }
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

let pigOut
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
    } else if (pigRolled <= trotter){
        return 'trotter'
    }else if (pigRolled <= snouter) {
        return'snouter'
    } else if (pigRolled <= leaningJowler) {
        return 'leaning jowler'
    }

    
}      
let handScore = 0
let totalScore = 0

// if score returns 0, pigout
// assign scores
function calculateScore(){
    if ((pig1Roll == "dot" && pig2Roll == "no dot") || (pig2Roll == 'no dot' && pig1Roll == 'dot')){
        totalScore = 0
        return 'PIG OUT'
    }

    document.getElementById("player" + currentPlayer + "HandScore").innerHTML = "Score: " + handScore
}

function updateTotalScore (){
    totalScore = totalScore + handScore
}