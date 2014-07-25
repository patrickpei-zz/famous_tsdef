/// <reference path='../../core/Common.d.ts' />
/// <reference path='../../math/Vector.d.ts' />
/// <reference path='./Force.d.ts' />

declare module fms.physic {
    interface ISpringFunctions{
        /**
         * A FENE (Finitely Extensible Nonlinear Elastic) spring force
         *      see: http://en.wikipedia.org/wiki/FENE
         */
        FENE : (dist: number, rMax?: number) => number;

        /**
         * A Hookean spring force, linear in the displacement
         *      see: http://en.wikipedia.org/wiki/FENE
         */
        HOOK : (dist: number, rMax?: number) => number;
    }
    
    interface ISpringOptions{
        /**
         * The amount of time in milliseconds taken for one complete oscillation
         * when there is no damping
         *    Range : [150, Infinity]
         * @attribute period
         * @type Number
         * @default 300
         */
        period?: number;

        /**
         * The damping of the spring.
         *    Range : [0, 1]
         *    0 = no damping, and the spring will oscillate forever
         *    1 = critically damped (the spring will never oscillate)
         * @attribute dampingRatio
         * @type Number
         * @default 0.1
         */
        dampingRatio? : number;

        /**
         * The rest length of the spring
         *    Range : [0, Infinity]
         * @attribute length
         * @type Number
         * @default 0
         */
        length? : number;

        /**
         * The maximum length of the spring (for a FENE spring)
         *    Range : [0, Infinity]
         * @attribute length
         * @type Number
         * @default Infinity
         */
        maxLength? : number;

        /**
         * The location of the spring's anchor, if not another physics body
         *
         * @attribute anchor
         * @type Array
         * @optional
         */
        anchor? : fms.Vector3;

        /**
         * The type of spring force
         * @attribute forceFunction
         * @type Function
         */
        forceFunction? : (dist: number, rMax?: number) => number;

    }
}

declare module "famous/physics/forces/Spring" {

    import Force = require('famous/physics/forces/Force');

    /**
     *  A force that moves a physics body to a location with a spring motion.
     *    The body can be moved to another physics body, or an anchor point.
     *
     */
    class Spring extends Force {
        public static FORCE_FUNCTIONS: fms.physic.ISpringFunctions; 
        /**
         * Force base class.
         *
         * @class Force
         * @uses EventHandler
         * @constructor
         */
        constructor(options: fms.physic.ISpringOptions);
    
        /**
         * Basic options setter
         */
        setOptions (options: fms.physic.ISpringOptions): void;
    }

   export = Spring;
}

