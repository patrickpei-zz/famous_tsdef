/// <reference path='../../core/Common.d.ts' />
/// <reference path='./Constraint.d.ts' />

declare module fms.physic {

    interface ICollisionOptions{
        /**  The energy ratio lost in a collision (0 = stick, 1 = elastic) Range : [0, 1], default is 0.5 */
        restitution: number;
        /**   Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1], default is 0.5  */
        drift: number;
        /**  Amount of penetration in pixels to ignore before collision event triggers, default 0*/
        slop : number;

    }
}


declare module "famous/physics/constraints/Collision" {

    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  Allows for two circular bodies to collide and bounce off each other.
     *  @param {Options} [options] An object of configurable options.
     *
     */
    class Collision extends Constraint{
        constructor(options?: fms.physic.ICollisionOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.ICollisionOptions): void;
    
    }
   export = Collision;
}

