/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/Transform.d.ts' />
declare module fms {
    interface IFaderOptions {
        
        /** Stops returning affected renderables up the tree when they're fully faded when true. default: false */
        cull?: boolean;
        /** @param {Transition} [options.transition=true] The main transition for showing and hiding. default: true */
        transition: boolean;
        /** @param {Transition} [options.pulseInTransition=true] Controls the transition to a pulsed state when the Fader instance's pulse method is called. default: true */
        pulseInTransition: boolean; 
        /** @param {Transition} [options.pulseOutTransition=true]Controls the transition back from a pulsed state when the Fader instance's pulse method is called. default: true */
        pulseOutTransition: boolean;
    
    


    }
}

declare module "famous/modifiers/Fader" {
    
    class Fader implements fms.IModifier{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
    
        constructor  (options? : fms.IFaderOptions); 
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IFaderOptions): void;
        /**
         * Fully displays the Fader instance's associated renderables.
         * @param {Transition} [transition] The transition that coordinates setting to the new state.
         * @param {Function} [callback] A callback that executes once you've transitioned to the fully shown state.
         */
        show (transition?: fms.ITransition     , callback?: () => void) : void;
        show (transition:  fms.INamedTransition, callback?: () => void) : void;
        show (transition:  fms.IFuncTransition , callback?: () => void) : void;
    
        /**
         * Fully fades the Fader instance's associated renderables.
         * @param {Transition} [transition] The transition that coordinates setting to the new state.
         * @param {Function} [callback] A callback that executes once you've transitioned to the fully faded state.
         */
        hide (transition?: fms.ITransition     , callback?: () => void) : void;
        hide (transition:  fms.INamedTransition, callback?: () => void) : void;
        hide (transition:  fms.IFuncTransition , callback?: () => void) : void;
    
        /**
         * Manually sets the opacity state of the fader to the passed-in one. Executes with an optional
         * transition and callback.
         * @param {Number} state A number from zero to one: the amount of opacity you want to set to.
         * @param {Transition} [transition] The transition that coordinates setting to the new state.
         * @param {Function} [callback] A callback that executes once you've finished executing the pulse.
         */
        set (state: number, transition?: fms.ITransition     , callback?: () => void) : void;
        set (state: number, transition:  fms.INamedTransition, callback?: () => void) : void;
        set (state: number, transition:  fms.IFuncTransition , callback?: () => void) : void;
    
    
        /**
         * Halt the transition
         */
        halt(): void;
    
        /**
         * Tells you if your Fader instance is above its visibility threshold.
         */
        isVisible(): boolean;
    
        /**
         * Return render spec for this Modifier, applying to the provided
         *    target component.  This is similar to render() for Surfaces.
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
    
    }
    export = Fader;
}

