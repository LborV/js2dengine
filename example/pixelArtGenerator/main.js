var scene = new engine('background: #000; border: 1px solid red; width: 400; height: 400;', true, 400, 400, "cnv");

const vw = scene.width / 100;
const vh = scene.height / 100;

var myImage = undefined;
var click = false;
var first = true;

function process(input) {
    var reader = new FileReader();

    reader.onload = function (e) {
        createImage(e.target.result);
    }

    first = true;
    reader.readAsDataURL(input.files[0]);
}

function createImage(src) {
    myImage = new scene.sprite({
        x: 5*vw,
        y: 5*vh,
        width: 90 * vw,
        height: 90 * vh,
        src: src
    });  
}

scene.update = function () {
    if (myImage != undefined) {
        if (first) {
            myImage = firstTime();
            first = false;
        }
        scene.ctx.putImageData(myImage, 5 * vw, 5 * vh);
        let imageData = scene.ctx.getImageData(5 * vw, 5 * vh, 90 * vw, 90 * vh);
        
        if (click) {
            for (let i = 0; i < 100; i++)
                imageData.data[Math.floor(Math.random() * imageData.data.length)] = Math.floor(Math.random() * 255);

            myImage = imageData;
        }
        
        click = scene.mouseCoordinates.down;
        
        scene.ctx.putImageData(imageData, 5 * vw, 5 * vh);
    }
}

function firstTime() {
    myImage.draw();

    return scene.ctx.getImageData(5 * vw, 5 * vh, 90 * vw, 90 * vh);
}