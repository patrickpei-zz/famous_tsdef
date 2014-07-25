/// <reference path='../../core/Common.d.ts' />
/// <reference path='./Force.d.ts' />

declare module fms.physic {
  /**
   * A linear decay function
   */
   interface IRepulsionFunction{
       /**
        * @param radius distance from the source body
        * @param cutoff the effective radius of influence to avoid singularities
        */
       (radius: number, cutoff : number): number;           
   }
   interface IRepulsionFunctions{
        /**
         * A linear decay function
         * max(1 - (1 / cutoff) * radius, 0)
         */
        LINEAR : IRepulsionFunction;
        /**
         * A Morse potential decay function (http://en.wikipedia.org/wiki/Morse_potential)
         */
        MORSE : IRepulsionFunction;
        /**
         * An inverse distance decay function
         * 1 / (1 - cutoff + r)
         */
        INVERSE : IRepulsionFunction;

        /**
         * An inverse squared distance decay function
         *   1 / (1 - cutoff + r*r);
         */
        GRAVITY : IRepulsionFunction;
    }

    interface IRepulsionOptions{
        /**
         * The strength of the force
         *   Range : [0, 100]
         * @default 1
         */
        strength? : number;

        /**
         * The location of the force, if not another physics body
         */ 
        anchor? : any; // Vector | fms.Vector3 | fms.IPositioned

        /**
         * The range of the repulsive force
         * @default [0, Infinity]
         */
        range? : fms.Range;

        /**
         * A normalization for the force to avoid singularities at the origin
         * @default 0
         */
        cutoff? : number;

        /**
         * The maximum magnitude of the force
         *    Range : [0, Infinity]
         * @default Infinity
         */
        cap? : number;

        /**
         * The type of decay the repulsive force should have
         * @default Repulsion.DECAY_FUNCTIONS.GRAVITY
         */
        decayFunction? : IRepulsionFunction;
    }
}


declare module "famous/physics/forces/Repulsion" {

    import Force = require('famous/physics/forces/Force');

    /**
     *  Repulsion is a force that repels (attracts) bodies away (towards)
     *    each other. A repulsion of negative strength is attractive.
     *
     */
    class Repulsion extends Force{
        public static DECAY_FUNCTIONS: fms.physic.IRepulsionFunctions;
        /**
         * Force base class.
         *  @param {Object} options overwrites default options
         */
        constructor(options: fms.physic.IRepulsionOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IRepulsionOptions): void;
    
    }

    export = Repulsion;
}

