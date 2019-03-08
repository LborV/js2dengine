var currentX, currentY;
const speed = 100;

var scene = new engine("background: black;");

scene.onload = function () {
    scene.particles = [];
    scene.ctx.transform(30, 0, 0, -30, 200, 350);
    
    var coor = new Matrix(2, 1);
    coor.setColumn(1, [scene.vw * 90, scene.vh * 50]);
    scene.particles.push(new particle(coor.get(1, 1), coor.get(2, 1), scene));

}

function f1(m) {
    let M = new Matrix(2, 2);
    M.setRow(1, [0, 0]);
    M.setRow(2, [0, 0.16]);

    m = M.multiplication(m);

    return m;
}

function f2(m) {
    let M = new Matrix(2, 2);
    M.setRow(1, [0.85, 0.04]);
    M.setRow(2, [-0.04, 0.85]);

    let K = new Matrix(2, 1);
    K.setColumn(1, [0, 1.60]);

    m = M.multiplication(m);
    m = m.addition(K);

    return m;
}

function f3(m) {
    let M = new Matrix(2, 2);
    M.setRow(1, [0.20, -0.26]);
    M.setRow(2, [0.23, 0.22]);

    let K = new Matrix(2, 1);
    K.setColumn(1, [0, 1.60]);

    m = M.multiplication(m);
    m = m.addition(K);

    return m;
}

function f4(m) {
    let M = new Matrix(2, 2);
    M.setRow(1, [-0.15, 0.28]);
    M.setRow(2, [0.26, 0.24]);

    let K = new Matrix(2, 1);
    K.setColumn(1, [0, 0.44]);

    m = M.multiplication(m);
    m = m.addition(K);

    return m;
}

scene.update = function () {
    for (let i = 0; i < speed; i++) {
        let p = randomInteger(0, 100);

        let tmp;

        if (p == 1) {
            tmp = f1(scene.particles[scene.particles.length - 1].coor);
        } else if (p > 1 && p <= 85) {
            tmp = f2(scene.particles[scene.particles.length - 1].coor);            
        } else if (p > 85 && p < 92) {
            tmp = f3(scene.particles[scene.particles.length - 1].coor);
        } else tmp = f4(scene.particles[scene.particles.length - 1].coor);

        scene.particles.push(new particle(tmp.get(1, 1), tmp.get(2, 1), scene));

    }


    scene.particles.forEach(p => {
        p.draw();
    });
}