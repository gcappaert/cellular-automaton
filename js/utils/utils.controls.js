// /js/utils/utils.controls.js

module.exports = {
    toggleButton : function toggleButton(scope){
        let button = document.getElementById("typeToggle");
        let type = Object.keys(window.game.cellTypes)[window.game.state.typeSelector]
        button.innerHTML = type;
        button.onclick = function typeToggle (scope) {
            scope.state.typeSelector = (scope.state.typeSelector + 1) % Object.keys(scope.cellTypes).length;
            scope.state.currentType = Object.values(scope.cellTypes)[scope.state.typeSelector]
            let type = scope.state.currentType.name
            button.innerHTML = type;
        }
    }
}