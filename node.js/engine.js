var colors = require('colors');

/**
 * 
 * @param string style -> custom css styles for canvas 
 * @param bool startAuto -> start engine(drawing) automatically 
 * @param int width -> canvas width 
 * @param int height -> canvas height
 */
function engine(startAuto = undefined) {
    //#Initialization
    
    /**
     * link to the engine object
     */
    let _engine = this;

    if(startAuto != undefined) {
        _engine.startAuto = startAuto;
    } else {
        _engine.startAuto = true;
    }

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
            console.log(msg.green);
        }

        /**
         * Show red message
         * @param string message -> message that will be displayed 
         */
        this.errorMessage = function(msg){
            console.log(msg.red);
        }

        /**
         * Show blue message
         * @param string message -> message that will be displayed 
         */
        this.infoMessage = function(msg){
            console.log(msg.blue);
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


    //#Drawing
    /**
     * Game loop
     * Should be redefined
     */
    _engine.update = function(){
        _engine.engineLogger.errorMessage('Update function is not declared!');
    }

    /**
     * Update time
     */
    _engine.delay = 100;
    /**
     * Display update function if loaded, else
     * display loading function
     * 
     * Clear screen
     * Recursive
     */
    _engine.draw = function(){
        _engine.update();
        setInterval(_engine.draw, _engine.delay);
    }

    /**
     * Help function that work once when page loaded
     */
    _engine.start = function(){
        _engine.draw();
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
     * Both must have fields: x, y, width, height
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
        if(rect1.x >= rect2.x && rect1.x <= rect2.x + rect2.width && rect1.y + rect1.height >= rect2.y && rect1.y + rect1.height <= rect2.y + rect2.height) {
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
            if (parts.length == 2) {
                return parts.pop().split(";").shift();   
            }
        }

        _cookie.delete = function(name) {
            let date = new Date();
            
            date.setTime(date.getTime() + (-1));
            expires = date.toGMTString();

            _engine.doc.cookie = name + '=' + 'value' + '; expires=' + expires + '; path=/';
        }
    }

    _engine.engineCookie = new _engine.cookie();

    //#LocalStorage
    /**
     * Class that work with local storage
     */
    _engine.localStorage = function(){
        let _localStorage = this;

        _localStorage.save = function(name, value){
            try {
                localStorage.setItem(name, value);
                return true;
            } catch(e) {
                return false;
            }
        }

        _localStorage.get = function(name){
            return localStorage.getItem(name);
        }

        _localStorage.delete = function(name){
            localStorage.removeItem(name);
        }

        _localStorage.clear = function(){
            localStorage.clear();
        }

        _localStorage.objectsCount = function(){
            return localStorage.length;
        }

        _localStorage.used = function(){
            let data = '';

            for(let key in window.localStorage) {
                if(window.localStorage.hasOwnProperty(key)){
                    data += window.localStorage[key] + key;
                }
            }

            return data.length;
        }

        _localStorage.freeSpace = function(){
            
        }
    }

    _engine.engineLocalStorage = new _engine.localStorage();

    //#Network
    /**
     * Internet
     */
    _engine.internet = function(){
        /**
         * @return bool true if online, else false
         */
        this.checkConnection = function(){
            return navigator.onLine;
        }
    }
    
    /**
     * #Socket
     * @params array params:
     * url -> url
     * protocols -> array of protokols
     */
    _engine.socket = function(params){
        _socket = this;

        if(params.url == undefined) {
            return;
        }

        _socket.url = params.url;

        if(params.protocols != undefined) {
            _socket.protocols = params.protocols;
        } else {
            _socket.protocols = [];
        }

        _socket.onopen = function(){
            _engine.engineLogger.errorMessage('Socket on open function is not declared');
        }

        _socket.onclose = function(){
            _engine.engineLogger.errorMessage('Socket on close function is not declared');
        }

        _socket.onmessage = function(){
            _engine.engineLogger.errorMessage('Socket on message function is not declared');
        }

        _socket.socket = new WebSocket(_socket.url, _socket.protocols);
        
        _socket.socket.onopen = function(event){
            _socket.onopen(event);
        }
        
        _socket.socket.onclose = function(event){
            _socket.onclose(event);
        }

        _socket.socket.onmessage = function(event){
            _socket.onmessage(event);
        }

        _socket.socket.onerror = function(error){
            _engine.engineLogger.errorMessage('Error: ' + error);
        }

        _socket.send = function(msg){
            if(msg != undefined && msg != null) {
                _socket.socket.send(msg);
            } else {
                _socket.socket.send('');
            }
        }
    }

    /**
     * Measure text width
     * @params array params:
     * text -> string
     * font -> string of font style
     * 
     * @return int length of line
     */
    _engine.measureText = function(params){
        _engine.ctx.font = params.font;
        return _engine.ctx.measureText(params.text).width;
    }

    //#Start engine automatically
    if(_engine.startAuto) {
        _engine.start();
    }
}
