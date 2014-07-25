/// <reference path='../core/Common.d.ts' />

declare module fms {
    interface ITweenTransitionOptions{
        /** curve of the tween transition, default is TweenTransition.Curves.linear */
        curve?: fms.curveFunction;
        /** duration of the tween transition, default is 500ms */
        duration?: number;
        /** speed in pixels per ms considered only if positive */
        speed?: number;
    }
}

declare module "famous/transitions/TweenTransition" {
    /**
     * A state maintainer for a smooth transition between
     *    numerically-specified states.  Example numeric states include floats or
     *    Transfornm objects.
     *
     *    An initial state is set with the constructor or set(startValue). A
     *    corresponding end state and transition are set with set(endValue,
     *    transition). Subsequent calls to set(endValue, transition) begin at
     *    the last state. Calls to get(timestamp) provide the _interpolated state
     *    along the way.
     *
     *   Note that there is no event loop here - calls to get() are the only way
     *    to find out state projected to the current (or provided) time and are
     *    the only way to trigger callbacks. Usually this kind of object would
     *    be part of the render() path of a visible component.
     *    @param T could be number, FamousMatrix, Array.Number , Object.<number, number>
     */
    class TweenTransition<T> implements fms.ITransionable<T> {
        /**
         * Transition curves mapping independent variable t from domain [0,1] to a
         *    range within [0,1]. Includes functions 'linear', 'easeIn', 'easeOut',
         *    'easeInOut', 'easeOutBounce', 'spring'.
         */
        public static Curves: {
                linear: fms.curveFunction;
                easeIn: fms.curveFunction;
                easeOut: fms.curveFunction;
                easeInOut: fms.curveFunction;
                easeOutBounce: fms.curveFunction;
                spring: fms.curveFunction;
            }
        /**
         * Add "unit" curve to internal dictionary of registered curves.
         * @return {boolean} false if key is taken, else true
         */
        public static registerCurve(curveName: string, curve: fms.curveFunction): boolean;
        /**
         * Remove object with key "curveName" from internal dictionary of registered curves.
         * @return {boolean} false if key has no dictionary value
         */
        public static unregisterCurve(curveName: string): boolean;
    
        /**
         * Retrieve function with key "curveName" from internal dictionary of
         *    registered curves. Default curves are defined in the
         *    TweenTransition.Curves array, where the values represent
         *    unitCurve functions.
         * @return {unitCurve} curve function of one numeric variable mapping [0,1]
         *    to range inside [0,1]
         */
        public static getCurve(curveName: string):  fms.curveFunction;
        
            
        /**
         * Retrieve all available curves.
         * @return {object} curve functions of one numeric variable mapping [0,1]
         *    to range inside [0,1]
         */
        getCurves(): {[key: string]:  fms.curveFunction};

        /**
         * @param state Initial state
         */
        constructor (state? : T); 
        
    
        /**
         * Set internal options, overriding any default options.
         */
        setOptions(options: fms.ITweenTransitionOptions): void;
    
        /**
         * Add transition to end state to the queue of pending transitions. Special
         *    Use: calling without a transition resets the object to that state with
         *    no pending actions
         */
        set(endValue: T, transition: fms.ITweenTransitionOptions, callback? : ()=>void): void
    
        /**
         * Cancel all transitions and reset to a stable state
         */
        reset(startValue: T, startVelocity?: number): void;
        /**
         * Get current velocity
         * @returns {Number} velocity
         */
        getVelocity() : number;
    
        /**
         * Get interpolated state of current action at provided time. If the last
         *    action has completed, invoke its callback.
         *
         * @return {number|Object.<number|string, number>} beginning state
         *    _interpolated to this point in time.
         */
        get(timestamp?: number): T;
    
        /**
         * Is there at least one action pending completion?
         */
        isActive(): boolean;
    
        /**
         * Halt transition at current state and erase all pending actions.
         */
        halt(): void;
    }
    
    export = TweenTransition;
}

