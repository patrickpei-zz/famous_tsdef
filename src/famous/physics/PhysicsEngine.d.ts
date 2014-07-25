/// <reference path='bodies/Particle.d.ts' />
/// <reference path='bodies/Body.d.ts' />

declare module fms.physic {
    interface IAgent{
            
    }
    interface IPhysicsEngineOptions{
        /**
         * The number of iterations the engine takes to resolve constraints
         * @attribute constraintSteps
         * @type Number
         */
        constraintSteps? : number;

        /**
         * The energy threshold before the Engine stops updating
         * @attribute sleepTolerance
         * @type Number
         */
        sleepTolerance? : number;
    }
}

declare module "famous/physics/PhysicsEngine" {
    
    import Vector = require('famous/math/Vector');
    import Particle = require('famous/physics/bodies/Particle');
    import Body = require('famous/physics/bodies/Body');
    
    class PhysicsEngine {
        constructor  (options?: fms.physic.IPhysicsEngineOptions); 
        
        /**
         * Options setter
         * @method setOptions
         * @param options {Object}
         */
        public setOptions(opts: fms.physic.IPhysicsEngineOptions): void;
        /**
         * Method to add a physics body to the engine. Necessary to update the
         * body over time.
         *
         */
        addBody<P extends Particle> (particle: P): P;
    
        /**
         * Remove a body from the engine. Detaches body from all forces and
         * constraints.
         */
        removeBody (particle: Particle): void;
        /**
         * Attaches a force or constraint to a Body. Returns an AgentId of the
         * attached agent which can be used to detach the agent.
         *
         * @method attach
         * @param agent {Agent|Array.Agent} A force, constraint, or array of them.
         * @param [targets=All] {Body|Array.Body} The Body or Bodies affected by the agent
         * @param [source] {Body} The source of the agent
         * @return AgentId {Number}
         */
        attach(agents: fms.physic.IAgent, targets: Particle[], source?: Particle): number;
        attach(agents: fms.physic.IAgent[], targets: Particle[], source?: Particle): number[];
    
        /**
         * Append a body to the targets of a previously defined physics agent.
         *
         * @method attachTo
         * @param agentID {AgentId} The agentId of a previously defined agent
         * @param target {Body} The Body affected by the agent
         */
        attachTo(agentID: number, target: Particle): void;
    
        /**
         * Undoes PhysicsEngine.attach. Removes an agent and its associated
         * effect on its affected Bodies.
         *
         * @method detach
         * @param agentID {AgentId} The agentId of a previously defined agent
         */
        detach(id: number): void;
        /**
         * Remove a single Body from a previously defined agent.
         *
         * @method detach
         * @param agentID {AgentId} The agentId of a previously defined agent
         * @param target {Body} The body to remove from the agent
         */
        detachFrom(id: number, target: Body): void;
        /**
         * A convenience method to give the Physics Engine a clean slate of
         * agents. Preserves all added Body objects.
         *
         * @method detachAll
         */
        detachAll(): void;
    
        /**
         * Returns the corresponding agent given its agentId.
         *
         * @method getAgent
         * @param id {AgentId}
         */
        getAgent(id: number): fms.physic.IAgent;
    
        /**
         * Returns all particles that are currently managed by the Physics Engine.
         *
         * @method getParticles
         * @return particles {Array.Particles}
         */
        getParticles(): Particle[];
    
        /**
         * Returns all bodies, except particles, that are currently managed by the Physics Engine.
         *
         * @method getBodies
         * @return bodies {Array.Bodies}
         */
        getBodies(): Body[];
    
        /**
         * Returns all bodies that are currently managed by the Physics Engine.
         *
         * @method getBodies
         * @return bodies {Array.Bodies}
         */
        getParticlesAndBodies(): Particle[];
    
        /**
         * Iterates over every Particle and applies a function whose first
         * argument is the Particle
         *
         * @method forEachParticle
         * @param fn {Function} Function to iterate over
         * @param [dt] {Number} Delta time
         */
        forEachParticle(fn: (p: Particle, dt?: number)=>void, dt?: number): void;
    
        /**
         * Iterates over every Body that isn't a Particle and applies
         * a function whose first argument is the Body
         *
         * @method forEachBody
         * @param fn {Function} Function to iterate over
         * @param [dt] {Number} Delta time
         */
        forEachBody(fn: (b: Body, dt?: number)=>void, dt?: number): void;
    
        /**
         * Iterates over every Body and applies a function whose first
         * argument is the Body
         *
         * @method forEach
         * @param fn {Function} Function to iterate over
         * @param [dt] {Number} Delta time
         */
        forEach(fn: (p: Particle, dt?: number)=>void, dt?: number): void;
        /**
         * Calculates the kinetic energy of all Body objects and potential energy
         * of all attached agents.
         *
         * TODO: implement.
         * @method getEnergy
         * @return energy {Number}
         */
        getEnergy(): number;
    
        /**
         * Updates all Body objects managed by the physics engine over the
         * time duration since the last time step was called.
         *
         * @method step
         */
        step(): void;
        /**
         * Tells whether the Physics Engine is sleeping or awake.
         * @method isSleeping
         * @return {Boolean}
         */
        isSleeping() : boolean;
    
        /**
         * Stops the Physics Engine from updating. Emits an 'end' event.
         * @method sleep
         */
        sleep(): void;
    
        /**
         * Starts the Physics Engine from updating. Emits an 'start' event.
         * @method wake
         */
        wake(): void; 
    
        emit(type: string, data: any): void;
        on(type: 'start', fn: (e : PhysicsEngine) => void): void;
        on(type: 'end', fn: (e : PhysicsEngine) => void): void;
        on(type: string, fn: (event: any) => void): void;
    }
    export = PhysicsEngine;
}

