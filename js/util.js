'use strict'


function getCallCoords(id) {
    var coords = {};
    var parts = id.split('-')
    coords.i = +parts[0]
    coords.j = +parts[1]
    return coords
}

