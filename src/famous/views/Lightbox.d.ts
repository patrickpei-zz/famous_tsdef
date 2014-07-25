/// <reference path='../core/Common.d.ts' />

declare module fms {
    interface ILightboxOptions{
        inTransform: Matrix4x4;
        inOpacity: number;
        inOrigin: fms.Origin;
        outTransform: Matrix4x4;
        outOpacity: number;
        outOrigin: fms.Origin;
        showTransform: number;
        showOpacity: number;
        showOrigin: fms.Origin;
        inTransition: boolean;
        outTransition: boolean;
        overlap: boolean;
    }
}
    
declare module "famous/views/Lightbox" {
    
    /**
     * Lightbox, using transitions, shows and hides different renderables. Lightbox can essentially be
     * thought of as RenderController with a stateful implementation and interface.
     */
    class Lightbox implements fms.IRenderable{
        constructor  (options: fms.ILightboxOptions);
        /**
         * Patches the Lightbox instance's options with the passed-in ones.
         */
        setOptions(options: fms.ILightboxOptions): void;
    
        /**
         * Show displays the targeted renderable with a transition and an optional callback to
         *  execute afterwards.
         * @param {Object} renderable The renderable you want to show.
         * @param {Transition} [transition] Overwrites the default transition in to display the
         * passed-in renderable.
         * @param {function} [callback] Executes after transitioning in the renderable.
         */
        show(renderable: fms.IRenderable, transition: fms.ITransition     , callback?: ()=>void): void;
        show(renderable: fms.IRenderable, transition: fms.INamedTransition, callback?: ()=>void): void;
        show(renderable: fms.IRenderable, transition?: fms.IFuncTransition, callback?: ()=>void): void;
    
        /**
         * Hide hides the currently displayed renderable with an out transition.
         * @param {Transition} [transition] Overwrites the default transition in to hide the
         * currently controlled renderable.
         * @param {function} [callback] Executes after transitioning out the renderable.
         */
        hide (transition: fms.ITransition     , callback?: ()=>void): void;
        hide (transition: fms.INamedTransition, callback?: ()=>void): void;
        hide (transition?: fms.IFuncTransition, callback?: ()=>void): void;
    
        render() : fms.IRenderSpec;
    }

   export = Lightbox;
}
