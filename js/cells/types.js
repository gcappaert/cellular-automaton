// ./js/cells/types.js

const Cell = require("./cells");

function CellType (name, color, s, b){
    // s and b are standard cellular automata nomenclature
    // s refers to the count of living neighbors necessary for a cell to survive
    // b refers to the number of living neighbors necssary for a cell to go from dead to alive 
    this.name = name;
    this.color = color;
    this.s = Array.from(s.toString()).map(Number);
    this.b = Array.from(b.toString()).map(Number);

}

var cellTypes = {
    basic : new CellType ('basic', "rgba(0,0,0,0.5)", 23, 3),
    gnarl : new CellType ('gnarl', "rgba(255,0,0,0.5)", 1, 1),
    amoeba : new CellType ('amoeba', "rgba(0,255,0,0.5", 1358, 357),
    longlife : new CellType ('longlife', "rgba(0,0,255,0.5)", 5, 345),
    maze : new CellType ('maze', "rgba(255,191,0,0.5",12345,3),
    move : new CellType ('move', "rgba(159,43,104,0.5",245,368)
}



module.exports = cellTypes;