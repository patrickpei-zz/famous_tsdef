/// <reference path='../core/Common.d.ts' />
/// <reference path='../core/Transform.d.ts' />
declare module fms {
    interface IDraggableOptions {
        /** grid width for snapping during drag. default: 1 */
        snapX?       : number;
        /** grid height for snapping during drag default: 0*/
        snapY?       : number;
        /** maxmimum [negative, positive] x displacement from start of drag */
        xRange?      : number[];
        /** maxmimum [negative, positive] y displacement from start of drag */
        yRange?      : number[];
        /** one pixel of input motion translates to this many pixels of output drag motion. default: 1 */
        scale?       : number;
        /** User should set to Draggable.DIRECTION_X or Draggable.DIRECTION_Y to constrain to one axis.*/
        projection?  : number;
    }
}
declare module "famous/modifiers/Draggable" {
    
    class Draggable implements fms.IModifier{
        public static DIRECTION_X: number;
        public static DIRECTION_Y: number;
    
        constructor  (options? : fms.IDraggableOptions); 
        /**
         * Set internal options, overriding any default options
         */
        setOptions(options: fms.IDraggableOptions): void;
        /**
         * Get current delta in position from where this draggable started.
         */
        getPosition(): fms.Point2d;
    
        /**
         * Transition the element to the desired relative position via provided transition.
         *  For example, calling this with [0,0] will not change the position.
         *  Callback will be executed on completion.
         *
         * @param {transition} transition transition object specifying how object moves to new position
         * @param {function} callback zero-argument function to call on observed completion
         */
        setRelativePosition(position: fms.Point2d, transition?: fms.ITransition     , callback?: () => void) : void;
        setRelativePosition(position: fms.Point2d, transition:  fms.INamedTransition, callback?: () => void) : void;
        setRelativePosition(position: fms.Point2d, transition:  fms.IFuncTransition , callback?: () => void) : void;
    
        /**
         * Transition the element to the desired absolute position via provided transition.
         *  Callback will be executed on completion.
         *
         * @param {array<number>} position end state to which we interpolate
         * @param {transition} transition transition object specifying how object moves to new position
         * @param {function} callback zero-argument function to call on observed completion
         */
        setPosition(position: fms.Point2d, transition?: fms.ITransition     , callback?: () => void) : void;
        setPosition(position: fms.Point2d, transition:  fms.INamedTransition, callback?: () => void) : void;
        setPosition(position: fms.Point2d, transition:  fms.IFuncTransition , callback?: () => void) : void;
    
        /**
         * Set this draggable to respond to user input.
         */
        activate(): void;
        /**
         * Set this draggable to ignore user input.
         */
        deactivate(): void;
        /**
         * Switch the input response stage between active and inactive.
         */
        toggle(): void;
    
        /**
         * Return render spec for this Modifier, applying to the provided
         *    target component.  This is similar to render() for Surfaces.
         */
        modify (renderSpec: fms.IRenderSpec) : fms.IRenderSpec;
    
    }

   export = Draggable;
}

