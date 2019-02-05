/**
 * @param object scene -> object where to draw snake !object of engine!
 * @param int scl -> how much pixels is one step on field, default 10 
 */
function Snake(scene, scl) {
    let _snake = this;

    _snake.scene = scene;

    _snake.food;

    if (scl == undefined) {
        _snake.scl = 10;
    } else {
        _snake.scl = scl;
    }


    //Rows and columns count
    _snake.columns = Math.floor(_snake.scene.width / _snake.scl);
    _snake.rows = Math.floor(_snake.scene.height / _snake.scl);

    /**
     * An array of objects: {x, y}
     */
    _snake.body = [];

    _snake.speedX = 1;
    _snake.speedY = 0;
    _snake.size = 0;

    /**
     * 
     * Function that manage control
     * 
     * @params int x,y -> is snake moving right or left or up or down
     */
    _snake.control = function (x, y) {
        _snake.speedX = x;
        _snake.speedY = y;
    }

    /**
     * Update funtion
     */
    _snake.update = function () {

        if(_snake.size > 1) {
            for (let i = 1; i < _snake.size; i++) {
                _snake.body[i].x = _snake.body[i - 1].x;
                _snake.body[i].y = _snake.body[i - 1].y;
            }
        }

        _snake.body[0].x += _snake.speedX * _snake.scl;
        _snake.body[0].y += _snake.speedY * _snake.scl;

        _snake.eat();
        _snake.draw();
    }


    /**
     * Draw function
     */
    _snake.draw = function () {
        _snake.body.forEach(block => {
            new _snake.scene.fillBox({
                x: block.x,
                y: block.y,
                width: _snake.scl,
                height: _snake.scl,
                color: "#FFF"
            }).draw();
        });

        //Draw food
        new _snake.scene.fillBox({
            x: _snake.food.x,
            y: _snake.food.y,
            width: _snake.scl,
            height: _snake.scl,
            color: "#0F0"
        }).draw();
    }

    /**
     * Spawn snake, restart all variables
     */
    _snake.spawn = function() {
        _snake.body = [];
        _snake.body.push({ x: 0, y: 0 });

        _snake.speedX = 1;
        _snake.speedY = 0;

        _snake.size = 1;

        _snake.spawnFood();
    }

    /**
     * Spawn food
     */
    _snake.spawnFood = function () {
        
        let x = Math.floor(Math.random() * _snake.columns); 
        let y = Math.floor(Math.random() * _snake.rows); 

        _snake.food = {
            x: x * _snake.scl,
            y: y * _snake.scl
        }
    }

    /**
     * Eat
     */
    _snake.eat = function () {
        if (_snake.scene.distanceBetweenTwoPoints(_snake.body[0], _snake.food) < _snake.scl) {
            _snake.body.push({ x: _snake.body[0].x, y: _snake.body[0].y });
            _snake.size++;
            _snake.spawnFood();
        }
    }
}