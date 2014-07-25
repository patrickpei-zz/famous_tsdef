/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/EventHandler.d.ts' />

declare module fms {

    interface IScrollSyncOption{
         /** Pay attention to x changes (ScrollSync.DIRECTION_X), y changes (ScrollSync.DIRECTION_Y) or both (undefined) */
        direction?: number;
         /** End speed calculation floors at this number, in pixels per ms */
        minimumEndSpeed?: number;
         /** read from axis with greatest differential, default is false */
        rails?: boolean;
         /** scale outputs in by scalar or pair of scalars */
        scale?: any; // Number | Array.Number
        /** reset time for velocity calculation in ms */
        stallTime?: number;
    }
}



declare module "famous/inputs/ScrollSync" {
    
    import EventHandler = require('famous/core/EventHandler');
    
    // ScrollSync not extends  EventHandler, but EventHandler is mixin

    /**
     * Handles piped in mousewheel events.
     *   Emits 'start', 'update', and 'end' events with payloads including:
     *   delta: change since last position,
     *   position: accumulated deltas,
     *   velocity: speed of change in pixels per ms,
     *   slip: true (unused).
     *
     *   Can be used as delegate of GenericSync.
     */
    class ScrollSync extends EventHandler{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
        constructor (options?: fms.IScrollSyncOption);
        
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IScrollSyncOption;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IScrollSyncOption): void; 

    //   on (type:"update", handler: (event:IPayload) => void);
    }
    export = ScrollSync;
}

