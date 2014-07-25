/// <reference path='../../core/Common.d.ts' />
/// <reference path='../bodies/Particle.d.ts' />


declare module "famous/physics/forces/Force" {

    import Particle = require('famous/physics/bodies/Particle');

    /**
     * Force base class.
     */
    class Force {
        /**
         * Force base class.
         *
         * @class Force
         * @uses EventHandler
         * @constructor
         */
        constructor(force: fms.Vector3);
    
    
        /**
         * Adds a force to a physics body's force accumulator.
         *
         * @method applyForce
         * @param particle  to apply force to
         * @param source the source of the force
         */
        applyForce(particle: Particle, source?: Particle ): void;
        applyForce(particle: Particle[], source?: Particle): void;
    
        /**
         * Getter for a force's potential energy.
         *
         * @method getEnergy
         * @return energy {Number}
         */
        getEnergy(): number;
    
        /*
         * Setter for a force's potential energy.
         *
         * @method setEnergy
         * @param energy {Number}
         */
        setEnergy(energy: number): void;
    }

    export = Force;
}

