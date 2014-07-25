
declare module fms {
    interface TouchTrackEvent{
        x: number;
        y: number;
        identifier : number;
        origin?: any;
        timestamp: number
        count: number;
        history: TouchTrackEvent;
    }
}


declare module "famous/inputs/TouchTracker" {
    import Transitionable = require('famous/transitions/Transitionable');

    /**
     * Helper to TouchSync – tracks piped in touch events, organizes touch
     *   events by ID, and emits track events back to TouchSync.
     *   Emits 'trackstart', 'trackmove', and 'trackend' events upstream.
     *
     */
    class TouchTracker{
        /**
         * @param selective if false, save state for each touch.
         */
        constructor (selective: boolean);

    }
    export = TouchTracker;
}

