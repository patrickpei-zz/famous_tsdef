
declare module fms.physic {
    interface ICircleOptions extends fms.physic.IBodyOptions{
        /** The radius of the circle */
        radius?: number;
    }
}
declare module "famous/physics/bodies/Circle" {

    import Body = require('famous/physics/bodies/Body');
 
    /**
     * Implements a circle, or spherical, geometry for an Body with
     * radius.
     */
    class Circle extends Body{
        constructor (options: fms.physic.ICircleOptions);
        
        /**
         * Basic setter for radius.
         * @method setRadius
         * @param r {Number} radius
         */
        setRadius(r: number): void;
    
    }
    export = Circle;
}

