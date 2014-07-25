/// <reference path='../../core/Common.d.ts' />
/// <reference path='./Constraint.d.ts' />

declare module fms.physic {
    interface IWallOnContact{
        /** Physical bodies bounce off the wall */
        REFLECT : number;
        /** Physical bodies are unaffected. Usecase is to fire events on contact. */
        SILENT : number;
    }
    
    interface IWallOptions{
        /**  The energy ratio lost in a collision (0 = stick, 1 = elastic). Range : [0, 1] default = 0.5 */
        restitution? : number;
        /**  Baumgarte stabilization parameter. Makes constraints "loosely" (0) or "tightly" (1) enforced. Range : [0, 1]  default = 0.5 */
        drift? : number;
        /**  Amount of penetration in pixels to ignore before collision event triggers.  default = 0*/
        slop? : number;
        /**  The normal direction to the wall. default = [1, 0, 0] */
        normal? : fms.Vector3;
        /**  The distance from the origin that the wall is placed. default = 0*/
        distance? : number;
        /**  How to handle collision against the wall. A value of Wall.ON_CONTACT, default Wall.ON_CONTACT.REFLECT*/
        onContact? : number; 
    }
}
declare module "famous/physics/constraints/Wall" {
    
    import Constraint = require('famous/physics/constraints/Constraint');

    /**
     *  A wall describes an infinite two-dimensional plane that physics bodies
     *    can collide with. To define a wall, you must give it a distance (from
     *    the center of the physics engine's origin, and a normal defining the plane
     *    of the wall.
     *
     *    (wall)
     *      |
     *      | (normal)     (origin)
     *      | --->            *
     *      |
     *      |    (distance)
     *      ...................
     *            (100px)
     *
     *      e.g., Wall({normal : [1,0,0], distance : 100})
     *      would be a wall 100 pixels to the left, whose normal points right
     */
    class Wall extends Constraint {
        public static ON_CONTACT : fms.physic.IWallOnContact;
    
        constructor(options: fms.physic.IWallOptions);
        /*
         * Setter for options.
         */
        setOptions(options: fms.physic.IWallOptions): void;
    }

    export = Wall;
}

