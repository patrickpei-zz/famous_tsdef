declare module fms {
   interface IEventEmitter { 
      emit(type:string, event?:any) : void; 
   }        
}
declare module "famous/core/EventEmitter" {
    class EventEmitter implements fms.IEventEmitter{
        /**
         * Trigger an event, sending to all downstream handlers
         *   listening for provided 'type' key.
         *
         * @param for example, 'click'
         * @param event data
         */
        emit(type:string, event?:any) : void;
    
        /**
         * Bind a callback function to an event type handled by this object.
         *
         * @method "on"
         *
         * @param type event type key (for example, 'click')
         * @param handler callback
         * @return this
         */
        on(type:string, handler: (event:any) => void) : void; 
        /**
         * Alias for "on".
         */
        addListener(type:string, handler: (event:any) => void) : void;
    
       /**
         * Unbind an event by type and handler.
         *   This undoes the work of "on".
         */
        removeListener(type:string, handler: (event:any) => void) : void;
    
        /**
         * Call event handlers with this set to owner.
         * @param owner object this EventEmitter belongs to
         */
        bindThis(owner: any): void;
    
    }
    export = EventEmitter;
}
