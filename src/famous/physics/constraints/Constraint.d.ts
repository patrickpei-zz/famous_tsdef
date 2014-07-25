/// <reference path='../../core/Common.d.ts' />
/// <reference path='../bodies/Particle.d.ts' />

declare module "famous/physics/constraints/Constraint" {
    
    import Particle = require('famous/physics/bodies/Particle');

    /**
     * Constraint base class.
     */
    class Constraint {
        /**
         * Constraint base class.
         *
         */
        constructor();
    
    
        /**
         * applyConstraint
         * @param targets  Array of Particle to apply the constraint to
         * @param source The source of the constraint
         * @param dt Delta time
        */
        applyConstraint(targets: Particle, source?: Particle, dt?: number ): void;
        applyConstraint(particle: Particle[], source?: Particle, dt?: number): void;
        /**
         * Getter for energy
         */
        getEnergy(): number;
    
        /**
         * Setter for energy
         */
        setEnergy(energy: number): void;
    }

    export = Constraint;
}

