'use strict'
var gInterval;
const SECOND = 1000;


function getCallCoords(id) {
    var coords = {};
    var parts = id.split('-')
    coords.i = +parts[0]
    coords.j = +parts[1]
    return coords
}

function getRandomInt(min, max){
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1) + min);
}




function startTimer() {
    var elTimer = document.querySelector('.timer');
    var timestamp = Date.now();

    gInterval = setInterval(() => {
        var time = `${((Date.now() - timestamp) / 1000).toFixed(2)}`;
        elTimer.innerText = time;
    }, 100);
}

function firstClick(elCell){
    var cellCoords= getCallCoords(elCell.id)
    createMines(gBoard, cellCoords)
    gFirstClick = false
}
