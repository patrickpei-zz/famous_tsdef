/// <reference path='./InputSurface.d.ts' />

declare module "famous/surfaces/SubmitInputSurface" {
    import InputSurface = require('famous/surfaces/InputSurface');
    
    class SubmitInputSurface extends InputSurface {
        constructor  (options?: fms.IInputSurfaceOption1); 
        constructor  (options: fms.IInputSurfaceOption2); 
    }
    export = SubmitInputSurface;
}

