/// <reference path='../core/Common.d.ts' />

declare module fms {
    interface IWallTransitionDef{
       period: number;
       dampingRation?: number;
       velocity?: number;
      /**
       * The percentage of momentum transferred to the wall. default = 0.5
       */
       resitution : number;
    }
}

declare module "famous/transitions/WallTransition" {
    /**
     * WallTransition is a method of transitioning between two values (numbers,
     *   or arrays of numbers) with a bounce. Unlike a SpringTransition
     *   The transition will not overshoot the target, but bounce back against it.
     *   The behavior of the bounce is specified by the transition options.
     */
    class WallTransition<T> implements fms.ITransionable<T> {
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
         */
        set(state: T, definition: fms.IWallTransitionDef, callback? : ()=>void): void
    }
    
    export = WallTransition;
}

