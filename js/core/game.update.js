function gameUpdate( scope ){
    return function update ( tframe ){

        

        // update the cells
        var state = scope.state || {};
        
        // update the cell type selection button

        let button = document.getElementById("typeToggle")
        button.innerHTML = scope.state.currentType.name;

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