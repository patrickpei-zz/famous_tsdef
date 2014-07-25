/// <reference path='../../core/Common.d.ts' />

 declare module "famous/physics/forces/RotationalSpring" {
     
    import Spring = require('famous/physics/forces/Spring');

   /**
     *  A force that rotates a physics body back to target Euler angles.
     *  Just as a spring translates a body to a particular X, Y, Z, location,
     *  a rotational spring rotates a body to a particular X, Y, Z Euler angle.
     *      Note: there is no physical agent that does this in the "real world"
     */
    class RotationalSpring extends Spring {
        constructor(options: fms.physic.ISpringOptions);
    }
    
    export = RotationalSpring;
}

