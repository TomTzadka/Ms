'use strict'


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



function setTime() {
    var secondsLabel = document.getElementById("seconds");
    var miliSecondsLabel = document.getElementById("miliSeconds");
    ++gTotalMiliSeconds;
    miliSecondsLabel.innerText = pad(gTotalMiliSeconds % 60);
    secondsLabel.innerHTML = pad(parseInt(gTotalMiliSeconds / 100));

}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}