'use srtict'
// Game ends when all mines are marked, and all the other cells are shown
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

function checkVictory(){
    if (gGame.shownCount === (gLevel.SIZE ** 2) - gGame.markedCount &&
        gLevel.MINES === 0) victory();
}

function showModal() {
    var elModal = document.getElementById('modal');
    elModal.style.display = 'block'
    if (isVictory) {
        elModal.innerText = 'You Win!'
    } else {
        elModal.innerText = 'You Lose!'

    }
}
function removeModal() {
    var elModal = document.getElementById('modal');
    elModal.style.display = 'none'
}
