/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/EventHandler.d.ts' />

declare module fms {
    interface MouseEvent{
        /** delta is ether an array of 2 numbers or a number */
        delta    : any;
        position : any;
        velocity : any; 
        clientX  : number;
        clientY  : number;
        offsetX  : number;
        offsetY  : number;
    }
    
    interface IMouseSyncOption extends fms.IScalable{
         /** read from a particular axis, default is undefined*/
        direction?: number;
         /** read from axis with greatest differential, default is false */
        rails?: boolean;
         /** add listened to document on mouseleave, default is true */
        propogate?: boolean;
    }
    

}



declare module "famous/inputs/MouseSync" {
    
    import EventHandler = require('famous/core/EventHandler');
    
    // MouseSync not extends  EventHandler, but EventHandler is mixin

    /**
     * Handles piped in mouse drag events. Outputs an fms.MouseEvent instance with two
     *   properties, position and velocity.
     *   Emits 'start', 'update' and 'end' events with DOM event passthroughs,
     *   with position, velocity, and a delta key.
     */
    class MouseSync extends EventHandler{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
        constructor (options?: fms.IMouseSyncOption);
        
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IMouseSyncOption;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IMouseSyncOption): void; 

    //   on (type:"update", handler: (event:IPayload) => void);
    }
    export = MouseSync;
}

