/// <reference path='../../core/Common.d.ts' />
/// <reference path='./Constraint.d.ts' />

declare module fms.physic {
    interface ISnapOptions{
        
        
        /** [options.period] The amount of time in milliseconds taken for one complete oscillation when there is no damping. Range : [150, Infinity] */
        period: number;
        /** [options.dampingRatio] Additional damping of the spring. Range : [0, 1]. At 0 this spring will still be damped, at 1 the spring will be critically damped (the spring will never oscillate) */
        dampingRatio: number;
        /** [options.length] The rest length of the spring. Range: [0, Infinity]. */
        length : number;
        /** [options.anchor] The location of the spring's anchor, if not another physics body. */
        anchor : any;  // fms.Vector3 | Vector | fms.IPositioned
    }
}

declare module "famous/physics/constraints/Snap" {

    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  A spring constraint is like a spring force, except that it is always
     *    numerically stable (even for low periods), at the expense of introducing
     *    damping (even with dampingRatio set to 0).
     *
     *    Use this if you need fast spring-like behavior, e.g., snapping
     */
    class Snap extends Constraint{
        constructor(options?: fms.physic.ISnapOptions);
        /**
         * Set the anchor position
         */
        setAnchor(v: fms.Vector3): void;
        setAnchor(v: fms.math.Vector):  void;
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.ISnapOptions): void;
    
    }

    export = Snap;
}

