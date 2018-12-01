function engine(style = undefined, width = undefined, height = undefined) {
    //Initialization
    let _engine = this;
    _engine.doc = document;

    if (width != undefined && height != undefined) {
        _engine.width = width;
        _engine.height = height;
    } else {
        _engine.width = _engine.doc.body.clientWidth;
        _engine.height = _engine.doc.body.clientHeight;
    }

    _engine.canv = _engine.doc.createElement('canvas');
    _engine.canv.width = _engine.width;
    _engine.canv.height = _engine.height;

    if(style == undefined) {
        _engine.canv.style.backgroundColor = '3D3D3D';
    }
    else {
        _engine.canv.style.cssText = style;
    }

    _engine.doc.body.appendChild(_engine.canv);
    _engine.ctx = _engine.canv.getContext('2d');

    //Drawing
    _engine.update = function(){
        console.log('Update function is not declared!');
    }

    _engine.draw = function(){
        _engine.ctx.clearRect(0, 0, _engine.width, _engine.height);
        _engine.update();
        requestAnimationFrame(_engine.draw);
    }

    _engine.start = function(){
        _engine.keyBoard();
        _engine.draw();
    }

    //Rectangle
    _engine.fillBox = function(params){
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
        this.color = params.color;
    }

    _engine.fillBox.prototype = {
        draw: function(){
            _engine.ctx.fillStyle= this.color;
            _engine.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    _engine.strokeBox = function(params){
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;
        this.color = params.color;
        this.lineWidth = params.lineWidth;
    }

    _engine.strokeBox.prototype = {
        draw: function(){
            if(this.lineWidth == undefined) {
                _engine.ctx.lineWidth = 1;
            } else {
                _engine.ctx.lineWidth = this.lineWidth;
            }
            _engine.ctx.strokeStyle = this.color;
            _engine.ctx.strokeRect(this.x, this.y, this.width, this.height);
            _engine.ctx.stroke();
        }
    }

    //Sprite
    _engine.sprite = function(params){
        this.image = new Image();
        this.x = params.x;
        this.y = params.y;
        this.image.src = params.src;
        this.width = params.width;
        this.height = params.height;
    }

    _engine.sprite.prototype = {
        draw: function(){
            if (this.width != undefined && this.height != undefined) {
                _engine.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            } else {
               _engine.ctx.drawImage(this.image, this.x, this.y);
            }
        }
    }

    //Keyboard
    _engine.isKeyboardInit = false;
    _engine.pressedKeys = {};
    _engine.keyBoard = function(){
        if(_engine.isKeyboardInit) {
            return;
        }
        _engine.isKeyboardInit = true;
        
        window.addEventListener('keydown', function(event){
            _engine.pressedKeys[event.keyCode] = true;
        });

        window.addEventListener('keyup', function(event){
            _engine.pressedKeys[event.keyCode] = false;
        });
    }

    //Mouse


    //Text

}
