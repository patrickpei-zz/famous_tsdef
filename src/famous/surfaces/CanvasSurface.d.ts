declare module "famous/surfaces/CanvasSurface" {

    import Surface = require('famous/core/Surface');
    
    class CanvasSurface extends Surface {
        constructor  (options?: fms.ISurfaceOption1); 
        constructor  (options: fms.ISurfaceOption2); 
        /**
         * Set content URL.  This will cause a re-rendering.
         * @param CanvasUrl
         */
         setContent(CanvasUrl: string): void;
        /**
         * Returns the canvas element's context
         * @param {string} contextId context identifier example '2d'
         */
         getContext(contextId: '2d'): CanvasRenderingContext2D;
         getContext(contextId: string): any;
    
    
        /**
         *  Set the size of the surface and canvas element.
         *
         *  @method setSize
         *  @param {Array.number} size [width, height] of surface
         *  @param {Array.number} canvasSize [width, height] of canvas surface
         */
        setSize (size: fms.Size, canvasSize: fms.Size): void;
    }

   export = CanvasSurface;
}

