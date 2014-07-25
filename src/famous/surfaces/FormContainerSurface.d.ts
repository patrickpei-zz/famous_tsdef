
declare module "famous/surfaces/FormContainerSurface" {

    import ContainerSurface = require('famous/surfaces/ContainerSurface');

    class FormContainerSurface extends ContainerSurface {
        constructor  (options?: fms.ISurfaceOption1);
        constructor  (options: fms.ISurfaceOption2);
    }
   export = FormContainerSurface;
}
