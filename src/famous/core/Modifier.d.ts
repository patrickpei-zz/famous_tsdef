/// <reference path='Transform.d.ts' />

declare module fms {
    interface IModifierOptions<TRANSFORM>{
        /** the origin adjustment [x, y] in pixel */
        origin? : number[];
        /** affine transformation matrix */
        transform? : TRANSFORM;
        /** opacity */
        opacity? : Number;
        /** the size [width, height] in pixel */
        size? : number[];
    }
    interface IModifierOptionsS extends IModifierOptions<fms.Matrix4x4>{}
    interface IModifierOptionsF extends IModifierOptions<() => fms.Matrix4x4>{}
}

declare module "famous/core/Modifier" {

    class Modifier implements fms.IModifier{
        constructor  (options?: fms.IModifierOptionsS); 
        constructor  (options: fms.IModifierOptionsF); 
        
        /**
         * Function, object, or static transform matrix which provides the transform.
         * This is evaluated on every tick of the engine.
         *
         * @method transformFrom
         *
         * @param {Object} transform transform provider object
         * @return {Modifier} this
         */
        transformFrom(transform: fms.Matrix4x4): Modifier; 
        transformFrom(transform: () => fms.Matrix4x4): Modifier; 
        transformFrom(transform: fms.IValueProvider<fms.Matrix4x4>): Modifier; 
    
        /**
         * Set function, object, or number to provide opacity, in range [0,1].
         *
         * @method opacityFrom
         *
         * @param {Object} opacity provider object
         * @return {Modifier} this
         */
        opacityFrom(opacity: number): Modifier;
        opacityFrom(opacity: () => number): Modifier;
        opacityFrom(opacity: fms.IValueProvider<number>): Modifier;
    
        /**
         * Set function, object, or numerical array to provide origin, as [x,y],
         *   where x and y are in the range [0,1].
         *
         * @method originFrom
         *
         * @param {Object} origin provider object
         * @return {Modifier} this
         */
        originFrom(origin: fms.Origin): Modifier;
        originFrom(opacity: () => fms.Origin): Modifier;
        originFrom(opacity: fms.IValueProvider<fms.Origin>): Modifier;
    
        /**
         * Set function, object, or numerical array to provide align, as [x,y],
         *   where x and y are in the range [0,1].
         *
         * @method alignFrom
         *
         * @param {Object} align provider object
         * @return {Modifier} this
         */
        alignFrom(align: fms.Align): Modifier;
        alignFrom(align: () => fms.Align): Modifier;
        alignFrom(align: fms.IValueProvider<fms.Align>): Modifier;
        /**
         * Set function, object, or numerical array to provide size, as [width, height].
         *
         * @method sizeFrom
         *
         * @param {Object} size provider object
         * @return {Modifier} this
         */
        sizeFrom(align: fms.Size): Modifier;
        sizeFrom(align: () => fms.Size): Modifier;
        sizeFrom(align: fms.IValueProvider<fms.Size>): Modifier;
    
         /**
         * Deprecated: Prefer transformFrom with static Transform, or use a TransitionableTransform.
         * @deprecated
         * @method setTransform
         *
         * @param {Transform} transform Transform to transition to
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setTransform(transform: fms.Matrix4x4, transition: fms.INamedTransition, callback?: ()=> void): Modifier;
        setTransform(transform: () => fms.Matrix4x4, transition: fms.INamedTransition, callback?: ()=> void): Modifier;
        setTransform(transform: fms.IValueProvider<fms.Matrix4x4>, transition: fms.INamedTransition, callback?: ()=> void): Modifier;
        /**
         * Deprecated: Prefer opacityFrom with static opacity array, or use a Transitionable with that opacity.
         * @deprecated
         * @method setOpacity
         *
         * @param {Number} opacity Opacity value to transition to.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setOpacity(opacity: number, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setOpacity(opacity: ()=>number, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setOpacity(opacity: fms.IValueProvider<number>, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        /**
         * Deprecated: Prefer originFrom with static origin array, or use a Transitionable with that origin.
         * @deprecated
         * @method setOrigin
         *
         * @param {Array.Number} origin two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setOrigin(origin: fms.Origin, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setOrigin(origin: ()=>fms.Origin, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setOrigin(origin:fms.IValueProvider<fms.Origin>, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
    
        /**
         * Deprecated: Prefer alignFrom with static align array, or use a Transitionable with that align.
         * @deprecated
         * @method setAlign
         *
         * @param {Array.Number} align two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setAlign(align: fms.Align, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setAlign(align: ()=>fms.Align, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setAlign(align: fms.IValueProvider<fms.Align>, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
    
        /**
         * Deprecated: Prefer sizeFrom with static origin array, or use a Transitionable with that size.
         * @deprecated
         * @method setSize
         * @param {Array.Number} size two element array of [width, height]
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {Modifier} this
         */
        setSize(size: fms.Size, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setSize(size: ()=>fms.Size, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
        setSize(size: fms.IValueProvider<fms.Size>, transition: fms.INamedTransition, callback?: ()=>void): Modifier;
    
        /**
         * Deprecated: Prefer to stop transform in your provider object.
         * @deprecated
         * @method halt
         */
        halt(): void;
        /**
         * Deprecated: Prefer to use your provided transform or output of your transform provider.
         * @deprecated
         * @method getTransform
         * @return {Object} transform provider object
         */
        getTransform(): fms.IValueProvider<fms.Matrix4x4>;
    
        /**
         * Deprecated: Prefer to determine the end state of your transform from your transform provider
         * @deprecated
         * @method getFinalTransform
         * @return {Transform} transform matrix
         */
        getFinalTransform(): fms.Matrix4x4;
    
        /**
         * Deprecated: Prefer to use your provided opacity or output of your opacity provider.
         * @deprecated
         * @method getOpacity
         * @return {Object} opacity provider object
         */
        getOpacity(): fms.IValueProvider<number>;
    
        /**
         * Deprecated: Prefer to use your provided origin or output of your origin provider.
         * @deprecated
         * @method getOrigin
         * @return {Object} origin provider object
         */
        getOrigin(): fms.IValueProvider<fms.Origin>;
    
        /**
         * Deprecated: Prefer to use your provided align or output of your align provider.
         * @deprecated
         * @method getAlign
         * @return {Object} align provider object
         */
        getAlign(): fms.IValueProvider<fms.Align>;
    
        /**
         * Deprecated: Prefer to use your provided size or output of your size provider.
         * @deprecated
         * @method getSize
         * @return {Object} size provider object
         */
        getSize(): fms.IValueProvider<fms.Size>; 
        
        /**
         * modifies the render spec
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
        
    }

    export = Modifier;
}

