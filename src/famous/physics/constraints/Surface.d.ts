/// <reference path='../../core/Common.d.ts' />
/// <reference path='./Constraint.d.ts' />

declare module fms.physic {
    interface ISurfaceOptions{
        /**   An implicitly defined surface f(x,y,z) = 0 that body is constrained to e.g. function(x,y,z) { x*x + y*y - r*r } corresponds corresponds to a sphere of radius r pixels, default is no surface */
        equation: (x: number, y: number, z: number)=>number;
        /**  The spring-like reaction when the constraint is violated */
        period? : number;
        /** The damping-like reaction when the constraint is violated */
        dampingRatio? : number;
    }
}


declare module "famous/physics/constraints/Surface" {

    import Constraint = require('famous/physics/constraints/Constraint');
    
    /**
     *  A constraint that keeps a physics body on a given implicit surface
     *    regardless of other physical forces are applied to it.
     */
    class Surface extends Constraint{
        constructor(options: fms.physic.ISurfaceOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.ISurfaceOptions): void;
    }

   export = Surface;
}

