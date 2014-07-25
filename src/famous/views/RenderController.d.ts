/// <reference path='../core/EventHandler.d.ts' />
/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />
/// <reference path='../utilities/Utility.d.ts' />
/// <reference path='./SequentialLayout.d.ts' />
/// <reference path='../core/View.d.ts' />

declare module fms {
    interface RenderControllerOptions{
      inTransition?: boolean;
      outTransition?: boolean;
      overlap?: boolean;
    }
}
declare module "famous/views/RenderController" {
    
    import View = require('famous/core/View');
    import Transitionable = require('famous/transitions/Transitionable');

    /**
     * A dynamic view that can show or hide different renerables with transitions.
     */
    class RenderController extends View<fms.RenderControllerOptions>{
    
       constructor  (options?: fms.RenderControllerOptions); 
        /**
         * As your RenderController shows a new renderable, it executes a transition in. This transition in
         *  will affect a default interior state and modify it as you bring renderables in and out. However, if you want to control
         *  the transform, opacity, and origin state yourself, you may call certain methods (such as inTransformFrom) to obtain state from an outside source,
         *  that may either be a function or a Famous transitionable. inTransformFrom sets the accessor for the state of
         *  the transform used in transitioning in renderables.
         *
         * @method inTransformFrom
         * @param {Function|Transitionable} transform  A function that returns a transform from outside closure, or a
         * a transitionable that manages a full transform (a sixteen value array).
         * @chainable
         */
        inTransformFrom(transform: Transitionable<fms.Matrix4x4>) :  RenderController;
    
        /**
         * inOpacityFrom sets the accessor for the state of the opacity used in transitioning in renderables.
         * @method inOpacityFrom
         * @param {Function|Transitionable} opacity  A function that returns an opacity from outside closure, or a
         * a transitionable that manages opacity (a number between zero and one).
         * @chainable
         */
        inOpacityFrom(opacity: Transitionable<number>) : RenderController;
    
        /**
         * inOriginFrom sets the accessor for the state of the origin used in transitioning in renderables.
         * @method inOriginFrom
         * @param {Function|Transitionable} origin A function that returns an origin from outside closure, or a
         * a transitionable that manages origin (a two value array of numbers between zero and one).
         * @chainable
         */
        inOriginFrom(origin: Transitionable<fms.Origin>) : RenderController;
    
        /**
         * outTransformFrom sets the accessor for the state of the transform used in transitioning out renderables.
         * @method show
         * @param {Function|Transitionable} transform  A function that returns a transform from outside closure, or a
         * a transitionable that manages a full transform (a sixteen value array).
         * @chainable
         */
        outTransformFrom(transform: Transitionable<fms.Matrix4x4>) : RenderController;
    
        /**
         * outOpacityFrom sets the accessor for the state of the opacity used in transitioning out renderables.
         * @method inOpacityFrom
         * @param {Function|Transitionable} opacity  A function that returns an opacity from outside closure, or a
         * a transitionable that manages opacity (a number between zero and one).
         * @chainable
         */
        outOpacityFrom(opacity: Transitionable<number>) : RenderController;
    
        /**
         * outOriginFrom sets the accessor for the state of the origin used in transitioning out renderables.
         * @method inOriginFrom
         * @param {Function|Transitionable} origin A function that returns an origin from outside closure, or a
         * a transitionable that manages origin (a two value array of numbers between zero and one).
         * @chainable
         */
        outOriginFrom(origin: Transitionable<fms.Origin>)  : RenderController;
    
        /**
         * Show displays the targeted renderable with a transition and an optional callback to
         * execute afterwards.
         */
        show(content: fms.IRenderable, transition: fms.ITransition     , callback?: ()=>void): void;
        show(content: fms.IRenderable, transition: fms.INamedTransition, callback?: ()=>void): void;
        show(content: fms.IRenderable, transition?: fms.IFuncTransition, callback?: ()=>void): void;
    
    
        /**
         * Hide hides the currently displayed renderable with an out transition.
         */
        hide (transition: fms.ITransition     , callback?: ()=>void): void;
        hide (transition: fms.INamedTransition, callback?: ()=>void): void;
        hide (transition?: fms.IFuncTransition, callback?: ()=>void): void;
     
        render() : fms.IRenderSpec;
    }

    export = RenderController;
}

