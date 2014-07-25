/// <reference path='../core/Common.d.ts' />
declare module "famous/transitions/Transitionable" {
    
    /**
     * A state maintainer for a smooth transition between
     *    numerically-specified states. Example numeric states include floats or
     *    Transform objects.
     *
     * An initial state is set with the constructor or set(startState). A
     *    corresponding end state and transition are set with set(endState,
     *    transition). Subsequent calls to set(endState, transition) begin at
     *    the last state. Calls to get(timestamp) provide the interpolated state
     *    along the way.
     *
     * Note that there is no event loop here - calls to get() are the only way
     *    to find state projected to the current (or provided) time and are
     *    the only way to trigger callbacks. Usually this kind of object would
     *    be part of the render() path of a visible component.
     *
     */
    class Transitionable<T> implements fms.ITransionable<T>{
        constructor  (start : T);
        static registerMethod (methodName:string, transitionClass:any): void;
        static unregisterMethod(methodName:string): void;
        /**
         * Add transition to end state to the queue of pending transitions. Special
         *    Use: calling without a transition resets the object to that state with
         *    no pending actions
         */
        set (state:T, namedTransition?: fms.INamedTransition, callback? : ()=>void): void;
        set (state:T, funcTransition: fms.IFuncTransition, callback? : ()=>void): void;
        set (state:T, transition: fms.ITransition, callback? : ()=>void): void;
        /**
         * Cancel all transitions and reset to a stable state
         */
        reset (start:T, startVelocity?: T): void; 
        /**
         * Add delay action to the pending action queue queue.
         * @param duration delay time (ms)
         */
        delay (duration: number, callback? : ()=>void): void;
    
        /**
         * Get interpolated state of current action at provided time. If the last
         *    action has completed, invoke its callback.
         */
        get () : T;
        /**
         * Is there at least one action pending completion?
         */
        isActive(): boolean;
        /**
         * Halt transition at current state and erase all pending actions.
         */
        halt (): void;
    }

    export = Transitionable;
}

