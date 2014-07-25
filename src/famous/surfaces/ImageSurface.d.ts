declare module "famous/surfaces/ImageSurface" {
    import Surface = require('famous/core/Surface');
    
    class ImageSurface extends Surface {
        constructor  (options?: fms.ISurfaceOption1); 
        constructor  (options: fms.ISurfaceOption2); 
        /**
         * Set content URL.  This will cause a re-rendering.
         * @param imageUrl
         */
         setContent(imageUrl: string): void;
    }
    export = ImageSurface;
}

