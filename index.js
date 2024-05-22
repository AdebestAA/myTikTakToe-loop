// using loops

let boxes = document.querySelectorAll('.box')

let statusText = document.querySelector('h5')
let restart = document.querySelector("[restart]")


// delaring the needed variabble and Array;



let options = ["", "", "", "", "", "", "", "", ""]
console.log(options.length);
let startGame = false;
const xTurn = 'X'
const oTrun = 'O'
let currentPlayer = xTurn
statusText.innerText = "it's " + xTurn + "'s turn"
let windCondition = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
]

let winGame = false;


boxes.forEach((box, index) => {
    let style = '';

    if (index < 3) {
        style += "border-bottom:1px solid black;"
    }
    if (index % 3 == 0) {
        style += "border-right:1px solid black;"
    }
    if (index % 3 == 2) {
        style += "border-left:1px solid black;"
    }
    if (index > 5) {
        style += "border-top:1px solid black"
    }
    box.style = style



    box.addEventListener('click', playGame)

})

function playGame() {
    let index = this.getAttribute('id')
    startGame = true

    if (!startGame || options[index] !== "") {
        alert('error')
        return
    }


    options[index] = currentPlayer;
    this.innerText = currentPlayer;

    console.log(options);


    checkWinner()


}



function checkWinner() {


    for (let i = 0; i < windCondition.length; i++) {
        let condition = windCondition[i]
        let cellA = options[condition[0]]
        let cellB = options[condition[1]]
        let cellC = options[condition[2]]


        if (cellA !== "") {
            if (cellA !== cellB) {
                continue
            }

            else if (cellA == cellB && cellB == cellC) {
                winGame = true
                break
            }

        }
    }

    if (winGame == true) {
        statusText.innerText = currentPlayer + " has won the game"
        winGame = false;
        boxes.forEach(box => {
            box.removeEventListener('click', playGame)
        })
    }
    else if (!options.includes('')) {
        statusText.innerText = "draw";

    }
    else {
        changePlayer()
    }

}
function changePlayer() {
    currentPlayer = currentPlayer == xTurn ? currentPlayer = oTrun : currentPlayer = xTurn;
    statusText.innerText = "it's " + currentPlayer + "'s turn"
}

restart.addEventListener('click', () => {
    options = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach(box => {
        box.innerText = ""
        box.addEventListener("click", playGame)
    })
    startGame = false;
    winGame = false

})


