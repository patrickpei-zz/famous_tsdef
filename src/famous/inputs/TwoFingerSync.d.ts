
declare module "famous/inputs/TwoFingerSync" {

    import EventHandler = require('famous/core/EventHandler');
    
    // TwoFingerSync not extends  EventHandler, but EventHandler is mixin
    /**
     * Helper to PinchSync, RotateSync, and ScaleSync.  Generalized handling of
     *   two-finger touch events.
     *   This class is meant to be overridden and not used directly.
     */
    class TwoFingerSync extends EventHandler{
    }

    export = TwoFingerSync;
}

