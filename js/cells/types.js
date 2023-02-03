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