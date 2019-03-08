function particle(x, y, scene) {
    let _part = this;

    _part.color = "#0f0";
    _part.coor = new Matrix(2, 1);
    _part.coor.setColumn(1, [x, y]);

    _part.obj = new scene.fillBox({
        x: x,
        y: y,
        color: _part.color,
        width: 0.008 * scene.vw,
        height: 0.008 * scene.vw,
    });

    _part.draw = function () { _part.obj.draw(); }
}