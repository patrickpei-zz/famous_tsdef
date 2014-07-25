/// <reference path='../core/Common.d.ts' />

declare module "famous/transitions/TransitionableTransform" {
    
    /**
     * A class for transitioning the state of a Transform by transitioning
     * its translate, scale, skew and rotate components independently.
     */
    class TransitionableTransform {
        
        constructor  (transform? : fms.Matrix4x4);
        /**
         * An optimized way of setting only the translation component of a Transform
         */
        setTranslate (translate: fms.Vector3, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        setTranslate (translate: fms.Vector3, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        setTranslate (translate: fms.Vector3, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * An optimized way of setting only the scale component of a Transform
         */
        setScale (scale: fms.Vector3, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        setScale (scale: fms.Vector3, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        setScale (scale: fms.Vector3, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * An optimized way of setting only the rotational component of a Transform
         * @param eulerAngles {Array}   Euler angles for new rotation state
         */
        setRotate(eulerAngles: fms.Vector3, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        setRotate(eulerAngles: fms.Vector3, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        setRotate(eulerAngles: fms.Vector3, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * An optimized way of setting only the skew component of a Transform
         */
        setSkew(skewAngles: fms.Vector3, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        setSkew(skewAngles: fms.Vector3, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        setSkew(skewAngles: fms.Vector3, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * Setter for a TransitionableTransform with optional parameters to transition
         * between Transforms
         */
        set(transform: fms.Matrix4x4, namedTransition?: fms.INamedTransition, callback? : ()=>void): TransitionableTransform;
        set(transform: fms.Matrix4x4, funcTransition? : fms.IFuncTransition , callback? : ()=>void): TransitionableTransform;
        set(transform: fms.Matrix4x4, transition?     : fms.ITransition     , callback? : ()=>void): TransitionableTransform;
    
        /**
         * Sets the default transition to use for transitioning betwen Transform states
         */
        setDefaultTransition(namedTransition?: fms.INamedTransition): void;
        setDefaultTransition(funcTransition? : fms.IFuncTransition ): void;
        setDefaultTransition(transition?     : fms.ITransition     ): void;
    
        /**
         * Getter. Returns the current state of the Transform
         */
        get(): fms.Matrix4x4;
    
        /**
         * Get the destination state of the Transform
         */
        getFinal(): fms.Matrix4x4;

        /**
         * Is there at least one action pending completion?
         */
        isActive(): boolean;
        /**
         * Halt transition at current state and erase all pending actions.
         */
        halt (): void;
    }

    export = TransitionableTransform;
}

