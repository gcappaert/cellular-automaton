(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// /js/game.js

const CellType = require('./js/cells/types.js');

/* A "Game of Life" style game that builds on the rudimentary game engine scaffold of Matt Bengston. Credit to his 
excellent tutorial (https://bengsfort.github.io/articles/making-a-js-game-part-1-game-engine/) for the folder architecture and
frame-rate throttling approach */
//Written to take advantage of require/export modular syntax, so uses browserify to bundle the game modules.




var gameLoop = require('./js/core/game.loop.js'),
    gameUpdate = require('./js/core/game.update.js'),
    gameRender = require ('./js/core/game.render.js'),
    cellTypes = require ('./js/cells/types.js'),
    cellEnt = require('./js/cells/cells.js'),
    cUtils = require ('./js/utils/utils.canvas.js'),
    $container = document.getElementById('container');

function Game(w, h, num_rows, num_columns, targetFps, showFps) {

    const cell_width = (w/num_columns),
    cell_height = (h/num_rows)

    this.constants = {
        width: w,
        height: h,
        targetFps: targetFps,
        showFps: showFps,
        num_rows: num_rows,
        num_columns: num_columns,
        cell_width: cell_width,
        cell_height: cell_height
    };

    // Add the board canvas to the container

    this.viewport = cUtils.generateCanvas(w, h);
    this.viewport.id  = "gameViewport";
    this.context = this.viewport.getContext('2d');

    $container.insertBefore(this.viewport, $container.firstChild);
    
    // Initialize the possible cell types

    this.cellTypes = cellTypes;

    // intiate the state 

    this.init = function gameInit(){
    
    this.state = {};
    this.state.start = false;
    this.state.empty = true;
    this.state.cells = [];


    // Create a board that is populated initially by a bunch of dead cell objects
    // The objects are also referenced by the one-dimensional cells array

    this.state.board = [];

    for (let i = 0; i < num_rows; i++){
        row = [];
        for (let j=0; j < num_columns; j++){
            let newcell = new cellEnt(this, i, j, this.cellTypes.basic, false);
            this.state.cells = this.state.cells || {};
            this.state.cells.push(newcell);
            row.push(newcell);
        };
        this.state.board.push(row);
    };
    };

    this.init();
    
    this.render = gameRender( this );
    this.update = gameUpdate( this );
    this.loop = gameLoop( this );



    return this;


}

window.game = new Game(600,600,20,20,10,false);

module.exports = game;
},{"./js/cells/cells.js":2,"./js/cells/types.js":3,"./js/core/game.loop.js":4,"./js/core/game.render.js":5,"./js/core/game.update.js":6,"./js/utils/utils.canvas.js":7}],2:[function(require,module,exports){
// ./js/cells/cells.js

var mouse = require('../utils/utils.mouse.js');

function Cell( scope, x, y, type, alive ) {


    var cell = this;



    cell.state = {
        position: {
            x: x,
            y: y
        },
        alive : alive,
        type : type
    }

    var num_rows = scope.constants.num_rows,
    num_columns = scope.constants.num_columns,
    cell_width = scope.constants.cell_width,
    cell_height = scope.constants.cell_height;

    // Previews position of cell in the mode prior to game start

    cell.preview = function cellPreview(){
        if (mouse.mouse_position.xpos > x * cell_width && 
            mouse.mouse_position.xpos < x * cell_width + cell_width &&
            mouse.mouse_position.ypos > y * cell_height && 
            mouse.mouse_position.ypos < y * cell_height + cell_height){

                scope.context.fillStyle = cell.state.type.color;
                scope.context.fillRect(
                    x * cell_width,
                    y * cell_height,
                    cell_width,
                    cell_height
                )
            }
    }


    cell.render = function cellRender(){
        if(!cell.state.alive){

        }
        else{
        scope.context.fillStyle = cell.state.type.color;
        scope.context.fillRect(
            (cell.state.position.x) * cell_width,
            (cell.state.position.y) * cell_height,
            cell_width,
            cell_height
        )
        }

    };

    cell.update = function cellUpdate(board) {
        // check the state of neighbors, which determines whether the cell lives or dies (for now)
        // using Conway's rules, if a cell is alive and has 2 or 3 live neighbors, it lives
        // if a cell is dead and has 3 or more live neighbors, it lives 

        if (!scope.state.start){
            if(mouse.click_position.xpos > x * cell_width && 
                mouse.click_position.xpos < x * cell_width + cell_width &&
                mouse.click_position.ypos > y * cell_height && 
                mouse.click_position.ypos < y * cell_height + cell_height){
                    if (!cell.state.alive){
                        cell.state.alive = true;
                    }
                    
                }
            
            } else{
        var neighbors = [];
        let xpos = cell.state.position.x,
        ypos = cell.state.position.y

        for(let i of [xpos-1, xpos, xpos+1]){
            for(let j of [ypos-1, ypos, ypos+1]){
                    if (i  >= 0 && i < num_rows && j >=0 && j < num_columns && !(i === xpos && j === ypos)){
                        neighbors.push(board[i][j]);
                    }
                }

            };

        let counter = neighbors.filter(value => value === true).length
        // implementing logic above
        // dies if fewer than two neighbors

        // How to best organize this so that I can have each cell type's logic neatly organized? Would it be better to create a cell class
        // From there destroying cells and reinstatintating them when they change type?
        // Or better to encapsulate the type info in a separate module
        
        switch(cell.state.type.name){
        
        case 'basic':
            if (cell.state.alive){
                if (!(counter >=2) || counter >=4 ){
                    cell.state.alive = false;
                } 
            } else{
                    if(counter === 3){
                        cell.state.alive = true;
                    }
                };
            break;

                
        default:
            //pass

        
        };   

    

    return cell;
    }
    }
}




module.exports = Cell;
},{"../utils/utils.mouse.js":8}],3:[function(require,module,exports){
// ./js/cells/types.js

const Cell = require("./cells");

function CellType (name, color, s, b){
    // s and b are standard cellular automata nomenclature
    // s refers to the count of living neighbors necessary for a cell to survive
    // b refers to the number of living neighbors necssary for a cell to go from dead to alive 
    this.name = name;
    this.color = color;
    this.s = Array.from(s.toString()).map(Number);
    this.b = Array.from(s.toString()).map(Number);

}

var cellTypes = {
    basic : new CellType ('basic', "rgba(0,0,0,0.5)", 23, 3),
    gnarl : new CellType ('gnarl', "rgba(255,0,0,0.5)", 1, 1)
}



module.exports = cellTypes;
},{"./cells":2}],4:[function(require,module,exports){
//  /js/core/game.loop.js

function gameLoop ( scope ) {

    var loop = this;

    var fps = scope.constants.targetFps,
        fpsInterval = 1000/fps, 
        before = window.performance.now(), // gets a high-resolution timestamp
        cycles = {
            new: {
                frameCount: 0,
                startTime: before,
                sinceStart: 0
            },
            old: {
                frameCount: 0,
                startTime: before,
                sinceStart: 0
            }

        },
        

        resetInterval = 5,
        resetState = 'new';

    loop.fps = 0


    loop.main = function mainLoop( tframe ) {

        // Request a new animation frame
        // To stop the loop, can call window.cancelAnimationFrame( loop.main )
        loop.stopLoop = window.requestAnimationFrame( loop.main );

        // When did the last loop occur?

        var now = tframe,
            elapsed = now - before,
            activeCycle, targetResetInterval;
        
        if (elapsed > fpsInterval) {
            before = now - (elapsed % fpsInterval);

            for (var calc in cycles) {
                ++cycles[calc].frameCount
                cycles[calc].sinceStart = now - cycles[calc].startTime;
                }
        

        activeCycle = cycles[resetState];
        loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100)/100;

        targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount?
            resetInterval * fps // Wait for the interval
            : (resetInterval*2) * fps); // Wait for double the interval
        
        if (activeCycle.frameCount > targetResetInterval) {
            cycles[resetState].frameCount = 0;
            cycles[resetState].startTime = now;
            cycles[resetState].sinceStart = 0;

            resetState = (resetState === 'new' ? 'old' : 'new');
            }
        
        
        scope.render(); 
        scope.state = scope.update( now );
        
        //if the game has started and the board is empty, reset it

        if (scope.state.start && scope.state.empty){
            scope.init();
        }
        

        }   
    };


    loop.main();
    return loop;

};

