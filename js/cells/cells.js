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

                scope.context.fillStyle = scope.state.currentType.color;
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
            cell.state.type = scope.state.currentType;
            if(mouse.click_position.xpos > x * cell_width && 
                mouse.click_position.xpos < x * cell_width + cell_width &&
                mouse.click_position.ypos > y * cell_height && 
                mouse.click_position.ypos < y * cell_height + cell_height){
                    if (!cell.state.alive){
                        cell.state.alive = true;
                        mouse.click_position = {};
                    } else {
                        cell.state.alive = false;
                        mouse.click_position = {};
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
        
    
        if (cell.state.alive){
            if (cell.state.type.s.includes(counter)){
                cell.state.alive = true;
            } else {
                cell.state.alive = false;
            }
        } else{
                if(cell.state.type.b.includes(counter)){
                    cell.state.alive = true;
                }
            };

        
        };   

    

    return cell;
    }
    
}




module.exports = Cell;