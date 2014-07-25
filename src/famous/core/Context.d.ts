/// <reference path='Common.d.ts' />
/// <reference path='RenderNode.d.ts' />
/// <reference path='EventEmitter.d.ts' />

declare module "famous/core/Context" {

    import EventEmitter = require('famous/core/EventEmitter');
    import RenderNode = require('famous/core/RenderNode');

    class Context extends EventEmitter{
        constructor  (container : Element); 
        
        
        /**
         * Add renderables to this Context's render tree.
         */
        add (renderable: fms.IRenderable): RenderNode;
        add (modifier: fms.IModifier): RenderNode;
    
        /**
         * Move this Context to another containing document element.
         */
        migrate(container: Element): void;
    
        /**
         * Gets viewport size for Context.
         */
        getSize(): fms.Size;
    
        /**
         * Sets viewport size for Context.
         *
         */
        setSize(size: fms.Size): void;
        /**
         * Get current perspective of this context in pixels.
         */
        getPerspective() : number;
        /**
         * Set current perspective of this context in pixels.
         *
         * @method setPerspective
         * @param {Number} perspective in pixels
         * @param {Object} [transition] Transitionable object for applying the change
         * @param {function(Object)} callback function called on completion of transition
         */
        setPerspective(perspective:number, transition: fms.ITransition     , callback?: ()=>void): void;
        setPerspective(perspective:number, transition: fms.INamedTransition, callback?: ()=>void): void;
        setPerspective(perspective:number, transition?: fms.IFuncTransition, callback?: ()=>void): void;
    }

   export = Context;
}


