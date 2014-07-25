/// <reference path='../core/Common.d.ts' />

declare module fms {
    interface PinchEvent{
        /** the event count (only by start event) */ 
        count?: number;
        /** the center of the pinch event*/ 
        center: fms.Point2d;
        /** the two touch-identifier */ 
        touches: number[];
        /** the current distance */ 
        distance: number;
        /** the delta of the pinch event (only by update event) */ 
        delta? : number;
        /** the velocity of the pinch event (only by update event) */ 
        velocity? : number;
        displacement? : number;
    }
}

declare module "famous/inputs/PinchSync" {

    import TwoFingerSync = require('famous/inputs/TwoFingerSync');
    
    /**
     * Handles piped in two-finger touch events to change position via pinching / expanding.
     *   Emits 'start', 'update' and 'end' events with
     *   position, velocity, touch ids, and distance between fingers.
     */
    class PinchSync extends TwoFingerSync{
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

    export = PinchSync;
}

