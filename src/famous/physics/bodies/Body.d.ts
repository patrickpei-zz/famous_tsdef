/// <reference path='../../core/Common.d.ts' />
/// <reference path='Particle.d.ts' />

declare module fms.physic {
    interface IBodyOptions extends fms.physic.IParticleOptions{
        /** The orientation of the Body */
        orientation?: fms.Vector4;
        /** The angular velocity of the Body */
        angularVelocity?: fms.Vector3;
        /** The angular momentum of the Body */
        angularMomentum?: fms.Vector3;
        /** The torque of the Body */
        torque?: fms.Vector3;
    }
}

declare module "famous/physics/bodies/Body" {

    import Vector = require('famous/math/Vector');
    import Particle = require('famous/physics/bodies/Particle');

    /**
     * A unit controlled by the physics engine which extends the zero-dimensional
     * Particle to include geometry. In addition to maintaining the state
     * of a Particle its state includes orientation, angular velocity
     * and angular momentum and responds to torque forces.
     */
    class Body extends Particle{
        static isBody: boolean;
        constructor (options: fms.physic.IBodyOptions);
        
        /**
         * Setter for moment of inertia, which is necessary to give proper
         * angular inertia depending on the geometry of the body.
         *
         * @method setMomentsOfInertia
         */
        setMomentsOfInertia(): void;
    
    
    
        /**
         * Extends Particle.reset to reset orientation, angular velocity
         * and angular momentum.
         */
        // reset(position? : fms.Vector3, velocity? : fms.Vector3, orientation?: fms.Vector4, angularMomentum?: fms.Vector3): void;
    
        /**
         * Setter for orientation
         */
        setOrientation(orientation?: fms.Vector4): void;
    
        /**
         * Setter for angular velocity
         */
        setAngularVelocity(velocity? : fms.Vector3): void;
    
        /**
         * Setter for angular momentum
         */
        setAngularMomentum(angularMomentum: fms.Vector3): void;
    
        /**
         * Extends Particle.applyForce with an optional argument
         * to apply the force at an off-centered location, resulting in a torque.
         *
         * @method applyForce
         * @param force {Vector} force
         * @param [location] {Vector} off-center location on the body
         */
        applyForce(force: Vector, location?: Vector): void;
    
        /**
         * Applied a torque force to a body, inducing a rotation.
         *
         * @method applyTorque
         * @param torque {Vector} torque
         */
        applyTorque(torque: Vector): void;
    }

   export = Body;
}

