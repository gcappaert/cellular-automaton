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