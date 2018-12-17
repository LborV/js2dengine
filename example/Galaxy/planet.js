//Planet class

var planet = function(x, y, m, r, aX, aY, vX, vY, color){
    var _planet = this;

    _planet.x = x;
    _planet.y = y;
    _planet.m = m;
    _planet.aX = aX;
    _planet.aY = aY;
    _planet.vX = vX;
    _planet.vY = vY;
    _planet.r =r;
    _planet.color = color;

    if(_planet.vX == undefined) {
        _planet.vX = 0;
    }

    if(_planet.vY == undefined) {
        _planet.vY = 0;
    }

    if(_planet.aX == undefined) {
        _planet.aX = 0;
    }

    if(_planet.aY == undefined) {
        _planet.aY = 0;
    }

    _planet.move = function(T){
        _planet.vX += T * _planet.aX;
        _planet.vY += T * _planet.aY;

        _planet.x += T * _planet.vX;
        _planet.y += T * _planet.vY;
    }

    _planet.calcGravity = function(object, G){
        let distance = Math.sqrt( Math.pow(_planet.x -object.x, 2) + Math.pow(_planet.y -object.y, 2) ); 
        
        _planet.aX = G * (_planet.m * object.m / Math.pow(distance, 3) ) * (object.x - _planet.x);
        _planet.aY = G * (_planet.m * object.m / Math.pow(distance, 3) ) * (object.y - _planet.y);
    }
}