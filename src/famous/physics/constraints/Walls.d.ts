/// <reference path='../../core/Common.d.ts' />
/// <reference path='./Constraint.d.ts' />
/// <reference path='./Wall.d.ts' />

declare module fms.physic {
    interface IWallsOptions{
         /**  An array of sides e.g., [Walls.SIDES.LEFT, Walls.SIDES.TOP] default: Walls.SIDES.TWO_DIMENSIONAL */
        sides : number[]; 
         /**  The size of the bounding box of the walls. default: [window.innerWidth, window.innerHeight, 0] */
        size : fms.Size3;
         /**  The center of the wall relative to the size. default: [.5, .5, .5] */
        origin : fms.Origin3;
         /**  Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1] default: 0.5 */
        drift : number;
         /**  Amount of penetration in pixels to ignore before collision event triggers. default: 0 */
        slop : number;
         /**  The energy ratio lost in a collision (0 = stick, 1 = elastic) The energy ratio lost in a collision (0 = stick, 1 = elastic) default: 0.5*/
        restitution : number;
         /**  How to handle collision against the wall. default: Walls.ON_CONTACT.REFLECT */
        onContact : number;
    }
}

declare module "famous/physics/constraints/Walls" {
    
    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  Walls combines one or more Wall primitives and exposes a simple API to
     *  interact with several walls at once. A common use case would be to set up
     *  a bounding box for a physics body, that would collide with each side.
     */
    class Walls extends Constraint {
        public static ON_CONTACT : fms.physic.IWallOnContact;
        public static SIDES : {
                LEFT   : number;
                RIGHT  : number;
                TOP    : number;
                BOTTOM : number;
                FRONT  : number;
                BACK   : number;
                TWO_DIMENSIONAL : number[];
                THREE_DIMENSIONAL : number[];
            }
    
        constructor(options: fms.physic.IWallsOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IWallsOptions): void;
        /*
         * Setter for size and origin
         */
         setSize(size: fms.Size3, origin: fms.Origin3): void;   
    
        /**
         * Apply a method to each wall making up the walls
         *
         * @method applyConstraint
         * @param fn {Function}  Function that takes in a wall as its first parameter
         */
        forEach(fn : (side: number, index?: number)=>void ): void;
    
        /**
         * Rotates the walls by an angle in the XY-plane
         */
        rotateZ(angle: number) : void ;
    
        /**
         * Rotates the walls by an angle in the YZ-plane
         */
        rotateX(angle: number) : void ;
    
        /**
         * Rotates the walls by an angle in the XZ-plane
         */
        rotateY(angle: number) : void ;
    }

    export = Walls;
}

