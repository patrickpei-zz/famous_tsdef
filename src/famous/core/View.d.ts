/// <reference path='EventHandler.d.ts' />
/// <reference path='Common.d.ts' />
/// <reference path='RenderNode.d.ts' />

declare module fms {
    interface IViewOptions{
        size?: fms.Size;
    }
}

declare module "famous/core/View" {

    import EventHandler = require('famous/core/EventHandler');
    import RenderNode = require('famous/core/RenderNode');


    // View in js not extends EventHandler, but EventHandler is mixin
    /**
     * Useful for quickly creating elements within applications
     *   with large event systems.  Consists of a RenderNode paired with
     *   an input EventHandler and an output EventHandler.
     *   Meant to be extended by the developer.
     */
    class View<T extends fms.IViewOptions> extends EventHandler implements fms.IRenderable{
        
    
        constructor  (options?: T); 
        _eventInput: EventHandler;
        _eventOutput: EventHandler;
        options: T;
        _node: RenderNode;
        
    
        /**
         * Look up options value by key
         */
        getOptions() : T;
    
        /**
         *  Set internal options.
         *  No defaults options are set in View.
         */
        setOptions(options: T): void;
        /**
         * Add a child renderable to the view.
         *   Note: This is meant to be used by an inheriting class
         *   rather than from outside the prototype chain.
         */
        add(renderable: fms.IRenderable) : RenderNode;
        add(...renderable: fms.IRenderable[]) : RenderNode;
        /**
         * Alias for add
         */
        _add(renderable: fms.IRenderable) : RenderNode;
        
        /**
         * Add a modifier to the view.
         */
        add(modifier: fms.IModifier) : RenderNode;
        /**
         * Alias for add
         */
        _add(modifier: fms.IModifier) : RenderNode;
        
        /**
         * Generate a render spec from the contents of this component.
         */
        render() : fms.IRenderSpec;
    
        /**
         * Return size of contained element.
         *
         * @method getSize
         * @return {Array.Number} [width, height]
         */
        getSize(): fms.Size;
    }

    export = View;
}

