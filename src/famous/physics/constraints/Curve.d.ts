/// <reference path='../../core/Common.d.ts' />
/// <reference path='./Constraint.d.ts' />

declare module fms.physic {
    interface ICurveOptions{
        /**   An implicitly defined surface f(x,y,z) = 0 that body is constrained to e.g. function(x,y,z) { x*x + y*y - r*r } corresponds to a circle of radius r pixels, default is no surface */
        equation?: (x: number, y: number, z: number)=>number;
        /**   An implicitly defined second surface that the body is constrained to, default is the xy-surface with z = 0 */
        plane?:  (x: number, y: number, z: number)=>number;
        /**  The spring-like reaction when the constraint is violated */
        period? : number;
        /** The damping-like reaction when the constraint is violated */
        dampingRatio? : number;
    }
}




declare module "famous/physics/constraints/Curve" {

    import Constraint = require('famous/physics/constraints/Constraint');
    
    /**
     *  A constraint that keeps a physics body on a given implicit curve
     *    regardless of other physical forces are applied to it.
     *
     *    A curve constraint is two surface constraints in disguise, as a curve is
     *    the intersection of two surfaces, and is essentially constrained to both
     *
     */
    class Curve extends Constraint{
        constructor(options?: fms.physic.ICurveOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.ICurveOptions): void;
    
    }
    export = Curve;
}

