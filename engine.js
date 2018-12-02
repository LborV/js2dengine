function engine(style = undefined, startAuto = undefined, width = undefined, height = undefined) {
    //Initialization
    let _engine = this;
    _engine.doc = document;

    if(startAuto != undefined) {
        _engine.startAuto = startAuto;
    } else {
        _engine.startAuto = true;
    }

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

    //Logger
    _engine.logger = function(){
        this.oldConsoleLog = null;

        this.enable = function(){
            if(this.oldConsoleLog == null)
                return;

            window['console']['log'] = this.oldConsoleLog;
        }

        this.okMessage = function(msg){
            console.log('%c ' + msg, 'color: green;');
        }

        this.errorMessage = function(msg){
            console.log('%c ' + msg, 'color: red;');
        }

        this.infoMessage = function(msg){
            console.log('%c ' + msg, 'color: blue;');
        }

        this.customStyledMessage = function(msg, style){
            console.log('%c ' + msg, style);
        }

        this.disable = function(){
            this.oldConsoleLog = _engine.engineLogger.errorMessage;
            window['console']['log'] = function() {};
        }

        this.okMessage('Logger created!');
    };

    _engine.engineLogger = new _engine.logger();

    //Loading
    _engine.isLoaded = false;
    _engine.loading = function(){
        _engine.engineLogger.errorMessage('Loading function is not defined');
    }
    _engine.onload = function(){
        _engine.engineLogger.errorMessage('On load function is not defined');
    }
    window.onload = function(){
        _engine.isLoaded = true;
        _engine.onload();
    }

    //Drawing
    _engine.update = function(){
        _engine.engineLogger.errorMessage('Update function is not declared!');
    }

    _engine.draw = function(){
        _engine.ctx.clearRect(0, 0, _engine.width, _engine.height);
        if(_engine.isLoaded) {
            _engine.update();
        } else {
            _engine.loading();
        }
        requestAnimationFrame(_engine.draw);
    }

    _engine.start = function(){
        _engine.keyBoard();
        _engine.mouse();
        _engine.draw();
    }

    //Rectangle
    _engine.fillBox = function(params){
        let _fillBox = this;

        _fillBox.x = params.x;
        _fillBox.y = params.y;
        _fillBox.width = params.width;
        _fillBox.height = params.height;
        _fillBox.color = params.color;

        _fillBox.hovered = false;
        _fillBox.hover = function(){
            _engine.engineLogger.errorMessage('Hover function is not declared');
        }

        _fillBox.unhover = function(){
            _engine.engineLogger.errorMessage('Unhover function is not declared');
        }

        _fillBox.onDown = function(){
            _engine.engineLogger.errorMessage('On mouse down function is not declared');
        }

        _fillBox.onUp = function(){
            _engine.engineLogger.errorMessage('On mouse up function is not declared');
        }
    }

    _engine.fillBox.prototype = {
        draw: function(){
            if(!(this.x >= 0 && this.x + this.width <= _engine.width && this.y + this.height <= _engine.height && this.y >= 0)) {
                return;
            }

            _engine.ctx.fillStyle= this.color;

            if(_engine.mouseCoordinates.x >= this.x && _engine.mouseCoordinates.x <= this.x + this.width
                && _engine.mouseCoordinates.y >= this.y && _engine.mouseCoordinates.y <= this.y + this.height) {
                    this.hovered = true;
                    this.hover();
                } else if(this.hovered) {
                    this.hovered = false;
                    this.unhover();
                }

            if(this.hovered && _engine.mouseCoordinates.down) {
                this.onDown();
            } else if(this.hovered) {
                this.onUp();
            }

            _engine.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    _engine.strokeBox = function(params){
        let _strokeBox = this;

        _strokeBox.x = params.x;
        _strokeBox.y = params.y;
        _strokeBox.width = params.width;
        _strokeBox.height = params.height;
        _strokeBox.color = params.color;
        _strokeBox.lineWidth = params.lineWidth;

        _strokeBox.hovered = false;
        _strokeBox.hover = function(){
            _engine.engineLogger.errorMessage('Hover function is not declared');
        }

        _strokeBox.unhover = function(){
            _engine.engineLogger.errorMessage('Unhover function is not declared');
        }

        _strokeBox.onDown = function(){
            _engine.engineLogger.errorMessage('On mouse down function is not declared');
        }

        _strokeBox.onUp = function(){
            _engine.engineLogger.errorMessage('On mouse up function is not declared');
        }
    }

    _engine.strokeBox.prototype = {
        draw: function(){
            if(!(this.x >= 0 && this.x + this.width <= _engine.width && this.y + this.height <= _engine.height && this.y >= 0)) {
                return;
            }

            if(this.lineWidth == undefined) {
                _engine.ctx.lineWidth = 1;
            } else {
                _engine.ctx.lineWidth = this.lineWidth;
            }
            _engine.ctx.strokeStyle = this.color;

            if(_engine.mouseCoordinates.x >= this.x && _engine.mouseCoordinates.x <= this.x + this.width
                && _engine.mouseCoordinates.y >= this.y && _engine.mouseCoordinates.y <= this.y + this.height) {
                    this.hovered = true;
                    this.hover();
                } else if(this.hovered) {
                    this.hovered = false;
                    this.unhover();
                }
            if(this.hovered && _engine.mouseCoordinates.down) {
                this.onDown();
            } else if(this.hovered) {
                this.onUp();
            }

            _engine.ctx.strokeRect(this.x, this.y, this.width, this.height);
            _engine.ctx.stroke();
        }
    }

    //Sprite
    _engine.sprite = function(params){
        let _sprite = this;

        _sprite.image = new Image();
        _sprite.x = params.x;
        _sprite.y = params.y;
        _sprite.image.src = params.src;
        _sprite.width = params.width;
        _sprite.height = params.height;

        _sprite.hovered = false;
        _sprite.hover = function(){
            _engine.engineLogger.errorMessage('Hover function is not declared');
        }

        _sprite.unhover = function(){
            _engine.engineLogger.errorMessage('Unhover function is not declared');
        }

        _sprite.onDown = function(){
            _engine.engineLogger.errorMessage('On mouse down function is not declared');
        }

        _sprite.onUp = function(){
            _engine.engineLogger.errorMessage('On mouse up function is not declared');
        }

        _sprite.image.onload = function(){
            if(_sprite.width == undefined || _sprite.height == undefined) {
                _sprite.width = this.width;
                _sprite.height = this.height;
            }
        }
    }

    _engine.sprite.prototype = {
        draw: function(){
            if(!(this.x >= 0 && this.x + this.width <= _engine.width && this.y + this.height <= _engine.height && this.y >= 0)) {
                return;
            }

            if(_engine.mouseCoordinates.x >= this.x && _engine.mouseCoordinates.x <= this.x + this.width
                && _engine.mouseCoordinates.y >= this.y && _engine.mouseCoordinates.y <= this.y + this.height) {
                this.hovered = true;
                this.hover();
            } else if(this.hovered) {
                this.hovered = false;
                this.unhover();
            }
            if(this.hovered && _engine.mouseCoordinates.down) {
                this.onDown();
            } else if(this.hovered) {
                this.onUp();
            }
            
            _engine.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            
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
    _engine.isMouseInit
    _engine.mouseCoordinates = {
        x: null,
        y: null,
        down: false
    };
    _engine.mouse = function(){
        if(_engine.isMouseInit) {
            return;
        }
        _engine.isMouseInit = true;
        _engine.rect = _engine.canv.getBoundingClientRect();

        window.addEventListener('mousemove', function(event){
            _engine.mouseCoordinates.x = event.clientX - _engine.rect.left;
            _engine.mouseCoordinates.y = event.clientY - _engine.rect.top;
        });

        window.addEventListener('mousedown', function(event){
            _engine.mouseCoordinates.down = true;
        });

        window.addEventListener('mouseup', function(event){
            _engine.mouseCoordinates.down = false;
        });
    }

    //Text
    _engine.fillTextLine = function(params){
        let _fillTextLine = this;

        _fillTextLine.x = params.x;
        _fillTextLine.y = params.y;
        _fillTextLine.font = params.font;
        _fillTextLine.color = params.color;
        _fillTextLine.align = params.align;
        _fillTextLine.text = params.text;

    }

    _engine.fillTextLine.prototype = {
        draw: function(){
            _engine.ctx.font = this.font;
            _engine.ctx.fillStyle = this.color;
            _engine.ctx.textAlign = this.align;
            _engine.ctx.fillText(this.text, this.x, this.y);
        }
    }

    //Start engine automatically
    if(_engine.startAuto) {
        _engine.start();
    }
}