module.exports = gameLoop;

},{}],5:[function(require,module,exports){
function gameRender( scope ){
    var w = scope.constants.width,
    h = scope.constants.height,
    cell_height = scope.constants.cell_height,
    cell_width = scope.constants.cell_width

    return function render() {



        // Clear the canvas
        scope.context.clearRect(0,0,w,h);

        // Draw the grid
        scope.context.strokeStyle = "(255,255,255)";
        scope.context.lineWidth = 4;
        scope.context.strokeRect(0,0,w,h);
        scope.context.lineWidth = 0.5;



        for(let i = 0; i < (w/(cell_width)>>0); i++){
            for(let j=0; j < (h/(cell_height)>>0); j++){    
                scope.context.strokeRect(j*(cell_height), i*(cell_width), cell_height, cell_width);
            }
        };



        // If the state has been instantiated, render the cells

        if (scope.state && scope.state.hasOwnProperty('cells')){
            var cells = scope.state.cells;
            // Loop through entities
            for (var cell in cells) {
                if (!scope.state.start){
                    cells[cell].preview();
                }
                cells[cell].render();
            }
        };

}
}

module.exports=gameRender;
},{}],6:[function(require,module,exports){
function gameUpdate( scope ){
    return function update ( tframe ){
        // update the cells
        var state = scope.state || {};

        // create a static reference copy of the board
        
        var board_copy = []

        for (let i = 0; i < scope.constants.num_rows; i++){
            row = [];
            for (let j=0; j < scope.constants.num_columns; j++){
                row.push(scope.state.board[i][j].state.alive)
                }
            board_copy.push(row);
        };




        // Update cells referencing static board copy

        if (state.hasOwnProperty('cells')){
            var cells = scope.state.cells;
            let counter = 0
            for (var cell in cells) {
                cells[cell].update(board_copy);
                if(cells[cell].state.alive){
                    counter++;
                }
            }
            if (counter === 0){
                scope.state.empty = true;
            }
            else{
                scope.state.empty = false;
            }

        };
    
    // Reset the board if all of the cells are dead

    return state;
    }
}



module.exports = gameUpdate;
},{}],7:[function(require,module,exports){
// /js/utils/utils.canvas.js
module.exports = {
getPixelRatio: function getPixelRatio(context) {
    console.log("Determining pixel ratio.");

    var backingStores = [
        'webkitBackingStorePixelRatio',
        'mozBackingStorePixelRatio',
        'msBackingStorePixelRatio',
        'oBackingStorePixelRatio',
        'backingStorePixelRatio'
    ];

    var deviceRatio = window.devicePixelRatio;

    var backingRatio = backingStores.reduce(function (prev, curr) {
        return (context.hasOwnProperty(curr) ? context[curr] : 1);
    });

    return deviceRatio / backingRatio;

},

generateCanvas : function generateCanvas(w, h) {
    console.log("Generating canvas.");

    var canvas = document.createElement('canvas'), context = canvas.getContext('2d');

    var ratio = this.getPixelRatio(context);

    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    return canvas;

}
}
},{}],8:[function(require,module,exports){
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
},{}]},{},[1]);
