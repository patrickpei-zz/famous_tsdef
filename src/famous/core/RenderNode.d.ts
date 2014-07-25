/// <reference path='EventHandler.d.ts' />
/// <reference path='Common.d.ts' />


declare module "famous/core/RenderNode" {
    class RenderNode implements fms.IRenderable{
        constructor  (renerableObj: fms.IRenderable); 
    
        /**
         * Add a child renderable to the view.
         *   Note: This is meant to be used by an inheriting class
         *   rather than from outside the prototype chain.
         *
         * @method add
         * @return {RenderNode}
         * @protected
         */
        add(renderable: fms.IRenderable) : RenderNode;
        add(...renderable: fms.IRenderable[]) : RenderNode;
        
        add(modifier: fms.IModifier) : RenderNode;
    
        
        get () : fms.IRenderable;
        set (renerableObj: fms.IRenderable): void;
        render() : fms.IRenderSpec;
    
        /**
         * Return size of contained element.
         *
         * @method getSize
         * @return {Array.Number} [width, height]
         */
        getSize(): fms.Size;
    }

    export = RenderNode;
}

