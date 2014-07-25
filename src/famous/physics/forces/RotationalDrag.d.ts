/// <reference path='./Drag.d.ts' />

declare module "famous/physics/forces/RotationalDrag" {
    
    import Drag = require('famous/physics/forces/Drag');

    /**
     * Rotational drag is a force that opposes angular velocity.
     * Attach it to a physics body to slow down its rotation.
     */
    class RotationalDrag extends Drag {
        public static FORCE_FUNCTIONS: fms.physic.IDragFunctions; 
        constructor(options: fms.physic.IDragOptions);
    
    }

    export = RotationalDrag;
}

