declare module "famous/core/EventFilter" {
    
    import EventHandler = require('famous/core/EventHandler');

    /**
     * EventFilter regulates the broadcasting of events based on
     *  a specified condition function of standard event type: function(type, data).
     */
    class EventFilter extends EventHandler {
        /**
         * @param condition function to determine whether or not events are emitted.
         */
        constructor (condition: (type: string, event?: any) => boolean);
    }
    export = EventFilter;
}

