/// <reference path='../../core/Common.d.ts' />
/// <reference path='../../math/Vector.d.ts' />

declare module fms.physic {
    interface IParticleOptions{
        /** The position of the particle */
        position? : fms.Vector3;
        /** The velocity of the particle */
        velocity? : fms.Vector3;
        /** The mass of the particle */
        mass? : number;
        /** The axis a particle can move along. Can be bitwise ORed e.g., Particle.AXES.X, Particle.AXES.X | Particle.AXES.Y */
        axis? : number;
    }

    interface IAxes{
        X: number; 
        Y: number; 
        Z: number; 
    }
    
}

declare module "famous/physics/bodies/Particle" {
    
    import Vector = require('famous/math/Vector');

    /**
     * A point body that is controlled by the Physics Engine. A particle has
     *   position and velocity states that are updated by the Physics Engine.
     *   Ultimately, a particle is a _special type of modifier, and can be added to
     *   the Famous render tree like any other modifier.
     */
    class Particle implements fms.IModifier, fms.IPositioned{
        static AXES: fms.physic.IAxes; 
        static isBody: boolean;
        public position:Vector;    
        constructor  (options?: fms.physic.IParticleOptions); 
        /**
         * Stops the particle from updating
         * @method sleep
         */
        public sleep() : void;
    
        /**
         * Starts the particle update
         * @method wake
         */
        wake() : void;
        
        /**
         * Basic setter for position
         * @param position {Array|Vector}
         */
        setPosition(position: fms.Vector3) : void;
        setPosition(position: Vector) : void;
    
        /**
         * 1-dimensional setter for position
         * @method setPosition1D
         * @param value {Number}
         */
        setPosition1D(x: number) : void;
    
        /**
         * Basic getter function for position
         * @method getPosition
         * @return position {Array}
         */
        getPosition(): fms.Vector3;
        /**
         * 1-dimensional getter for position
         * @method getPosition1D
         * @return value {Number}
         */
        getPosition1D(): number;
    
        /**
         * Defines the position from outside the Physics Engine
         * @method positionFrom
         * @param positionGetter {Function}
         */
        positionFrom(positionGetter: ()=> fms.Vector3) : void;
    
        /**
         * Basic setter function for velocity Vector
         * @method setVelocity
         * @function
         */
        setVelocity(velocity: number) : void;
        setVelocity(velocity: Vector) : void;
        setVelocity(velocity: fms.Vector3) : void;
    
        /**
         * 1-dimensional setter for velocity
         * @method setVelocity1D
         * @param velocity {Number}
         */
        setVelocity1D(x: number) : void;
    
        /**
         * Basic getter function for velocity Vector
         * @method getVelocity
         * @return velocity {Array}
         */
        getVelocity(): fms.Vector3;
    
        /**
         * 1-dimensional getter for velocity
         * @method getVelocity1D
         * @return velocity {Number}
         */
        getVelocity1D(): number;
    
        /**
         * Basic setter function for mass quantity
         * @method setMass
         * @param mass {Number} mass
         */
        setMass(mass: number) : void;
    
        /**
         * Basic getter function for mass quantity
         * @method getMass
         * @return mass {Number}
         */
        getMass(): number;
    
        /**
         * Reset position and velocity
         * @method reset
         * @param position {Array|Vector}
         * @param velocity {Array|Vector}
         */
        reset(position? : fms.Vector3, velocity? : fms.Vector3, orientation?: fms.Vector4, angularMomentum?: fms.Vector3): void;
        reset(position? : Vector, velocity? : Vector): void;
    
        /**
         * Add force vector to existing internal force Vector
         * @method applyForce
         * @param force {Vector}
         */
        applyForce(force: Vector) : void;
    
        /**
         * Add impulse (change in velocity) Vector to this Vector's velocity.
         * @method applyImpulse
         * @param impulse {Vector}
         */
        applyImpulse(impulse: Vector) : void;
    
        /**
         * Get kinetic energy of the particle.
         * @method getEnergy
         * @function
         */
        getEnergy(): number;
    
        /**
         * Generate transform from the current position state
         * @method getTransform
         * @return Transform {Transform}
         */
        getTransform(): fms.Matrix4x4;
        /**
         * The modify interface of a Modifier
         * @method modify
         * @param target {Spec}
         * @return Spec {Spec}
         */
        modify (renderSpec: fms.IRenderSpec): fms.IRenderSpec;
    }
    
    export = Particle;
}

