var currentX, currentY;
const speed = 25;

var scene = new engine("background: black;");

scene.loading = function () {
    include([
        "particles.js",
        ]);
}

scene.onload = function () {
   scene.particles = [];

    scene.particles.push(new particle(50 * scene.vw, 1 * scene.vh, scene));
    scene.particles.push(new particle(1 * scene.vw, 99 * scene.vh, scene));
    scene.particles.push(new particle(99 * scene.vw, 99 * scene.vh, scene));

    currentX = getRndInteger(0, scene.width);
    currentY = getRndInteger(0, scene.height);
}

scene.update = function () {
    for (let i = 0; i < speed; i++) {
        let randC = scene.particles[getRndInteger(0, 3)];
        currentX = (currentX + randC.obj.x) / 2;
        currentY = (currentY + randC.obj.y) / 2;
        scene.particles.push(new particle(currentX, currentY, scene));
    }

    scene.particles.forEach(p => {
        p.draw();
    });
}