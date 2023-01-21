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


        if (state.hasOwnProperty('cells')){
            var cells = scope.state.cells;
            for (var cell in cells) {
                cells[cell].update(board_copy);
            }
        };
        
        // then update the board with the locations of cells

    return state;
    }
}



module.exports = gameUpdate;