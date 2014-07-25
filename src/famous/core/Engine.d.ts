/// <reference path='Context.d.ts' />

declare module "famous/core/Engine" {

    import Context = require('famous/core/Context');
    import EventHandler = require('famous/core/EventHandler');

    class Engine {
        static createContext() : Context;
        /**
         * Bind a callback function to an event type handled by this object.
         *
         * @method "on"
         *
         * @param {string} type event type key (for example, 'click')
         * @param {function(string, Object)} fn handler callback
         * @return {EventHandler} this
         */
        static on (type:string, fn: (event:any) => void): EventHandler;
        static on (type:"click", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mousedown", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mousemove", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mouseup", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mouseover", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"mouseout", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"touchstart", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"touchmove", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"touchend", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"touchcancel", fn: (event:MouseEvent) => void): EventHandler;
        static on (type:"keydown", fn: (event:KeyboardEvent) => void): EventHandler;
        static on (type:"keyup", fn: (event:KeyboardEvent) => void): EventHandler;
        static on (type:"keypress", fn: (event:KeyboardEvent) => void): EventHandler;
    
    
        /**
         * Unbind an event by type and handler.
         *   This undoes the work of "on"
         *
         * @method removeListener
         * @param {string} type event type key (for example, 'click')
         * @param {function(string, Object)} fn handler
         */
        static removeListener(type:string, fn: (s: string, o:any) => void): void;
    
        /**
         * Trigger an event, sending to all downstream handlers
         *   listening for provided 'type' key.
         *
         * @method emit
         *
         * @param {string} type event type key (for example, 'click')
         * @param {Object} [event] event data
         * @return {EventHandler} this
         */
        static emit (type:string, fn: (s: string, o:any) => void): EventHandler;
        
        /**
         * Add event handler object to set of downstream handlers.
         *
         * @method pipe
         *
         * @param {EventHandler} target event handler target object
         * @return {EventHandler} passed event handler
         */
        static pipe(target: EventHandler): EventHandler;
        
        /**
         * Remove handler object from set of downstream handlers.
         *   Undoes work of "pipe"
         *
         * @method unpipe
         *
         * @param {EventHandler} target target handler object
         * @return {EventHandler} provided target
         */
        static unpipe(target: EventHandler): EventHandler;
    }
    export = Engine;
}
