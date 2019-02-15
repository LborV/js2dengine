function particle(x, y, scene) {
    let _part = this;

    _part.color = "#000";

    if (x < scene.width / 2 && y > scene.height / 2) {
        _part.color = "#FF0";
    } else if (x > scene.width / 2 && y > scene.height / 2) {
        _part.color = "#0FF";
    } else {
        _part.color = "#F0F";
    }

    _part.obj = new scene.circle({
        x: x,
        y: y,
        color: _part.color,
        r: 0.05 * scene.vw,
        fill: true
    });

    _part.draw = function () { _part.obj.draw(); }
}