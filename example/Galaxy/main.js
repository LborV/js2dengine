//Galaxy

const G = 1;
const T = 1;

var scene = new engine('background: black;');
const logs = scene.engineLogger;

var camera = {x: 0, y: 0};

var times = 3;

const vw = scene.width / 100;
const vh = scene.height / 100;

var sun = new planet(50*vw, 50*vh, 300, 5 * vw, 0, 0, 0, 0);

sun.vis = new scene.circle({
    x: 50*vw,
    y: 50*vh,
    r: 3*vw,
    color: 'yellow',
    fill: true
});

var planets = [];

planets.push(new planet(20*vw, 50*vh, 1, 1 * vw, 0, 0, 0, 1, 'green') );
planets.push(new planet(40*vw, 60*vh, 1, 0.5 * vw, 0, 0, -1, -1, 'blue') );
planets.push(new planet(10*vw, 60*vh, 1, 0.3 * vw, 0, 0, 0.5, 0.5, 'pink') );
planets.push(new planet(100*vw, 80*vh, 1, 0.2 * vw, 0, 0, 0, 0.3, 'purple') );
planets.push(new planet(90*vw, 60*vh, 1, 0.5 * vw, 0, 0, -0.5, 0.6, 'orange') );

//Init planets
for(let i = 0; i < planets.length; i++) {
    planets[i].vis = new scene.circle({
        x: planets[i].x,
        y: planets[i].y,
        r: planets[i].r,
        color: planets[i].color,
        fill: true 
    });
}

scene.update = function(){
    for(var a in scene.pressedKeys){
        if(scene.pressedKeys[a] && a == 87) {
            camera.y++;
        }


        if(scene.pressedKeys[a] && a == 83) {
            camera.y--;
        }

        if(scene.pressedKeys[a] && a == 65) {
            camera.x++;
        }

        if(scene.pressedKeys[a] && a == 68) {
            camera.x--;
        }

        scene.pressedKeys[a] = false;
    }

    for(let i = 0; i < times; i++) {
        for(let i = 0; i < planets.length; i++) {
            planets[i].x += camera.x;
            planets[i].y += camera.y;

            planets[i].vis.x = planets[i].x;
            planets[i].vis.y = planets[i].y; 

            planets[i].calcGravity(sun, G);

            planets[i].move(T);
        }

        sun.vis.x += camera.x;
        sun.vis.y += camera.y;
    
        sun.x += camera.x;
        sun.y += camera.y;
    }

    sun.vis.draw();
    for(let i = 0; i < planets.length; i++) {
        planets[i].vis.draw();
    }

    camera.x = 0;
    camera.y = 0;
}