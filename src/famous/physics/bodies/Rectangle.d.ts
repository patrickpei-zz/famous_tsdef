
declare module fms.physic {
    interface IRectangleOptions extends fms.physic.IBodyOptions{
        /** The radius of the circle */
        size?: fms.Size;
    }
}

declare module "famous/physics/bodies/Rectangle" {

    import Body = require('famous/physics/bodies/Body');

    /**
     * Implements a circle, or spherical, geometry for an Body with
     * radius.
     */
    class Rectangle extends Body{
        constructor (options: fms.physic.IRectangleOptions);
        
        /**
         * Basic setter for size.
         */
        setSize(size: fms.Size): void;
    
    }

    export = Rectangle;
}

