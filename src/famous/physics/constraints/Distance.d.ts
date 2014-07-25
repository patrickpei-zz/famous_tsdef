/// <reference path='../../core/Common.d.ts' />
/// <reference path='./Constraint.d.ts' />

declare module fms.physic {
    interface IDistanceOptions{
        /** the location of the anchor */
        anchor: any;  // fms.Vector3 | Vector | fms.IPositioned
        /** The amount of Distance from the anchor the constraint should enforce*/
        length : number;
        /** the minimum Distance before the constraint is activated. Use this property for a "rope" effect. */
        minLength : number;
        /** the spring-like reaction when the constraint is broken. */
        period : number;
        /** the damping-like reaction when the constraint is broken. */
        dampingRatio: number;
    }
}




declare module "famous/physics/constraints/Distance" {
    
    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  A constraint that keeps a physics body a given distance away from a given
     *  anchor, or another attached body.
     */
    class Distance extends Constraint{
        constructor(options?: fms.physic.IDistanceOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IDistanceOptions): void;
    
    }
    export = Distance;
}

