var scene = new engine('background: black;');


const vw = scene.width / 100;
const vh = scene.height / 100;

var snake = new Snake(scene, 2*vw);
snake.spawn();

scene.update = function () {

    for (var a in scene.pressedKeys) {
        if (scene.pressedKeys[a]) {
            if (a == 87) {
                snake.control(0, -1);
            }
    
            if (a == 83) {
                snake.control(0, 1);
            }
    
            if (a == 65) {
                snake.control(-1, 0);
            }
    
            if (a == 68) {
                snake.control(1, 0);
            }
        }
    }
    
    

    snake.update();
    scene.delay(120);
}