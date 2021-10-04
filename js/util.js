'use strict'

function MouseClick(e) {
    if (typeof e === 'object') {
        switch (e.button) {
            case 0:
                console.log('Left button clicked.');
                
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




