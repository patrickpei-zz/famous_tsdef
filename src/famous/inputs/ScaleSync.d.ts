/// <reference path='../core/Common.d.ts' />

declare module fms {
    interface ScaleEvent{
        /** the event count (only by start event) */ 
        count?: number;
        /** the center of the scale event*/ 
        center: fms.Point2d;
        /** the two touch-identifier */ 
        touches: number[];
        /** the current distance */ 
        distance: number;
        /** the delta of the scale event (only by update event) */ 
        delta? : number;
        /** the velocity of the scale event (only by update event) */ 
        velocity? : number;
        /** the scale factor if the scale event (only by update event) */ 
        scale? : number;
    }
}



declare module "famous/inputs/ScaleSync" {

    import TwoFingerSync = require('famous/inputs/TwoFingerSync');
    
    /**
     * Handles piped in two-finger touch events to increase or decrease scale via pinching / expanding.
     *   Emits 'start', 'update' and 'end' events an object with position, velocity, touch ids, distance, and scale factor.
     *   Useful for determining a scaling factor from initial two-finger touch.
     */
    class ScaleSync extends TwoFingerSync{
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

    export = ScaleSync;
}

