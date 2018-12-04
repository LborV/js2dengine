/**
 * 
 * @param string style -> custom css styles for canvas 
 * @param bool startAuto -> start engine(drawing) automatically 
 * @param int width -> canvas width 
 * @param int height -> canvas height
 */
function engine(style = undefined, startAuto = undefined, width = undefined, height = undefined) {
    //#Initialization
    
    /**
     * link to the engine object
     */
    let _engine = this;

    /**
     * loaded web page
     */
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

    /**
     * Creating canvas object 
     */
    _engine.canv = _engine.doc.createElement('canvas');
    _engine.canv.width = _engine.width;
    _engine.canv.height = _engine.height;

    if(style == undefined) {
        _engine.canv.style.backgroundColor = '3D3D3D';
    }
    else {
        _engine.canv.style.cssText = style;
    }

    /**
     * Insert canvas into HTML
     */
    _engine.doc.body.appendChild(_engine.canv);

    /**
     * Context of canvas
     */
    _engine.ctx = _engine.canv.getContext('2d');

    //#Logger
    /**
     * Class to help output in console styled messages
     * and enable/disable console logs
     */
    _engine.logger = function(){
        this.oldConsoleLog = null;

        /**
         * If console logs enabled @return void, else
         * enable console logs
         */
        this.enable = function(){
            if(this.oldConsoleLog == null)
                return;

            window['console']['log'] = this.oldConsoleLog;
        }

        /**
         * Show green message
         * @param string message -> message that will be displayed 
         */
        this.okMessage = function(msg){
            console.log('%c ' + msg, 'color: green;');
        }

        /**
         * Show red message
         * @param string message -> message that will be displayed 
         */
        this.errorMessage = function(msg){
            console.log('%c ' + msg, 'color: red;');
        }

        /**
         * Show blue message
         * @param string message -> message that will be displayed 
         */
        this.infoMessage = function(msg){
            console.log('%c ' + msg, 'color: blue;');
        }

        /**
         * Show custom styled message
         * @param string message -> message that will be displayed
         * @param string style -> custom css style
         */
        this.customStyledMessage = function(msg, style){
            console.log('%c ' + msg, style);
        }

        /**
         * Disable console logs
         */
        this.disable = function(){
            this.oldConsoleLog = _engine.engineLogger.errorMessage;
            window['console']['log'] = function() {};
        }

        /**
         * New object created
         */
        this.okMessage('Logger created!');
    };

    /**
     * New object to display messages inside a engine to debuging
     */
    _engine.engineLogger = new _engine.logger();
    _engine.engineLogger.enable();

    //#Loading
    _engine.isLoaded = false;
    
    /**
     * Function that works while page loading
     * Should be redefined
     */
    _engine.loading = function(){
        _engine.engineLogger.errorMessage('Loading function is not defined');
    }

    /**
     * Function that work once when page loaded
     * Should be redefined
     */
    _engine.onload = function(){
        _engine.engineLogger.errorMessage('On load function is not defined');
    }

    /**
     * Function that control loading
     */
    window.onload = function(){
        _engine.isLoaded = true;
        _engine.onload();
    }

    //#Drawing
    /**
     * Game loop
     * Should be redefined
     */
    _engine.update = function(){
        _engine.engineLogger.errorMessage('Update function is not declared!');
    }

    /**
     * Display update function if loaded, else
     * display loading function
     * 
     * Clear screen
     * Recursive
     */
    _engine.draw = function(){
        _engine.ctx.clearRect(0, 0, _engine.width, _engine.height);
        if(_engine.isLoaded) {
            _engine.update();
        } else {
            _engine.loading();
        }

        _engine.ctx.stroke();
        requestAnimationFrame(_engine.draw);
    }

    /**
     * Help function that work once when page loaded
     */
    _engine.start = function(){
        _engine.keyBoard();
        _engine.mouse();
        _engine.touch();
        _engine.draw();
    }

    //#Rectangle
    /**
     * Class of filled rectangle
     * @param array params:
     *  x -> left top corner position X
     *  y -> left top corner position Y
     *  width -> rectangle width
     *  height -> rectangle height
     *  color -> CSS fill color
     *  button -> onDown will work as onClick
     */
    _engine.fillBox = function(params){
        let _fillBox = this;

        _fillBox.x = params.x;
        _fillBox.y = params.y;
        _fillBox.width = params.width;
        _fillBox.height = params.height;
        _fillBox.color = params.color;
        _fillBox.button = params.button;

        _fillBox.hovered = false;
        _fillBox.pressed = false;
        _fillBox.clicked = false;
        /**
         * Function work when cursor on/inside rectangle line
         * Should be redefined
         */
        _fillBox.hover = function(){
            _engine.engineLogger.errorMessage('Hover function is not declared');
        }

        /**
         * Function work when cursor escape rectangle line
         * Should be redefined
         */
        _fillBox.unhover = function(){
            _engine.engineLogger.errorMessage('Unhover function is not declared');
        }

        /**
         * Function work when cursor on/inside rectangle and mouse pressed
         * Should be redefined
         */
        _fillBox.onDown = function(){
            _engine.engineLogger.errorMessage('On mouse down function is not declared');
        }

        /**
         * Function work when cursor on/inside rectangle mouse was pressed and than released
         * Should be redefined
         */
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
                this.pressed = true;
                if(this.button) {
                    if(!this.clicked) {
                        this.onDown();
                        this.clicked = true;
                    }
                } else {
                    this.onDown();
                }
            } else if(this.hovered && this.pressed) {
                this.pressed = false;
                if(this.button) {
                    if(this.clicked) {
                        this.onUp();
                        this.clicked = false;
                    }
                } else {
                    this.onUp();
                }
            }

            _engine.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Class of stroke rectangle
     * @param array params:
     *  x -> left top corner position X
     *  y -> left top corner position Y
     *  width -> rectangle width
     *  height -> rectangle height
     *  color -> CSS line color
     *  lineWidth -> line width
     *  button -> onDown will work as onClick
     */
    _engine.strokeBox = function(params){
        let _strokeBox = this;

        _strokeBox.x = params.x;
        _strokeBox.y = params.y;
        _strokeBox.width = params.width;
        _strokeBox.height = params.height;
        _strokeBox.color = params.color;
        _strokeBox.lineWidth = params.lineWidth;
        _strokeBox.button = params.button;

        _strokeBox.hovered = false;
        _strokeBox.pressed = false;
        _strokeBox.clicked = false;
        /**
         * Function work when cursor on/inside rectangle line
         * Should be redefined
         */
        _strokeBox.hover = function(){
            _engine.engineLogger.errorMessage('Hover function is not declared');
        }

        /**
         * Function work when cursor escape rectangle line
         * Should be redefined
         */
        _strokeBox.unhover = function(){
            _engine.engineLogger.errorMessage('Unhover function is not declared');
        }

        /**
         * Function work when cursor on/inside rectangle and mouse pressed
         * Should be redefined
         */
        _strokeBox.onDown = function(){
            _engine.engineLogger.errorMessage('On mouse down function is not declared');
        }

        /**
         * Function work when cursor on/inside rectangle mouse was pressed and than released
         * Should be redefined
         */
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
                this.pressed = true;
                if(this.button) {
                    if(!this.clicked) {
                        this.onDown();
                        this.clicked = true;
                    }
                } else {
                    this.onDown();
                }
            } else if(this.hovered && this.pressed) {
                this.pressed = false;
                if(this.button) {
                    if(this.clicked) {
                        this.onUp();
                        this.clicked = false;
                    }
                } else {
                    this.onUp();
                }
            }

            _engine.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    //#Circle
    /**
     * Class of stroke rectangle
     * @param array params:
     *  x -> center X
     *  y -> center Y
     *  r -> radius
     *  color -> CSS line color
     *  lineWidth -> line width
     *  antiClockwise -> is antiClockwise
     *  fill -> is fill
     */
    _engine.circle = function(params){
        _circle = this;

        _circle.x = params.x;
        _circle.y = params.y;
        _circle.r = params.r;
        _circle.sAngle = params.sAngle;
        _circle.eAngle = params.eAngle;
        _circle.color = params.color;
        _circle.antiClockwise = params.antiClockwise;
        _circle.lineWidth = params.lineWidth;
        _circle.fill = params.fill;

        _circle.hovered = false;
        _circle.pressed = false;
        /**
         * Function work when cursor on/inside rectangle line
         * Should be redefined
         */
        _circle.hover = function(){
            _engine.engineLogger.errorMessage('Hover function is not declared');
        }

        /**
         * Function work when cursor escape rectangle line
         * Should be redefined
         */
        _circle.unhover = function(){
            _engine.engineLogger.errorMessage('Unhover function is not declared');
        }

        /**
         * Function work when cursor on/inside rectangle and mouse pressed
         * Should be redefined
         */
        _circle.onDown = function(){
            _engine.engineLogger.errorMessage('On mouse down function is not declared');
        }

        /**
         * Function work when cursor on/inside rectangle mouse was pressed and than released
         * Should be redefined
         */
        _circle.onUp = function(){
            _engine.engineLogger.errorMessage('On mouse up function is not declared');
        }
    }

    _engine.circle.prototype = {
        draw: function(){
            if((this.x + this.r <= 0 && this.x - this.r >= _engine.width && this.y + this.r >= _engine.height && this.y - this.r <= 0)) {
                return;
            }

            if(this.sAngle == undefined) {
                this.sAngle = 0;
            }

            if(this.eAngle == undefined) {
                this.eAngle = 2*Math.PI;
            }

            if(this.antiClockwise == undefined) {
                this.antiClockwise = false;
            }

            if(this.fill == undefined) {
                this.fill = false;
            }

            if(this.lineWidth == undefined) {
                _engine.ctx.lineWidth = 1;
            } else {
                _engine.ctx.lineWidth = this.lineWidth;
            }

            if(_engine.pointInCircle(_engine.mouseCoordinates, this)) {
                this.hovered = true;
                this.hover();
            } else if(this.hovered) {
                this.hovered = false;
                this.unhover();
            }
            if(this.hovered && _engine.mouseCoordinates.down) {
                this.pressed = true;
                this.onDown();
            } else if(this.hovered && this.pressed) {
                this.pressed = false;
                this.onUp();
            }

            _engine.ctx.beginPath();
            _engine.ctx.strokeStyle = this.color;
            _engine.ctx.arc(this.x, this.y, this.r, this.sAngle, this.eAngle, this.antiClockwise);

            if(this.fill) {
                _engine.ctx.fillStyle = this.color;
                _engine.ctx.fill();
            }

            _engine.ctx.closePath();
        }
    }

    //#Sprite
    /**
     * Class of sprite
     * @param array params:
     *  x -> left top corner position X
     *  y -> left top corner position Y
     *  width -> rectangle width
     *  height -> rectangle height
     *  src -> source of image
     *  angle -> angle(degree) of rotation
     */
    _engine.sprite = function(params){
        let _sprite = this;

        _sprite.image = new Image();
        _sprite.x = params.x;
        _sprite.y = params.y;
        _sprite.image.src = params.src;
        _sprite.width = params.width;
        _sprite.height = params.height;
        _sprite.angle = params.angle;

        _sprite.hovered = false;
        _sprite.pressed = false;
        /**
         * Function work when cursor on/inside rectangle line
         * Should be redefined
         */
        _sprite.hover = function(){
            _engine.engineLogger.errorMessage('Hover function is not declared');
        }

        /**
         * Function work when cursor escape rectangle line
         * Should be redefined
         */
        _sprite.unhover = function(){
            _engine.engineLogger.errorMessage('Unhover function is not declared');
        }

        /**
         * Function work when cursor on/inside rectangle and mouse pressed
         * Should be redefined
         */
        _sprite.onDown = function(){
            _engine.engineLogger.errorMessage('On mouse down function is not declared');
        }

        /**
         * Function work when cursor on/inside rectangle mouse was pressed and than released
         * Should be redefined
         */
        _sprite.onUp = function(){
            _engine.engineLogger.errorMessage('On mouse up function is not declared');
        }

        /**
         * If width and height not defined -> getting image sizes
         * Without width and height didnt work hover unhover onDown onUp functions
         */
        _sprite.image.onload = function(){
            if(_sprite.width == undefined || _sprite.height == undefined) {
                _sprite.width = this.width;
                _sprite.height = this.height;
            }
        }
    }

    _engine.sprite.prototype = {
        draw: function(){
            if(!(this.x + this.width >= 0 && this.x <= _engine.width && this.y + this.height <= _engine.height && this.y >= 0)) {
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
                this.pressed = true;
                this.onDown();
            } else if(this.hovered && this.pressed) {
                this.pressed = false;
                this.onUp();
            }
            
            if(this.angle != undefined) {
                // save the unrotated context of the canvas so we can restore it later
                _engine.ctx.save();
                  // Move registration point to the center of the canvas
                _engine.ctx.translate(this.x + this.width/2, this.y + this.height/2);
                _engine.ctx.rotate(this.angle*Math.PI/180);

                _engine.ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
                
                // Move registration point back to left top corner
                _engine.ctx.translate(-_engine.width/2, -_engine.height/2);
                // we’re done with the rotating so restore the unrotated context
                _engine.ctx.restore();
            } else {
                _engine.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        }
    }

    //#Keyboard
    _engine.isKeyboardInit = false;
    /**
     * Global array that contain pressed keys codes
    */
    _engine.pressedKeys = {};
    _engine.pressedKeysLetter = {};
    /**
     * Class that add event listeners for keyboard
     */
    _engine.keyBoard = function(){
        if(_engine.isKeyboardInit) {
            return;
        }
        _engine.isKeyboardInit = true;
        
        window.addEventListener('keydown', function(event){
            _engine.pressedKeys[event.keyCode] = true;
            if(!event.repeat) {
                _engine.pressedKeysLetter[event.key] = true;
            }
        });

        window.addEventListener('keyup', function(event){
            _engine.pressedKeys[event.keyCode] = false;
            _engine.pressedKeysLetter[event.key] = false;
        });
    }

    //#Mouse
    _engine.isMouseInit
    /**
     * Global array that contain:
     *  x -> position of cursor X
     *  y -> position of cursor Y
     *  down -> true if mouse clicked, false if not
     */
    _engine.mouseCoordinates = {
        x: null,
        y: null,
        down: false
    };

    /**
     * Class that add event listeners for mouse
     */
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

    //#Touch
    /**
     * Class that add event listeners for touch
     * 
     * @todo multitouch
     */
    _engine.touch = function(){
        if(_engine.isTouchInit) {
            return;
        }
        _engine.rect = _engine.canv.getBoundingClientRect();
        _engine.isTouchInit = false;

        window.addEventListener('touchstart', function(event){
            _engine.mouseCoordinates.down = true;
        });

        window.addEventListener('touchend', function(event){
            _engine.mouseCoordinates.down = false;
        });

        window.addEventListener('touchmove', function(event){
            _engine.mouseCoordinates.x = event.clientX - _engine,rect.left;
            _engine.mouseCoordinates.y = event.clientY - engine.rect.top;
        });

        window.addEventListener('touchcancel', function(event){
            _engine.mouseCoordinates.down = false;
        });
    }

    //#Text
    /**
     * @param array params:
     *  x -> X position
     *  y -> Y position
     *  font -> CSS font
     *  color -> CSS color
     *  align -> CSS align
     *  baseLine -> CSS text baseline
     */
    _engine.fillTextLine = function(params){
        let _fillTextLine = this;

        _fillTextLine.x = params.x;
        _fillTextLine.y = params.y;
        _fillTextLine.font = params.font;
        _fillTextLine.color = params.color;
        _fillTextLine.align = params.align;
        _fillTextLine.text = params.text;
        _fillTextLine.baseLine = params.baseLine;
    }

    _engine.fillTextLine.prototype = {
        draw: function(){
            _engine.ctx.font = this.font;
            _engine.ctx.fillStyle = this.color;
            _engine.ctx.textAlign = this.align;
            _engine.ctx.textBaseline = this.baseLine;
            _engine.ctx.fillText(this.text, this.x, this.y);
        }
    }

    //#Math things
    /**
     * @param int x1 -> x coordinate of first point
     * @param int y1 -> y coordinate of first point
     * @param int x2 -> x coordinate of second point
     * @param int y2 -> y coordinate of second point
     * 
     * OR
     * 
     * @param x1 -> object that contain x,y
     * @param y1 -> object that contain x,y
     * 
     * @return distance between points
     */
    _engine.distanceBetweenTwoPoints = function(x1, y1, x2, y2){
        if(arguments.length == 2) {
            return Math.sqrt( (x1.x - y1.x)*(x1.x - y1.x) + (x1.y - y1.y)*(x1.y - y1.y));
        }

        return Math.sqrt( (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
    }

    /**
     * @param object rect1 -> rectangle object
     * @param object rect2 -> rectangle object
     * 
     * Both must have fields: x, y
     * 
     * @return bool
     */
    _engine.intersectsTwoRectangles = function(rect1, rect2) {
        //Left top corner
        if(rect1.x >= rect2.x && rect1.x <= rect2.x + rect2.width && rect1.y >= rect2.y && rect1.y <= rect2.y + rect2.height) {
            return true;
        }

        //Right top corner
        if(rect1.x + rect1.width >= rect2.x && rect1.x + rect1.width <= rect2.x + rect2.width && rect1.y >= rect2.y && rect1.y <= rect2.y + rect2.height) {
            return true;
        }

        //Left bottom corner
        if(rect1.x >= rect2.x && rect1.x <= rect2.x + rect2.width && rect1.y + rect1.height >= rect2.y && rect1.y + rect1.height<= rect2.y + rect2.height) {
            return true;
        }

        //Right bottom corner
        if(rect1.x + rect1.width >= rect2.x && rect1.x + rect1.width <= rect2.x + rect2.width && rect1.y + rect1.height >= rect2.y && rect1.y + rect1.height <= rect2.y + rect2.height) {
            return true;
        }

        return false;
    }

    /**
     * @param point -> object that contain x, y coordinates
     * @param circle -> object that contain center(x,y) and radius(r)
     * 
     * @return bool
     */
    _engine.pointInCircle = function(point, circle){
        return (_engine.distanceBetweenTwoPoints(point.x, point.y, circle.x, circle.y) <= circle.r)
    }

    //#Cookie
    /**
     * Class that work with cookies
     */
    _engine.cookie = function(){
        let _cookie = this;

        _cookie.save = function(name, value, expires = undefined){
            let date = new Date();
            if(expires == undefined) {
                date.setTime(date.getTime() + (365*24*60*60*1000));
                expires = date.toGMTString();
            } else {
                date.setTime(date.getTime() + (expires));
                expires = date.toGMTString();
            }

            _engine.doc.cookie = name + '=' + value + '; expires=' + expires + '; path=/';
        }

        _cookie.get = function(name){
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        _cookie.delete = function(name) {
            let date = new Date();
            
            date.setTime(date.getTime() + (-1));
            expires = date.toGMTString();

            _engine.doc.cookie = name + '=' + 'value' + '; expires=' + expires + '; path=/';
        }
    }

    _engine.engineCookie = new _engine.cookie();

    //#Start engine automatically
    if(_engine.startAuto) {
        _engine.start();
    }
}
