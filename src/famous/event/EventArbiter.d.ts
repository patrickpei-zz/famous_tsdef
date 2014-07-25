declare module "famous/core/EventArbiter" {
    
    import EventHandler = require('famous/core/EventHandler');

    /**
     * A switch which wraps several event destinations and
     *  redirects received events to at most one of them.
     *  Setting the 'mode' of the object dictates which one
     *  of these destinations will receive events.
     */
    class EventArbiter  {
        /**
         * constructor
         * @param {Number | string} startMode initial setting of switch
         */
        constructor (startMode: string);
        constructor (startMode: number);
    
        /**
         * Set switch to this mode, passing events to the corresponding
         *   EventHandler.  If mode has changed, emits 'change' event,
         *   emits 'unpipe' event to the old mode's handler, and emits 'pipe'
         *   event to the new mode's handler.
         *
         * @param {string | number} mode indicating which event handler to send to.
         */
        setMode(mode: string): void;
        setMode(mode: number): void;
    
        /**
         * Return the existing EventHandler corresponding to this
         *   mode, creating one if it doesn't exist.
         * @return {EventHandler} eventHandler corresponding to this mode
         */
        forMode(mode: string): EventHandler;
        forMode(mode: number): EventHandler;
    
        /**
         * Trigger an event, sending to currently selected handler, if
         * it is listening for provided 'type' key.
         * @param eventType event type key (for example, 'click')
         * @param event event data
         */
        emit(eventType: string, event?: any): void;
    }
    export = EventArbiter;
}

