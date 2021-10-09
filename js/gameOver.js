'use srtict'
// Game ends when all mines are marked, and all the other cells are shown
var gIsModalOn;
var gLives = 3;
var gHint = 3;
function gameOver() {
    gGame.isOn = false
    clearInterval(gInterval);
    var elFace = document.getElementById('new-game')
    elFace.innerText = '😖'
    new Audio('sound/lose.mp4').play();

    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = gBoard[i][j];
            if (currCell.isMine) {
                // update model of cell
                gBoard[i][j].isShown = true;
                /// update dom of cell
                var elCell = document.getElementById(`${i}-${j}`)
                elCell.innerText = MINE;
                elCell.style.backgroundColor = 'rgb(245, 119, 119)';
            }
        }
    }
    showModal()
}
function victory() {
    var elFace = document.getElementById('new-game')
    elFace.innerText = '😎'
    isVictory = true
    clearInterval(gInterval);
    gGame.isOn = false
    new Audio('sound/victory.mp4').play();
    showModal()
}
function checkVictory() {
    if (gGame.shownCount + gGame.markedCount === (gLevel.SIZE ** 2)) victory();


}

function showModal() {
    gIsModalOn = true;
    var elModal = document.getElementById('modal');
    elModal.style.display = 'block'
    if (gGame.isOn) {
        elModal.innerText = 'BOOOM!'
        elModal.style.color = 'rgb(168, 41, 24)'
    } else {
        if (isVictory) {
            elModal.innerText = 'You Win!'
        } else {
            elModal.innerText = 'You Lose!'
        }
        elModal.style.color = 'rgb(228, 159, 30)'
    }
}
function removeModal() {
    var elModal = document.getElementById('modal');
    elModal.style.display = 'none'
    gIsModalOn = false;
}
function hint(elHint) {
    var emptyCells = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                var emptyCell = { i: i, j: j }
                emptyCells.push(emptyCell);
            }
        }
    }
    var randomEmptyCell = emptyCells[getRandomInt(0, emptyCells.length - 1)]
    //update modal
    gHint--
    //update dom
    var elRandomEmptyCell = document.getElementById(`${randomEmptyCell.i}-${randomEmptyCell.j}`)
    elRandomEmptyCell.style.backgroundColor = 'green'
    elHint.style.display = 'none'

}