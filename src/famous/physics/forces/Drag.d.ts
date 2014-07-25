/// <reference path='../../core/Common.d.ts' />
/// <reference path='../../math/Vector.d.ts' />
/// <reference path='./Force.d.ts' />

declare module fms.physic {
    interface IDragFunctions{
        /**
         * A drag force proportional to the velocity
         */
        LINEAR: (v: fms.math.Vector)=>fms.math.Vector;

        /**
         * A drag force proportional to the square of the velocity
         */
        QUADRATIC: (v: fms.math.Vector)=>fms.math.Vector;
    }
    
    interface IDragOptions{
        /**
         * The strength of the force
         *    Range : [0, 0.1]
         * @default 0.01
         */
        strength? : number;

        /**
         * The type of opposing force
         * @attribute forceFunction
         * @type Function
         */
        forceFunction? : (v: fms.math.Vector)=>fms.math.Vector;

    }
}

declare module "famous/physics/forces/Drag" {

    import Force = require('famous/physics/forces/Force');
    
    /**
     * Drag is a force that opposes velocity. Attach it to the physics engine
     * to slow down a physics body in motion.
     */
    class Drag extends Force {
        public static FORCE_FUNCTIONS: fms.physic.IDragFunctions; 
        /**
         * Drag class.
         * @class Drag
         */
        constructor(options?: fms.physic.IDragOptions);
    
        /**
         * Basic options setter
         */
        setOptions (options: fms.physic.IDragOptions): void;
    }

    export = Drag;
}

