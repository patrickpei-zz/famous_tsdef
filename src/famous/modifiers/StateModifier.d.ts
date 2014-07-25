/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/Transform.d.ts' />
declare module fms {
    interface IStateModifierOptions {
       transform?: Matrix4x4;
       opacity?: number;
       origin?: Origin;
       align?: Origin;
       size?: Size;
    }
}
declare module "famous/modifiers/StateModifier" {
    
    class StateModifier implements fms.IModifier{
        constructor  (options? : fms.IStateModifierOptions); 
        /**
         * Set the transform matrix of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setTransform
         *
         * @param {Transform} transform Transform to transition to.
         * @param {Transitionable} [transition] Valid transitionable object
         * @param {Function} [callback] callback to call after transition completes
         * @return {StateModifier} this
         */
        setTransform(transform: fms.Matrix4x4, transition?: fms.ITransition     , callback?: () => void) : StateModifier;
        setTransform(transform: fms.Matrix4x4, transition:  fms.INamedTransition, callback?: () => void) : StateModifier;
        setTransform(transform: fms.Matrix4x4, transition:  fms.IFuncTransition , callback?: () => void) : StateModifier;
    
        /**
         * Set the opacity of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setOpacity
         *
         * @param {Number} opacity Opacity value to transition to.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {StateModifier} this
         */
        setOpacity(opacity: number, transition?: fms.ITransition     , callback?: () => void): StateModifier;
        setOpacity(opacity: number, transition:  fms.INamedTransition, callback?: () => void): StateModifier;
        setOpacity(opacity: number, transition:  fms.IFuncTransition , callback?: () => void): StateModifier;
    
        /**
         * Set the origin of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setOrigin
         *
         * @param {Array.Number} origin two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {StateModifier} this
         */
        setOrigin(origin: fms.Origin, transition?: fms.ITransition     , callback?: () => void) : StateModifier;
        setOrigin(origin: fms.Origin, transition:  fms.INamedTransition, callback?: () => void) : StateModifier;
        setOrigin(origin: fms.Origin, transition:  fms.IFuncTransition , callback?: () => void) : StateModifier;
        
        /**
         * Set the alignment of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setAlign
         *
         * @param {Array.Number} align two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {StateModifier} this
         */
        setAlign(align: fms.Align, transition?: fms.ITransition     , callback?: () => void) : StateModifier;
        setAlign(align: fms.Align, transition:  fms.INamedTransition, callback?: () => void) : StateModifier;
        setAlign(align: fms.Align, transition:  fms.IFuncTransition , callback?: () => void) : StateModifier;
    
    
        /**
         * Set the size of this modifier, either statically or
         *   through a provided Transitionable.
         *
         * @method setSize
         *
         * @param {Array.Number} size two element array with values between 0 and 1.
         * @param {Transitionable} transition Valid transitionable object
         * @param {Function} callback callback to call after transition completes
         * @return {StateModifier} this
         */
        setSize(size: fms.Size, transition?: fms.ITransition     , callback?: () => void) : StateModifier;
        setSize(size: fms.Size, transition:  fms.INamedTransition, callback?: () => void) : StateModifier;
        setSize(size: fms.Size, transition:  fms.IFuncTransition , callback?: () => void) : StateModifier;
        /**
         * Stop the transition.
         */
        halt(): void;
        /**
         * Get the current state of the transform matrix component.
         * @return {Object} transform provider object
         */
        getTransform(): fms.Matrix4x4;
    
        /**
         * Get the destination state of the transform component.
         * @return {Transform} transform matrix
         */
        getFinalTransform(): fms.Matrix4x4;
    
        /**
         * Get the current state of the opacity component.
         * @return {Object} opacity provider object
         */
        getOpacity(): number;
    
        /**
         * Get the current state of the origin component.
         * @return {Object} origin provider object
         */
        getOrigin(): fms.Origin;
    
        /**
         * Get the current state of the align component.
         */
        getAlign(): fms.Origin; 
        /**
         * Get the current state of the size component.
         */
        getSize(): fms.Size;
         /**
         * modifies the render spec
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
    
    }

   export = StateModifier;
}

