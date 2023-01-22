// ./js/cells/cells.js



function Cell( scope, x, y, alive ) {


    var cell = this;


    // I can add a type parameter when I flesh it out a little more

    cell.state = {
        position: {
            x: x,
            y: y
        },
        alive : alive
    }

    var num_rows = scope.constants.num_rows,
    num_columns = scope.constants.num_columns,
    cell_width = scope.constants.cell_width,
    cell_height = scope.constants.cell_height;

    
    

    cell.render = function cellRender(){
        if(!cell.state.alive){
            //pass
        }
        else{
        scope.context.fillStyle = "rgba(0,0,0,0.5)"
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

        if (cell.state.alive){
            if (!(counter >=2) || counter >=4 ){
                cell.state.alive = false;
            } 
        } else{
                if(counter === 3){
                    cell.state.alive = true;
                }
            };

        
    };

    return cell;
}




module.exports = Cell;