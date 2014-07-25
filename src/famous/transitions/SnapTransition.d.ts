/// <reference path='../core/Common.d.ts' />

declare module fms {
    interface ISnapTransitionDef{
       period: number;
       dampingRation?: number;
       velocity?: number
    }
}

declare module "famous/transitions/SnapTransition" {
    /**
     * SnapTransition is a method of transitioning between two values (numbers,
     * or arrays of numbers). It is similar to SpringTransition except
     * the transition can be much faster and always has a damping effect.
     */
    class SnapTransition<T> implements fms.ITransionable<T>{
        /**
         * @param state Initial state
         */
        constructor (state? : T); 
        
            /**
         * Resets the state and velocity
         * @method reset
         */
        reset (state : T, velocity?: T) : void; 
        /**
         * Getter for velocity
         */
        getVelocity(): T;
    
        /**
         * Setter for velocity
         */
        setVelocity(velocity: T): void;

        /**
         * Detects whether a transition is in progress
         */
        isActive(): boolean;
    
        /**
         * Halt the transition
         */
        halt(): void;
    
        /**
         * Get the current position of the transition
         * @return state {Number|Array}
         */
        get(): T; 
    
        /**
         * Set the end position and transition, with optional callback on completion.
         * @param state {Number|Array}      Final state
         */
        set(state: T, definition: fms.ISnapTransitionDef, callback? : ()=>void): void
    }
    
    export = SnapTransition;
}

