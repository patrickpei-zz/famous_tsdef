/// <reference path='../core/Common.d.ts' />
/// <reference path='./MouseSync.d.ts' />


declare module "famous/inputs/TouchSync" {

    import EventHandler = require('famous/core/EventHandler');
    
    /**
     * Handles piped in touch events. Emits 'start', 'update', and 'events'
     *   events with position, velocity, acceleration, and touch id.
     *   Useful for dealing with inputs on touch devices.
     */
    class TouchSync extends EventHandler{
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
    export = TouchSync;
}

