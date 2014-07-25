/// <reference path='../core/EventHandler.d.ts' />
declare module fms {
    // TODO besser machen
    module handler {
        interface EventEmitter {}   
        interface EventHandler {}   
    }
    /**
     * InputHander is a class mixed in by the EventHandler.setInputHandler
     * trigger, subscribe, and unsubscribe functions 
     */
    class InputHandler{
        /**
         * Trigger an event, sending to all downstream handlers
         * listening for provided 'type' key.
         * @param {string} type event type key (for example, 'click')
         * @param  event event data
         * @return {EventHandler} this
         */
        trigger(type:string, event:any): InputHandler;
        /**
         * Listen for events from an upstream event handler.
         * @param {EventEmitter} source source emitter object
         * @return {EventHandler} this
         */
        subscribe(source: fms.handler.EventEmitter): InputHandler;
    
        /**
         * Stop listening to events from an upstream event handler.
         * @param {EventEmitter} source source emitter object
         * @return {EventHandler} this
         */
        unsubscribe(source: fms.handler.EventEmitter): InputHandler;
    }
    /**
     * OutputHander is a class mixed in by the EventHandler.setOutputHandler
     * pipe, unpipe, on , addListener, removeListener
     */
    class OutputHandler{
        /**
         * Add event handler object to set of downstream handlers.
         *
         * @param {EventHandler} target event handler target object
         * @return {EventHandler} passed event handler
         */
        pipe(target: fms.handler.EventHandler): OutputHandler;
        /**
         * Remove handler object from set of downstream handlers.
         *   Undoes work of "pipe".
         *
         * @method unpipe
         *
         * @param {OutputHander} target target handler object
         * @return {OutputHander} provided target
         */
        unpipe(target: fms.handler.EventHandler): OutputHandler;
        
            /**
         * Bind a callback function to an event type handled by this object.
         *
         * @method "on"
         *
         * @param type event type key (for example, 'click')
         * @param handler callback
         * @return this
         */
        on(type:string, handler: (event:any) => void) : OutputHandler; 
        /**
         * Alias for "on".
         */
        addListener(type:string, handler: (event:any) => void) : OutputHandler;
    
       /**
         * Unbind an event by type and handler.
         *   This undoes the work of "on".
         */
        removeListener(type:string, handler: (event:any) => void) : OutputHandler;
    }
}


