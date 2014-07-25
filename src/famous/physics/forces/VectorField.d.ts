/// <reference path='../../core/Common.d.ts' />
/// <reference path='../../math/Vector.d.ts' />
/// <reference path='./Force.d.ts' />

declare module fms.physic {
  /**
   * A vector field function
   */
   interface IVectorFieldFunction{
       /**
        * @param v {Vector}        Current position of physics body
        * @param option of the field
        * @return unscaled force
        */
       (v: fms.math.Vector, options : IVectorFieldOptions): number;           
   }
   interface IVectorFieldFunctions{
        /**
         * Constant force, e.g., gravity (options.direction is needed)
         */
        CONSTANT : IVectorFieldFunction;
        /**
         * Linear force
         */
        LINEAR : IVectorFieldFunction;
        /**
         * Radial force, e.g., Hookean spring
         */
        RADIAL : IVectorFieldFunction;

        /**
         * Spherical force (option.radius is needed) 
         */
        SPHERE_ATTRACTOR : IVectorFieldFunction;

        /**
         * Point attractor force, e.g., Hookean spring with an anchor (option.position is needed)
         */
        POINT_ATTRACTOR : IVectorFieldFunction;
    }

    interface IVectorFieldOptions{
        /**
         * The strength of the force
         *    Range : [0, 10]
         * @default 1
         */
        strength? : number;

        /**
         * Type of the vectorfield
         * @default VectorField.FIELDS.CONSTANT
         */
        field? : IVectorFieldFunction;
        
        /**
         * direction of a CONSTANT vectorfield 
         * @default  Vector(0,1,0)
         */
        direction?: fms.math.Vector; 
        /**
         * position of a POINT_ATTRACTOR vectorfield 
         * @default  Vector(0,0,0)
         */
        position?: fms.math.Vector; 
        /**
         * radius of a FIELDS.SPHERE_ATTRACTOR vectorfield 
         * @default  1
         */
        radius?: number;
    } 
}


declare module "famous/physics/forces/VectorField" {

    import Force = require('famous/physics/forces/Force');

    /**
     *  A force that moves a physics body to a location with a spring motion.
     *    The body can be moved to another physics body, or an anchor point.
     */
    class VectorField extends Force{
        public static FIELDS: fms.physic.IVectorFieldFunctions;
        /**
         * Force base class.
         *  @param {Object} options overwrites default options
         */
        constructor(options: fms.physic.IVectorFieldOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IVectorFieldOptions): void;
    
    }

   export = VectorField;
}

