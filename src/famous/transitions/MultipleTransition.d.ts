/// <reference path='../core/Common.d.ts' />

declare module "famous/transitions/MultipleTransition" {
    
    /**
     * Transition meta-method to support transitioning multiple
     *   values with scalar-only methods.
     */
    class MultipleTransition<T> {
        constructor  (method : new() => fms.ITransionable<T>);
        /**
         * Set the end states with a shared transition, with optional callback.
         */
        set (state:T[], namedTransition?: fms.INamedTransition, callback? : ()=>void): void;
        set (state:T[], funcTransition: fms.IFuncTransition, callback? : ()=>void): void;
        set (state:T[], transition: fms.ITransition, callback? : ()=>void): void;
        /**
         * Reset all transitions to start state.
         */
        reset (start:T[]): void; 
        /**
         * Get the state of each transition.
         */
        get () : T[];
    }

    export = MultipleTransition;
}

