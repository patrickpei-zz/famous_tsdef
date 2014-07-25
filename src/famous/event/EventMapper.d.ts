declare module fms {
   /**
    * IEventMappingFunction returns a event emitter to determine where events are routed to.
    * if return null the event will not propagated. 
    */
   interface IEventMappingFunction { 
      (type: string, event?: any): fms.IEventEmitter; 
   }        
}


declare module "famous/core/EventMapper" {
    
    import EventHandler = require('famous/core/EventHandler');

    /**
     * EventMapper routes events to various event destinations
     *  based on custom logic.  The function signature is arbitrary.
     * @param {function} mappingFunction function to determine where
     *  events are routed to.
     */
    class EventMapper extends EventHandler {
        /**
         * mappingFunction function to determine where events are routed to.
         */
        constructor (mappingFunction: fms.IEventMappingFunction);
    }
    export = EventMapper;
}

