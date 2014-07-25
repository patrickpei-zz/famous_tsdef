declare module "famous/inputs/Accumulator" {
    import Transitionable = require('famous/transitions/Transitionable');

    /**
     * Accumulates differentials of event sources that emit a `delta`
     *  attribute taking a Number or Array of Number types. The accumulated
     *  value is stored in a getter/setter.
     * Generic parameter T is a Number or an Array of Numbers
     *
     */
    class Accumulator<T>{
        constructor (value: T                  , eventName?: string);
        constructor (value: Transitionable<T>  , eventName?: string);
    
        /**
         * Basic getter
         */
        get(): T; 
    
        /**
         * Basic setter
         */
        set(value: T): void;

    }
    export = Accumulator;
}

