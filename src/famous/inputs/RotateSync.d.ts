/// <reference path='../core/Common.d.ts' />

declare module fms {
    interface RotateEvent{
        /** the event count (only by start event) */ 
        count?: number;
        /** the delta of the rotate event  (only by update event) */ 
        delta? : number;
        /** the velocity of the rotate event   (only by update event) */ 
        velocity?: number;
        /** the ange  of the rotate event*/ 
        angle: number;
        /** the center of the rotate event*/ 
        center: fms.Point2d;
        /** the two touch-identifier */ 
        touches: number[];
    }
}

declare module "famous/inputs/RotateSync" {

    import TwoFingerSync = require('famous/inputs/TwoFingerSync');
    
    /**
     * Helper to PinchSync, RotateSync, and ScaleSync.  Generalized handling of
     *   two-finger touch events.
     *   This class is meant to be overridden and not used directly.
     */
    class RotateSync extends TwoFingerSync{
        constructor (options?: fms.IScalable);
        /**
         * Return entire options dictionary, including defaults.
         * @return {Object} configuration options
         */
        getOptions(): fms.IScalable;
    
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IScalable): void; 

    }

    export = RotateSync;
}

