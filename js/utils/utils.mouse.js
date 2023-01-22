// js/utils/utils.mouse.js

/*
Monitors the current position of the mouse over canvas

*/

function mouseMove(){
    
    this.mouse_position = {};
    var isClicked = false
    this.click_position = {}


    document.onmousemove = function(e){
        
        let canvas = document.getElementById('gameViewport')
        let rect = canvas.getBoundingClientRect()

        mouse_position.xpos = e.clientX - rect.left
        mouse_position.ypos = e.clientY - rect.top
    }


    document.onclick = function(e){
        let canvas = document.getElementById('gameViewport');
        let rect = canvas.getBoundingClientRect();


        isClicked = true;
        click_position.xpos = e.clientX - rect.left;
        click_position.ypos = e.clientY - rect.top;
    }

    return this
    
}


module.exports = mouseMove();