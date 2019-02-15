var scene;
var vw, vh;
var particles;
var currentX, currentY;
const speed = 25;

scene = new engine("background: black;");

vw = scene.vw;
vh = scene.vh;

particles = [];

particles.push(new particle(50 * vw, 1 * vh, scene));
particles.push(new particle(1 * vw, 99 * vh, scene));
particles.push(new particle(99 * vw, 99 * vh, scene));

currentX = getRndInteger(0, scene.width);
currentY = getRndInteger(0, scene.height);

scene.update = function () {
    for (let i = 0; i < speed; i++) {
        let randC = particles[getRndInteger(0, 3)];
        currentX = (currentX + randC.obj.x) / 2;
        currentY = (currentY + randC.obj.y) / 2;
        particles.push(new particle(currentX, currentY, scene));
    }

    particles.forEach(p => {
        p.draw();
    });
}