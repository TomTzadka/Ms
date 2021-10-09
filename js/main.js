'use strict'

var gBoard
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

const MINE = '🧨';
const FLAG = '🏴‍☠️';
var currNumOfFlag = gLevel.MINES;
var isVictory;
var gFirstClick = true;

// This is called when page loads
function init() {
    gBoard = buildBoard();
    renderBoard(gBoard, '.board-container')

}
// Builds the board Set mines at random locations Call setMinesNegsCount() Return the created board
function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}
// Render the board as a <table> to the page
function renderBoard(board, selector) {
    document.querySelector('#number-of-flag').innerText = gLevel.MINES /// update flag

    var strHTML = '<table border="1"><tbody>';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            strHTML += `<td id="${i}-${j}" class="cell cell${i}-${j}"  onmousedown="whichButton(event, this)" 
            oncontextmenu="event.preventDefault();">`
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function createMines(board, firstClickIdx) {
    var mines = []
    for (var i = 0; i < gLevel.MINES; i++) {
        var newMine = mines[i]
        newMine = createMine(board, firstClickIdx)
        for (var a = 1; a < mines.length; a++) {
            var oldMine = mines[a]
            while(newMine.i === oldMine.i && newMine.j === oldMine.j){/// fixing double booking of mines  
                newMine = createMine(board, firstClickIdx)
            }   
        }

        mines.push(newMine)
    }
    gLevel.MINES = mines.length
    return mines
}

function createMine(board, firstClickIdx) {

    var mine = {}

    var mineI = getRandomInt(0, board.length - 1)
    var mineJ = getRandomInt(0, board.length - 1)
    while (mineI === firstClickIdx.i && mineJ === firstClickIdx.j) {
        mineI = getRandomInt(0, board.length - 1)
        mineJ = getRandomInt(0, board.length - 1)
    }
    mine.i = mineI
    mine.j = mineJ
    if (!gBoard[mine.i][mine.j].isMine) gBoard[mine.i][mine.j].isMine = true;
    return mine;
}
// Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount(elCell) { /// start with board
    var minesCount = 0;
    var cellCoords = getCallCoords(elCell.id)
    var diff = 1
    if (gBoard[cellCoords.i][cellCoords.j].isMine) return;
    for (var i = cellCoords.i - diff; i <= cellCoords.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue; /// check border
        for (var j = cellCoords.j - diff; j <= cellCoords.j + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue; /// check border
            var nextCell = { i: i, j: j }
            if (nextCell.i === cellCoords.i && nextCell.j === cellCoords.j) {///dont check click
                continue
            } else {
                if (gBoard[nextCell.i][nextCell.j].isMine) minesCount++;
            }
        }
    }
    return minesCount;
}

// Called when a cell (td) is clicked
function cellClicked(elCell) {
    if (gGame.isOn) cellMarked(elCell);
}
// Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell) {
    var cellIdx = getCallCoords(elCell.id);
    var i = cellIdx.i
    var j = cellIdx.j

    if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {

        if (gLives > 1) {
            /// update model
            gGame.shownCount++
            gBoard[i][j].isShown = true;
            var numOfMines = setMinesNegsCount(elCell)
            gBoard[i][j].minesAroundCount = numOfMines

            ///update dom
            elCell.style.backgroundColor = 'rgb(204, 231, 225)'
            if (gBoard[i][j].isMine) {
                elCell.innerText = MINE
                // gameOver()
                document.querySelector(`.heart${gLives}`).style.display = 'none'
                // console.log('elHeart',elHeart);
                gLives--;
                alert('BOOOOM You got on a mine')

            } else if (!gBoard[i][j].minesAroundCount) {
                expandShown(elCell, i, j)
            } else {
                if (numOfMines === 1) {
                    elCell.style.color = 'rgb(49, 69, 255)' //blue
                } else if (numOfMines === 2) {
                    elCell.style.color = 'rgb(108, 173, 54)' //green
                } else if (numOfMines === 3) {
                    elCell.style.color = 'rgb(173, 54, 54)' //red
                } else if (numOfMines === 4) {
                    elCell.style.color = 'rgb(20, 23, 70)' //dark blue
                } else {
                    elCell.style.color = 'rgb(134, 124, 34)'
                }
                elCell.innerText = numOfMines;
                elCell.style.fontWeight = 'bold'
                elCell.style.fontSize = '120%'

            }

        } else {
            elCell.innerText = MINE
            gameOver()
        }


    }
    gGame.isOn = true
    checkVictory();
}

function putFlag(elCell) {
    gGame.isOn = true
    var cellIdx = getCallCoords(elCell.id);
    var i = cellIdx.i;
    var j = cellIdx.j;
    if (!gBoard[i][j].isShown) {
        if (gBoard[i][j].isMarked) {
            // update model
            gBoard[i][j].isMarked = false;
            gLevel.MINES++;
            gGame.markedCount--;
            //update dom
            elCell.innerText = '';
            document.querySelector('#number-of-flag').innerText = gLevel.MINES;
        } else {
            // update model
            gBoard[i][j].isMarked = true;
            gLevel.MINES--;
            gGame.markedCount++;
            //update dom
            elCell.innerText = FLAG;
            document.querySelector('#number-of-flag').innerText = gLevel.MINES;

        }
    }
    checkVictory();

}

// When user clicks a cell with no mines around, we need to open not only that cell,
// but also its neighbors. NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors

function whichButton(event, elCell) {
    if (gIsModalOn) return;
    if (!gGame.isOn) startTimer();

    var mouseButton = event.which;
    if (mouseButton === 1) {
        if (gFirstClick) firstClick(elCell)
        cellMarked(elCell);/// Left click
    } else if (mouseButton === 3) putFlag(elCell);/// Right click
}
function expandShown(elCell) {
    var cellIdx = getCallCoords(elCell.id);
    var i = cellIdx.i;
    var j = cellIdx.j;

    var diff = 1;
    for (var a = i - diff; a <= i + 1; a++) {
        if (a < 0 || a >= gBoard.length) continue; /// check border
        for (var b = j - diff; b <= j + 1; b++) {
            if (b < 0 || b >= gBoard.length) continue; /// check border
            if (a === i && b === j) continue; /// check me
            if (gBoard[a][b].isShown) continue/// chech show
            if (gBoard[a][b].isMine) continue; // check mine
            var nextCell = document.querySelector(`.cell${a}-${b}`)
            cellMarked(nextCell)
        }
    }
}

function level(elBtn) {
    /// update model
    var elSizeClicked = +elBtn.innerText
    gLevel.SIZE = elSizeClicked
    //update dom
    document.querySelector('#number-of-flag').innerText = gLevel.MINES
    newGame()
}

function newGame() {
    // update model
    clearInterval(gInterval);
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    if (gLevel.SIZE === 4) {
        gLevel.MINES = 2;
    } else if (gLevel.SIZE === 8) {
        gLevel.MINES = 12;
    } else {
        gLevel.MINES = 30;
    }
    gFirstClick = true
    isVictory = false;
    gLives = 3;
    gHint = 3;
    //update dom
    for(var i = 0; i < 3; i++){
        var elLives = document.querySelector(`.hint${i+1}`);
        elLives.style.display = 'inline-block'
        console.log('elLives',elLives);

    }
    //  elLives.style.display = 'block'

    var elFace = document.getElementById('new-game')
    elFace.innerText = '😁'
    var elTimerDiv = document.querySelector('.timer');
    elTimerDiv.innerHTML = '0.00';
    for (var i = 0; i < 3; i++) {
        document.querySelector(`.heart${i + 1}`).style.display = 'inline-block'
    }
    removeModal()
    init()
}







