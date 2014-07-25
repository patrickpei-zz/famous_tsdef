/// <reference path='../core/Surface.d.ts' />

declare module fms {
    
    interface IVideoSurfaceOption<SIZETYPE> extends ISurfaceOption<SIZETYPE>{
        /** the size [width, height] in pixel */
        autoplay? : boolean;
    }
    
    interface IVideoSurfaceOption1 extends IVideoSurfaceOption<number> {}
    
    interface IVideoSurfaceOption2 extends IVideoSurfaceOption<boolean> {}
}

declare module "famous/surfaces/VideoSurface" {
    import Surface = require('famous/core/Surface');
    
    class VideoSurface extends Surface {
        constructor  (options?: fms.IVideoSurfaceOption1); 
        constructor  (options: fms.IVideoSurfaceOption2); 
        /**
         * Set content URL.  This will cause a re-rendering.
         * @param videoUrl
         */
         setContent(videoUrl: string): void;
        /**
         * Set internal options, overriding any default options
         *
         * @method setOptions
         *
         * @param {Object} [options] overrides of default options
         * @param {Boolean} [options.autoplay] HTML autoplay
         */
        setOptions(options: fms.IVideoSurfaceOption1): void;
        setOptions(options: fms.IVideoSurfaceOption2): void;
    }
    export = VideoSurface;
}

