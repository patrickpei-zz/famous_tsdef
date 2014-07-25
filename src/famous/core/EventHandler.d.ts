declare module "famous/core/EventHandler" {
    
    import EventEmitter = require('famous/core/EventEmitter');

    class EventHandler extends EventEmitter {
        /**
         * Assign an event handler to receive an object's input events.
         *
         * @param {Object} object object to mix trigger, subscribe, and unsubscribe functions into
         * @param {EventHandler} handler assigned event handler
         */
        static setInputHandler(object:any, handler:EventHandler): void;
    
        /**
         * Assign an event handler to receive an object's output events.
         *
         * @param {Object} object object to mix pipe, unpipe, on, addListener, and removeListener functions into
         * @param {EventHandler} handler assigned event handler
         */
        static setOutputHandler(object:any, handler:EventHandler): void;
    
    
        /**
         * Add event handler object to set of downstream handlers.
         *
         * @param {EventHandler} target event handler target object
         * @return {EventHandler} passed event handler
         */
        pipe(target:EventHandler): EventHandler;
        /**
         * Remove handler object from set of downstream handlers.
         *   Undoes work of "pipe".
         *
         * @method unpipe
         *
         * @param {EventHandler} target target handler object
         * @return {EventHandler} provided target
         */
        unpipe(target:EventHandler): EventHandler;
    
    
        /**
         * Listen for events from an upstream event handler.
         *
         * @method subscribe
         *
         * @param {EventEmitter} source source emitter object
         * @return {EventHandler} this
         */
        subscribe(source: EventEmitter) : EventHandler;
    
        /**
         * Stop listening to events from an upstream event handler.
         *
         * @method unsubscribe
         *
         * @param {EventEmitter} source source emitter object
         * @return {EventHandler} this
         */
        unsubscribe(source: EventEmitter) : EventHandler;
        
    }
    export = EventHandler;
}

