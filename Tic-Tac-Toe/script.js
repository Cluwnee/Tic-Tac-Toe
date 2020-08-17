// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

// Game constants
const xSymbol = '×';
const oSymbol = '○';

// Game variables
let gameIsOn = true; // Boolean to check status of current game.
let xTurn = true; // Boolean to check whos turn it is right now.

// Functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsOn = false; // End the game.
    if (letter === 'x') {
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
    } else {
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
}

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    // Check win conditions - All possibles winning patterns + draw.
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft)
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsOn = false;
        statusDiv.innerHTML = 'Draw!'
    } else { // Here determine who's next with the boolean and update status accordingly.
        xTurn = !xTurn;
        if (xTurn) {
            statusDiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`
        }
    }
};

// Event Handlers
const handleReset = () => {
    xTurn = true; // X starts the game.
    statusDiv.innerHTML = `${xSymbol} is next`; // Reset the status.
    for (const cellDiv of cellDivs) { // Remove all the X's or O's in the cells.
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
    gameIsOn = true; // Restart the game.
};

const handleCellClick = (e) => {
    const classList = e.target.classList;

    // Check if element already has an X or an O - if not then continue.
    if (!gameIsOn || classList[1] === 'x' || classList[1] === 'o') {
        return;
    }

    // Check whos turn it is and add X or O on click accordingly.
    if (xTurn) {
        classList.add('x');
        checkGameStatus(); // Check if someone won.
    } else {
        classList.add('o');
        checkGameStatus(); // Check if someone won.
    }
};

// Event listeners
resetDiv.addEventListener('click', handleReset); // Reset button click.

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick) // Generate event listeners to all cells.
}