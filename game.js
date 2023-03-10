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

    this.state.typeSelector = 0;
    this.state.currentType = Object.values(this.cellTypes)[this.state.typeSelector]   



    // Create a board that is populated initially by a bunch of dead cell objects
    // The objects are also referenced by the one-dimensional cells array

    this.state.board = [];

    for (let i = 0; i < num_rows; i++){
        row = [];
        for (let j=0; j < num_columns; j++){
            let newcell = new cellEnt(this, i, j, cellTypes.basic, false);
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

window.game = new Game(800,800,50,50,10,false);

module.exports = game;