/// <reference path='Transform.d.ts' />


declare module "famous/core/Scene" {
    import RenderNode = require('famous/core/RenderNode');
    /**
     * Builds and renders a scene graph based on a declarative structure definition.
     * See the Scene examples in the examples distribution (http://github.com/Famous/examples.git).
     */
    class Scene implements fms.IRenderable {
        public id: {[key: string]: RenderNode}; 
        /**
         * constructor
         * @param definition definition in the format of a render spec.
         */
        constructor  (definition?: fms.IRenderSpecElement); 
        
        /**
         * Clone this scene
         * @return {Scene} deep copy of this scene
         */
        create(): Scene;
        /**
         * Builds and renders a scene graph based on a canonical declarative scene definition.
         * See examples/Scene/example.js.
         * @param definition definition in the format of a render spec.
         */
        load(definition: fms.IRenderSpecElement): void;
    
        /**
         * Add renderables to this component's render tree
         *
         * @method add
         *
         * @param {Object} obj renderable object
         * @return {RenderNode} Render wrapping provided object, if not already a RenderNode
         */
        add(obj: fms.IRenderable): RenderNode;
        
        /**
         * modifies the render spec
         */
        render(): fms.IRenderSpec;
        
    }

    export = Scene;
}

