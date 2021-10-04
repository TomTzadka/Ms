'use strict'

var gBoard
// minesAroundCount: 4,
// isShown: true, isMine: false,
// isMarked: true

var gLevel = { SIZE: 4, MINES: 2 };
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
// This is called when page loads

function init() {
    console.log('init');
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
                isShown: true,
                isMine: false,
                isMarked: false
            }
        }
    }
    console.log('board');
    return board
}
// Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount(board) {

}
// Render the board as a <table> to the page
function renderBoard(board, selector) {

    var strHTML = '<table border="1"><tbody>';

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            // var cell = board[i][j];
            // var className = `cell cell${i}-${j}`;
            strHTML += `<td class="cell cell${i}-${j}"><button onclick="cellClicked(this, ${i}, ${j})"  ></button></td>`
          

        }

        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}
// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    console.log(elCell);
    console.log('i', i);
    console.log('j', j);

   var res = elCell.addEventListener('mouseup', MouseClick);
   console.log(res);
}
// Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell) {

}
// Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {

}
// When user clicks a cell with no mines around, we need to open not only that cell,
// but also its neighbors. NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
function expandShown(board, elCell, i, j) {

}


function MouseClick(e) {
    if (typeof e === 'object') {
        switch (e.button) {
            case 0:
                console.log('Left button clicked.');
                return 0
                break;
            case 1:
                console.log('Middle button clicked.');
                break;
            case 2:
                console.log('Right button clicked.');
                break;
            default:
                console.log(`Unknown button code: ${e.button}`);
        }
    }
}
