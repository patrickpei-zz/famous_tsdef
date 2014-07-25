/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/RenderNode.d.ts' />


declare module "famous/surfaces/ContainerSurface" {

    import Surface = require('famous/core/Surface');
    import RenderNode = require('famous/core/RenderNode');
    
    class ContainerSurface extends Surface {
        constructor  (options?: fms.ISurfaceOption1);
        constructor  (options: fms.ISurfaceOption2);
        add (renderable: fms.IRenderable): RenderNode;
    }
   export = ContainerSurface;
}

