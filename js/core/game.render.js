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
                cells[cell].render();
            }
        };
    }
}

module.exports=gameRender;